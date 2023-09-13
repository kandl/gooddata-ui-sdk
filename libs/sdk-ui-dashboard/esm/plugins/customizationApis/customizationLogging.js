// (C) 2021-2022 GoodData Corporation
import { pluginDebugStr } from "./pluginUtils.js";
function addPluginInfoToMessage(plugin, message) {
    return plugin ? `${pluginDebugStr(plugin)}: ${message}` : message;
}
/**
 * Common logger to use for all events that occur during customization. The logger is responsible for adding
 * information about plugin whose registration code triggered those events.
 */
export class DashboardCustomizationLogger {
    constructor() {
        this.setCurrentPlugin = (plugin) => {
            this.currentPlugin = plugin;
        };
        this.log = (message, ...optionalParams) => {
            // eslint-disable-next-line no-console
            console.log(addPluginInfoToMessage(this.currentPlugin, message), optionalParams);
        };
        this.warn = (message, ...optionalParams) => {
            console.warn(addPluginInfoToMessage(this.currentPlugin, message), optionalParams);
        };
        this.error = (message, ...optionalParams) => {
            console.error(addPluginInfoToMessage(this.currentPlugin, message), optionalParams);
        };
    }
}
//# sourceMappingURL=customizationLogging.js.map