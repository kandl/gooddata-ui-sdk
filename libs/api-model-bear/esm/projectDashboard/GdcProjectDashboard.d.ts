import { IObjectMeta } from "../meta/GdcMetadata.js";
/**
 * @public
 */
export interface IProjectDashboard {
    content: {
        tabs: Array<{
            title: string;
            identifier: string;
        }>;
    };
    meta: IObjectMeta;
}
/**
 * @public
 */
export interface IWrappedProjectDashboard {
    projectDashboard: IProjectDashboard;
}
//# sourceMappingURL=GdcProjectDashboard.d.ts.map