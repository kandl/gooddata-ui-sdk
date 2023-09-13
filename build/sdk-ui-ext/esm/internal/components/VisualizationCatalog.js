// (C) 2020-2023 GoodData Corporation
import last from "lodash/last.js";
import { insightVisualizationUrl } from "@gooddata/sdk-model";
import { AreaChartDescriptor } from "./pluggableVisualizations/areaChart/AreaChartDescriptor.js";
import { BarChartDescriptor } from "./pluggableVisualizations/barChart/BarChartDescriptor.js";
import { BubbleChartDescriptor } from "./pluggableVisualizations/bubbleChart/BubbleChartDescriptor.js";
import { BulletChartDescriptor } from "./pluggableVisualizations/bulletChart/BulletChartDescriptor.js";
import { ColumnChartDescriptor } from "./pluggableVisualizations/columnChart/ColumnChartDescriptor.js";
import { ComboChartDescriptor } from "./pluggableVisualizations/comboChart/ComboChartDescriptor.js";
import { ComboChartDescriptorDeprecated } from "./pluggableVisualizations/comboChart/ComboChartDescriptorDeprecated.js";
import { DonutChartDescriptor } from "./pluggableVisualizations/donutChart/DonutChartDescriptor.js";
import { FunnelChartDescriptor } from "./pluggableVisualizations/funnelChart/FunnelChartDescriptor.js";
import { PyramidChartDescriptor } from "./pluggableVisualizations/pyramidChart/PyramidChartDescriptor.js";
import { HeadlineDescriptor } from "./pluggableVisualizations/headline/HeadlineDescriptor.js";
import { HeatmapDescriptor } from "./pluggableVisualizations/heatMap/HeatmapDescriptor.js";
import { LineChartDescriptor } from "./pluggableVisualizations/lineChart/LineChartDescriptor.js";
import { PieChartDescriptor } from "./pluggableVisualizations/pieChart/PieChartDescriptor.js";
import { PivotTableDescriptor } from "./pluggableVisualizations/pivotTable/PivotTableDescriptor.js";
import { ScatterPlotDescriptor } from "./pluggableVisualizations/scatterPlot/ScatterPlotDescriptor.js";
import { TreemapDescriptor } from "./pluggableVisualizations/treeMap/TreemapDescriptor.js";
import { XirrDescriptor } from "./pluggableVisualizations/xirr/XirrDescriptor.js";
import { GeoPushpinChartDescriptor } from "./pluggableVisualizations/geoChart/GeoPushpinChartDescriptor.js";
import { UnknownVisualizationDescriptor } from "./pluggableVisualizations/UnknownVisualizationDescriptor.js";
import { SankeyChartDescriptor } from "./pluggableVisualizations/sankeyChart/SankeyChartDescriptor.js";
import { DependencyWheelChartDescriptor } from "./pluggableVisualizations/dependencyWheelChart/DependencyWheelChartDescriptor.js";
import { WaterfallChartDescriptor } from "./pluggableVisualizations/waterfallChart/WaterfallChartDescriptor.js";
/**
 * @internal
 */
export class CatalogViaTypeToClassMap {
    constructor(mapping) {
        this.mapping = mapping;
    }
    forUri(uri) {
        const VisType = this.findInMapping(uri);
        if (!VisType) {
            console.warn(`Unknown visualization class: ${uri}. The reason may be that the visualization type is incompatible with dashboard plugins. Try removing the plugins from this dashboard or use different visualization type.`);
            return new UnknownVisualizationDescriptor(uri);
        }
        return new VisType();
    }
    hasDescriptorForUri(uri) {
        return !!this.findInMapping(uri);
    }
    forInsight(insight) {
        /*
         * the URIs follow "local:visualizationType" format
         */
        const visClassUri = insightVisualizationUrl(insight);
        return this.forUri(visClassUri);
    }
    hasDescriptorForInsight(insight) {
        const visClassUri = insightVisualizationUrl(insight);
        return this.hasDescriptorForUri(visClassUri);
    }
    findInMapping(uri) {
        const split = uri.split(":");
        const key = last(split);
        return this.mapping[key];
    }
}
//
// Default static catalog implementation
//
/**
 * Compile-time pluggable visualization 'catalog'.
 */
const DefaultVisualizations = {
    bar: BarChartDescriptor,
    bullet: BulletChartDescriptor,
    column: ColumnChartDescriptor,
    line: LineChartDescriptor,
    area: AreaChartDescriptor,
    pie: PieChartDescriptor,
    donut: DonutChartDescriptor,
    table: PivotTableDescriptor,
    headline: HeadlineDescriptor,
    scatter: ScatterPlotDescriptor,
    bubble: BubbleChartDescriptor,
    heatmap: HeatmapDescriptor,
    combo: ComboChartDescriptorDeprecated,
    combo2: ComboChartDescriptor,
    treemap: TreemapDescriptor,
    funnel: FunnelChartDescriptor,
    pyramid: PyramidChartDescriptor,
    pushpin: GeoPushpinChartDescriptor,
    sankey: SankeyChartDescriptor,
    dependencywheel: DependencyWheelChartDescriptor,
    waterfall: WaterfallChartDescriptor,
};
/**
 * Default pluggable visualization catalog. This is implemented using static lookup table between vis type
 * and the actual plug vis implementation.
 *
 * @alpha
 */
export const DefaultVisualizationCatalog = new CatalogViaTypeToClassMap(DefaultVisualizations);
/**
 * Pluggable visualization catalog containing all available visualizations.
 *
 * @alpha
 */
export const FullVisualizationCatalog = new CatalogViaTypeToClassMap(Object.assign(Object.assign({}, DefaultVisualizations), { xirr: XirrDescriptor }));
//# sourceMappingURL=VisualizationCatalog.js.map