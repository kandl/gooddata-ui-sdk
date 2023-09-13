import { IDataView, IExportConfig, IExportResult } from "@gooddata/sdk-backend-spi";
import { IColor, IColorPalette, ITotal, ISortItem, IMeasureDescriptor, IAttributeDescriptor } from "@gooddata/sdk-model";
import { GoodDataSdkError } from "../errors/GoodDataSdkError.js";
import { IMappingHeader } from "../headerMatching/MappingHeader.js";
/**
 * @public
 */
export interface ILoadingState {
    isLoading: boolean;
}
/**
 * @public
 */
export type OnError = (error: GoodDataSdkError) => void;
/**
 * @public
 */
export type OnLoadingChanged = (loadingState: ILoadingState) => void;
/**
 * @public
 */
export interface IExtendedExportConfig extends IExportConfig {
    includeFilterContext?: boolean;
}
/**
 * @public
 */
export type IExportFunction = (exportConfig: IExtendedExportConfig) => Promise<IExportResult>;
/**
 * @public
 */
export type OnExportReady = (exportFunction: IExportFunction) => void;
/**
 * @internal
 */
export interface IColorAssignment {
    headerItem: IMappingHeader;
    color: IColor;
}
/**
 * @internal
 */
export interface IColorsData {
    colorAssignments: IColorAssignment[];
    colorPalette: IColorPalette;
}
/**
 * @internal
 */
export interface IAvailableDrillTargets {
    attributes?: IAvailableDrillTargetAttribute[];
    measures?: IAvailableDrillTargetMeasure[];
}
/**
 * @internal
 */
export interface IAvailableDrillTargetMeasure {
    measure: IMeasureDescriptor;
    attributes: IAttributeDescriptor[];
}
/**
 * @internal
 */
export interface IAvailableDrillTargetAttribute {
    attribute: IAttributeDescriptor;
    intersectionAttributes: IAttributeDescriptor[];
}
/**
 * @internal
 */
export interface IOpenAsReportUiConfig {
    supported?: boolean;
    warningMessage?: string;
}
/**
 * TODO: remove push data
 * @internal
 */
export interface IPushData {
    dataView?: IDataView;
    properties?: {
        sortItems?: ISortItem[];
        totals?: ITotal[];
        controls?: Record<string, any>;
        bucketType?: string;
    };
    propertiesMeta?: any;
    colors?: IColorsData;
    initialProperties?: any;
    availableDrillTargets?: IAvailableDrillTargets;
    openAsReport?: IOpenAsReportUiConfig;
    ignoreUndoRedo?: boolean;
}
/**
 * @internal
 */
export type PushDataCallback = (data: IPushData) => void;
//# sourceMappingURL=Events.d.ts.map