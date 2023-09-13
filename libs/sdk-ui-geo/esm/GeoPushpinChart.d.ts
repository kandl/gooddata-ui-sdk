/// <reference types="react" />
import { IGeoPushpinChartProps, IGeoPushpinChartLatitudeLongitudeProps } from "./GeoChart.js";
import { IDimension, IExecutionDefinition } from "@gooddata/sdk-model";
/**
 * @internal
 */
export declare function getGeoChartDimensions(def: IExecutionDefinition): IDimension[];
/**
 * @public
 */
export declare const GeoPushpinChart: (props: IGeoPushpinChartProps | IGeoPushpinChartLatitudeLongitudeProps) => JSX.Element;
//# sourceMappingURL=GeoPushpinChart.d.ts.map