import { IObjectMeta } from "../meta/GdcMetadata.js";
/**
 * @public
 */
export interface IWrappedDashboardPlugin {
    dashboardPlugin: IDashboardPlugin;
}
/**
 * @public
 */
export interface IDashboardPlugin {
    content: IDashboardPluginContent;
    meta: IObjectMeta;
}
/**
 * @public
 */
export interface IDashboardPluginContent {
    url: string;
}
/**
 * @public
 */
export declare function isDashboardPlugin(obj: unknown): obj is IWrappedDashboardPlugin;
//# sourceMappingURL=GdcDashboardPlugin.d.ts.map