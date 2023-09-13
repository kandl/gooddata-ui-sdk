import { logInfo, logSuccess } from "../_base/terminal/loggers.js";
import { genericErrorReporter } from "../_base/utils.js";
import { getListCmdActionConfig } from "./actionConfig.js";
import columnify from "columnify";
function printListConfigSummary(config) {
    const { backend, hostname, workspace, credentials: { username }, } = config;
    logInfo("Everything looks valid. Going to list objects.");
    logInfo(`  Hostname    : ${hostname}   (${backend === "bear" ? "GoodData platform" : "GoodData.CN"})`);
    if (backend === "bear") {
        logInfo(`  Username    : ${username}`);
    }
    logInfo(`  Workspace   : ${workspace}`);
}
export async function listCmdAction(listObjFn, options) {
    try {
        const config = await getListCmdActionConfig(options);
        printListConfigSummary(config);
        const listEntries = await listObjFn(config, options);
        // eslint-disable-next-line no-console
        console.log(columnify(listEntries, {
            config: {
                title: {
                    maxWidth: 25,
                },
                description: {
                    maxWidth: 30,
                },
            },
        }));
        logSuccess(`Listed ${listEntries.length} object(s).`);
    }
    catch (e) {
        genericErrorReporter(e);
        process.exit(1);
    }
}
//# sourceMappingURL=listCmdAction.js.map