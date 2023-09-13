import { IObjectMeta } from "../meta/GdcMetadata.js";
/**
 * @public
 */
export interface IVisualizationClassContent {
    url: string;
    icon: string;
    iconSelected: string;
    checksum: string;
    orderIndex?: number;
}
/**
 * @public
 */
export interface IVisualizationClass {
    meta: IObjectMeta;
    content: IVisualizationClassContent;
}
/**
 * @public
 */
export interface IVisualizationClassWrapped {
    visualizationClass: IVisualizationClass;
}
//# sourceMappingURL=GdcVisualizationClass.d.ts.map