import { ObjQualifier } from "../base/GdcTypes.js";
/**
 * @public
 */
export type Layout = IFluidLayout;
/**
 * @public
 */
export type Widget = IPersistedWidget;
/**
 * @public
 */
export type LayoutContent = Widget | Layout;
/**
 * @public
 */
export interface IPersistedWidget {
    widget: {
        qualifier: ObjQualifier;
    };
}
/**
 * @public
 */
export interface IFluidLayout {
    fluidLayout: {
        rows: IFluidLayoutRow[];
        size?: IFluidLayoutSize;
        style?: string;
    };
}
/**
 * @public
 */
export interface IFluidLayoutRow {
    columns: IFluidLayoutColumn[];
    style?: string;
    header?: SectionHeader;
}
/**
 * @public
 */
export interface IFluidLayoutColumn {
    content?: LayoutContent;
    size: IFluidLayoutColSize;
    style?: string;
}
/**
 * @public
 */
export interface IFluidLayoutColSize {
    xl: IFluidLayoutSize;
    xs?: IFluidLayoutSize;
    sm?: IFluidLayoutSize;
    md?: IFluidLayoutSize;
    lg?: IFluidLayoutSize;
}
/**
 * @public
 */
export interface IFluidLayoutSize {
    width: number;
    height?: number;
    heightAsRatio?: number;
}
/**
 * @public
 */
export type SectionHeader = ISectionHeader | ISectionDescription;
/**
 * @public
 */
export interface ISectionHeader {
    title: string;
    description?: string;
}
/**
 * @public
 */
export interface ISectionDescription {
    description: string;
}
/**
 * @public
 */
export declare function isFluidLayout(obj: unknown): obj is IFluidLayout;
/**
 * @public
 */
export declare function isLayoutWidget(obj: unknown): obj is IPersistedWidget;
//# sourceMappingURL=GdcDashboardLayout.d.ts.map