import { IDashboardPluginContract_V1 } from "../plugin.js";
export interface IDashboardCustomizationLogger {
    setCurrentPlugin(plugin: IDashboardPluginContract_V1 | undefined): void;
    log(message: string, ...optionalParams: any[]): void;
    warn(message: string, ...optionalParams: any[]): void;
    error(message: string, ...optionalParams: any[]): void;
}
/**
 * Common logger to use for all events that occur during customization. The logger is responsible for adding
 * information about plugin whose registration code triggered those events.
 */
export declare class DashboardCustomizationLogger implements IDashboardCustomizationLogger {
    private currentPlugin;
    setCurrentPlugin: (plugin: IDashboardPluginContract_V1 | undefined) => void;
    log: (message: string, ...optionalParams: any[]) => void;
    warn: (message: string, ...optionalParams: any[]) => void;
    error: (message: string, ...optionalParams: any[]) => void;
}
