#!/usr/bin/env node
// (C) 2007-2019 GoodData Corporation
import program from "commander";
import ora from "ora";
import chalk from "chalk";
import gooddata from "@gooddata/gd-bear-client";
import * as pkg from "../package.json";
import * as process from "process";
import * as path from "path";
import { log, logError, logInfo, logSuccess } from "./cli/loggers";
import { clearLine, clearTerminal } from "./cli/clear";
import { promptPassword, promptProjectId, promptUsername } from "./cli/prompts";
import { getConfigFromConfigFile, getConfigFromProgram } from "./base/config";
import { DEFAULT_CONFIG_FILE_NAME, DEFAULT_HOSTNAME } from "./base/constants";
import { DataRecorderConfig, DataRecorderError, isDataRecorderError } from "./base/types";
import { generateRecordingIndex } from "./codegen";
import bearFactory, { FixedLoginAndPasswordAuthProvider } from "@gooddata/sdk-backend-bear";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { ExecutionRecording } from "./recordings/execution";
import {
    discoverExecutionRecordings,
    OnRecordingCaptured,
    populateExecutionRecordings,
} from "./recordings/executionRepository.js";

program
    .version(pkg.version)
    .option("--recordingDir <path>", "Directory with recording inputs and outputs")
    .option("--project-id <id>", "Project id from which you want to capture mock data")
    .option("--username <email>", "Your username that you use to log in to GoodData platform.")
    .option("--hostname <url>", `Instance of GoodData platform. The default is ${DEFAULT_HOSTNAME}`)
    .option("--config <path>", `Custom config file (default ${DEFAULT_CONFIG_FILE_NAME})`)
    .option("--accept-untrusted-ssl", "Allows to run the tool with host, that has untrusted ssl certificate")
    .parse(process.argv);

async function promptForMissingConfig(config: DataRecorderConfig): Promise<DataRecorderConfig> {
    const { hostname } = config;
    let { projectId, username, password } = config;

    gooddata.config.setCustomDomain(hostname || DEFAULT_HOSTNAME);
    gooddata.config.setJsPackage(pkg.name, pkg.version);

    const logInSpinner = ora();
    try {
        if (username) {
            log("Username", username);
        } else {
            username = await promptUsername();
        }

        password = password || (await promptPassword());

        logInSpinner.start("Logging in...");
        await gooddata.user.login(username, password);
        logInSpinner.stop();
        clearLine();
    } catch (err) {
        logInSpinner.stop();
        clearLine();
        logError("Unable to log in to platform");

        throw new DataRecorderError("Authentication failed", 1);
    }

    if (projectId) {
        log("Project ID", projectId);
    } else {
        projectId = await promptProjectId();
    }

    return {
        ...config,
        projectId,
        username,
        password,
    };
}

async function runAndCaptureExecutionRecordings(
    recordings: ExecutionRecording[],
    backend: IAnalyticalBackend,
    config: DataRecorderConfig,
): Promise<ExecutionRecording[]> {
    const executionSpinner = ora();
    let successes = 0;
    executionSpinner.start("Running and capturing executions");

    const onCapture: OnRecordingCaptured = (_, err?: string): void => {
        if (err) {
            executionSpinner.info(`${chalk.red(err)}`);
            return;
        }

        successes++;
        executionSpinner.info(`Processed ${successes}/${recordings.length} execution(s)`);
    };

    const results = await populateExecutionRecordings(recordings, backend, config, onCapture);

    if (successes < recordings.length) {
        executionSpinner.warn(
            "Not all executions run successfully and were captured. See previous messages.",
        );
    } else {
        executionSpinner.succeed("All executions run successfully and were captured.");
    }

    return results;
}

async function run() {
    clearTerminal();
    logInfo(`GoodData Mock Handling Tool v${pkg.version}`);

    if (program.acceptUntrustedSsl) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    const configFilePath = program.config || DEFAULT_CONFIG_FILE_NAME;

    logInfo(`Reading config from ${configFilePath}`);

    const partialConfig = getConfigFromConfigFile(configFilePath, getConfigFromProgram(program));
    const { recordingDir } = partialConfig;

    if (!recordingDir) {
        logError("Please specify directory that should contain the recordings.");

        process.exit(1);
        return;
    }

    const absoluteRecordingDir = path.resolve(recordingDir);
    const executions = await discoverExecutionRecordings(absoluteRecordingDir);
    const executionsWithoutData = executions.filter(e => !e.isComplete());

    logInfo(
        `Discovered ${executions.length} execution recordings; out of these ${executionsWithoutData.length} are missing recorded data.`,
    );

    let executionsToProcess = executions.filter(e => e.isComplete());

    if (executionsWithoutData.length) {
        /*
         * So there is stuff to do; first make sure tool has complete config, prompt user for anything that was
         * not on file or as CLI tool args.
         */
        const fullConfig = await promptForMissingConfig(partialConfig);

        /*
         * Instantiate analytical backend to run requests against; it is enough to do this once for the whole
         * run.
         */
        const backend = bearFactory({ hostname: program.hostname || DEFAULT_HOSTNAME }).withAuthentication(
            new FixedLoginAndPasswordAuthProvider(fullConfig.username!, fullConfig.password!),
        );

        const newRecordings = await runAndCaptureExecutionRecordings(
            executionsWithoutData,
            backend,
            fullConfig,
        );

        executionsToProcess = executionsToProcess.concat(newRecordings.filter(e => e.isComplete()));
    }

    logInfo(`Building recording index for all executions with captured data in ${absoluteRecordingDir}`);

    generateRecordingIndex({ executions: executionsToProcess }, absoluteRecordingDir);

    logSuccess("Done");

    process.exit(0);
}

run().catch(err => {
    if (isDataRecorderError(err)) {
        process.exit(err.rc);
    } else {
        logError(`An unexpected error has occurred: ${err}`);
        console.error(err);

        process.exit(1);
    }
});
