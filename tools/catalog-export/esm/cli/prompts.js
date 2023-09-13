// (C) 2007-2023 GoodData Corporation
import pkg from "inquirer";
const { prompt } = pkg;
import { DEFAULT_OUTPUT_FILE_NAME } from "../base/constants.js";
import * as path from "path";
import * as fs from "fs";
export async function promptUsername(wording = "username") {
    const usernameQuestion = {
        type: "input",
        name: "username",
        message: `Enter your ${wording}:`,
    };
    const usernameResponse = await prompt(usernameQuestion);
    return usernameResponse.username;
}
export async function promptPassword() {
    const passwordQuestion = {
        type: "password",
        name: "password",
        message: "Enter your password:",
    };
    const passwordResponse = await prompt(passwordQuestion);
    return passwordResponse.password;
}
export async function promptWorkspaceId(choices, wording = "workspace") {
    const question = {
        type: "list",
        name: "id",
        message: `Choose a ${wording}:`,
        choices,
    };
    const response = await prompt(question);
    return response.id;
}
export async function confirmFileRewrite(fileName) {
    const shouldRewriteQuestion = {
        type: "confirm",
        name: "shouldRewrite",
        message: `The file ${fileName} already exists. Would you like to overwrite it?`,
        default: true,
    };
    const shouldRewriteExisting = await prompt(shouldRewriteQuestion);
    return shouldRewriteExisting.shouldRewrite;
}
export async function promptFileName(defaultFileName = DEFAULT_OUTPUT_FILE_NAME) {
    const filenameQuestion = {
        type: "input",
        name: "filename",
        message: "Enter filename:",
        default: defaultFileName,
    };
    const response = await prompt(filenameQuestion);
    return response.filename;
}
export async function requestFilePath() {
    const fileName = await promptFileName();
    const filePath = path.resolve(fileName);
    if (fs.existsSync(filePath)) {
        const shouldRewriteFile = await confirmFileRewrite(fileName);
        if (shouldRewriteFile) {
            return filePath;
        }
        return requestFilePath();
    }
    return filePath;
}
export async function promptHostname() {
    const hostnameQuestion = {
        type: "input",
        name: "hostname",
        message: "Enter hostname:",
    };
    const response = await prompt(hostnameQuestion);
    return response.hostname;
}
