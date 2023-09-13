import { DataViewFacade, IColorAssignment } from "@gooddata/sdk-ui";
import { IGeoData, IGeoPointsConfig } from "../../../../GeoChart.js";
import { IBucket, DataValue, IResultHeader } from "@gooddata/sdk-model";
export declare function getGeoAttributeHeaderItems(dv: DataViewFacade, geoData: IGeoData): IResultHeader[][];
export declare function isDataOfReasonableSize(dv: DataViewFacade, geoData: IGeoData, limit: number): boolean;
export declare function isLocationSet(buckets: IBucket[]): boolean;
export declare function calculateAverage(values?: number[]): number;
export declare function getFormatFromExecutionResponse(dv: DataViewFacade, indexMeasure: number): string;
export declare function isClusteringAllowed(geoData: IGeoData, groupNearbyPoints?: boolean): boolean;
export declare function isPointsConfigChanged(prevPointsConfig: IGeoPointsConfig | undefined, pointsConfig: IGeoPointsConfig | undefined): boolean;
interface IMinMax {
    min?: number;
    max?: number;
}
/**
 * Get min/max values in number array and ignore NaN values
 */
export declare function getMinMax(data: number[]): IMinMax;
export declare function dataValueAsFloat(value: DataValue): number;
export declare function isFluidLegendEnabled(responsive: boolean | "autoPositionWithPopup", showFluidLegend: boolean): boolean;
export declare function isColorAssignmentItemChanged(prevColorAssignment: IColorAssignment[], colorAssignment: IColorAssignment[]): boolean;
export {};
//# sourceMappingURL=common.d.ts.map