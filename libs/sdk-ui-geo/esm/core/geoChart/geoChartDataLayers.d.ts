import mapboxgl from "mapbox-gl";
import { IGeoData, IGeoConfig } from "../../GeoChart.js";
export declare function createPushpinFilter(selectedSegmentItems: string[]): mapboxgl.Expression;
export declare function createPushpinDataLayer(dataSourceName: string, geoData: IGeoData, config: IGeoConfig): mapboxgl.CircleLayer;
/**
 * Create layer for clustered points/pins which have 'properties.point_count' indicates number of same points is clustered together
 */
export declare function createClusterPoints(dataSourceName: string): mapboxgl.CircleLayer;
/**
 * Create layer for cluster labels which indicate number of points/pins is clustered
 */
export declare function createClusterLabels(dataSourceName: string): mapboxgl.SymbolLayer;
/**
 * Create layer for un-clustered points which are not close to others
 */
export declare function createUnclusterPoints(dataSourceName: string): mapboxgl.CircleLayer;
//# sourceMappingURL=geoChartDataLayers.d.ts.map