import mapboxgl from "mapbox-gl";
import { IGeoConfig, IGeoLngLat, IGeoLngLatBounds } from "../../../../GeoChart.js";
interface IGeoViewport {
    bounds?: mapboxgl.LngLatBoundsLike;
    center?: IGeoLngLat;
    zoom?: number;
}
export declare function getViewportOptions(data: IGeoLngLat[], config: IGeoConfig): IGeoViewport;
export declare function getLngLatBounds(lnglats: IGeoLngLat[]): IGeoLngLatBounds | undefined;
export {};
//# sourceMappingURL=viewport.d.ts.map