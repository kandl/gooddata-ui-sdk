import mapboxgl from "mapbox-gl";
import { IGeoLngLat, IGeoViewports } from "../../../GeoChart.js";
export declare const DEFAULT_WORLD_BOUNDS: {
    northEast: {
        lat: number;
        lng: number;
    };
    southWest: {
        lat: number;
        lng: number;
    };
};
export declare const VIEWPORTS: IGeoViewports;
export declare const DEFAULT_CLUSTER_FILTER: string[];
export declare const DEFAULT_CLUSTER_LABELS_CONFIG: {
    id: string;
    type: "symbol";
    layout: {
        "text-allow-overlap": boolean;
        "text-field": string;
        "text-font": string[];
        "text-size": number;
    };
    paint: {
        "text-color": string;
    };
};
export declare const DEFAULT_CLUSTER_LAYER_NAME = "gdcClusters";
export declare const DEFAULT_CLUSTER_MAX_ZOOM = 14;
export declare const DEFAULT_CLUSTER_POINT_BORDERS: mapboxgl.CirclePaint;
export declare const DEFAULT_CLUSTER_POINT_COLORS: mapboxgl.Expression;
export declare const DEFAULT_CLUSTER_POINT_SIZES: mapboxgl.Expression;
export declare const PUSHPIN_SIZE_OPTIONS_MAP: {
    min: {
        default: number;
        "0.5x": number;
        "0.75x": number;
        normal: number;
        "1.25x": number;
        "1.5x": number;
    };
    max: {
        default: number;
        "0.5x": number;
        "0.75x": number;
        normal: number;
        "1.25x": number;
        "1.5x": number;
    };
};
export declare const DEFAULT_CLUSTER_RADIUS = 50;
export declare const DEFAULT_DATA_POINTS_LIMIT = 25000;
export declare const DEFAULT_DATA_SOURCE_NAME = "gdcPushpinsData";
export declare const DEFAULT_LAYER_NAME = "gdcPushpins";
export declare const INTERACTION_EVENTS: readonly ["scrollZoom", "boxZoom", "dragRotate", "dragPan", "keyboard", "doubleClickZoom", "touchZoomRotate"];
export declare const DEFAULT_COLORS: string[];
export declare const DEFAULT_ZOOM: number;
export declare const DEFAULT_CENTER: IGeoLngLat;
export declare const DEFAULT_PUSHPIN_BORDER_COLOR_VALUE = "rgb(233,237,241)";
export declare const DEFAULT_PUSHPIN_COLOR_OPACITY = 0.7;
export declare const DEFAULT_PUSHPIN_COLOR_SCALE = 6;
export declare const DEFAULT_PUSHPIN_COLOR_VALUE: string;
export declare const DEFAULT_PUSHPIN_OPTIONS: {
    "circle-stroke-width": number;
};
export declare const DEFAULT_MAPBOX_OPTIONS: Partial<mapboxgl.MapboxOptions>;
export declare const DEFAULT_TOOLTIP_OPTIONS: {
    closeButton: boolean;
    closeOnClick: boolean;
    offset: number;
};
export declare const PUSHPIN_STYLE_CIRCLE = "circle";
export declare const PUSHPIN_STYLE_CIRCLE_COLOR = "circle-color";
export declare const PUSHPIN_STYLE_CIRCLE_SIZE = "circle-radius";
export declare const PUSHPIN_STYLE_CIRCLE_STROKE_COLOR = "circle-stroke-color";
export declare const EMPTY_SEGMENT_VALUE = "empty-segment-filter";
export declare const LAYER_STYLE_LABEL_PREFIX = "-label";
export declare const NULL_TOOLTIP_VALUE = "-";
export declare const ZOOM_CONTROLS_HEIGHT = 100;
//# sourceMappingURL=geoChart.d.ts.map