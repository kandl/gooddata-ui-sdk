import mapboxgl from "mapbox-gl";
import { ISeparators } from "@gooddata/sdk-model";
import { IHeaderPredicate } from "@gooddata/sdk-ui";
import { IGeoConfig } from "../../GeoChart.js";
import { IntlShape } from "react-intl";
export declare const TOOLTIP_MAX_WIDTH = 320;
export declare function shouldShowTooltip(geoProperties: GeoJSON.GeoJsonProperties | undefined): boolean;
export declare function getTooltipHtml(geoProperties: GeoJSON.GeoJsonProperties, tooltipStroke: string, maxWidth: number, separators?: ISeparators, drillableItems?: IHeaderPredicate[], intl?: IntlShape): string;
export declare const handlePushpinMouseEnter: (e: mapboxgl.EventData, chart: mapboxgl.Map, tooltip: mapboxgl.Popup, config: IGeoConfig, drillableItems?: IHeaderPredicate[], intl?: IntlShape) => void;
export declare const handlePushpinMouseLeave: (_e: mapboxgl.EventData, chart: mapboxgl.Map, tooltip: mapboxgl.Popup, config: IGeoConfig) => void;
//# sourceMappingURL=geoChartTooltip.d.ts.map