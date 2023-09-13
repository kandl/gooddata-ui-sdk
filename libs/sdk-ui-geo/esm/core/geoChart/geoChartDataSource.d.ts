import { IGeoConfig, IGeoData } from "../../GeoChart.js";
import { IColorStrategy } from "@gooddata/sdk-ui-vis-commons";
export interface IGeoDataSourceProps {
    colorStrategy: IColorStrategy;
    config: IGeoConfig;
    geoData: IGeoData;
    hasClustering: boolean;
}
type IGeoDataSourceFeature = GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties>;
export type IGeoDataSourceFeatures = IGeoDataSourceFeature[];
export declare const createPushpinDataSource: (dataSourceProps: IGeoDataSourceProps) => mapboxgl.GeoJSONSourceRaw;
export {};
//# sourceMappingURL=geoChartDataSource.d.ts.map