// (C) 2007-2023 GoodData Corporation
/**
 * @internal
 */
export const VisualizationTypes = {
    BAR: "bar",
    COLUMN: "column",
    LINE: "line",
    PIE: "pie",
    DONUT: "donut",
    TABLE: "table",
    HEADLINE: "headline",
    AREA: "area",
    SCATTER: "scatter",
    BUBBLE: "bubble",
    HEATMAP: "heatmap",
    GEO: "geo",
    PUSHPIN: "pushpin",
    COMBO: "combo",
    COMBO2: "combo2",
    HISTOGRAM: "histogram",
    BULLET: "bullet",
    TREEMAP: "treemap",
    WATERFALL: "waterfall",
    FUNNEL: "funnel",
    PYRAMID: "pyramid",
    PARETO: "pareto",
    ALLUVIAL: "alluvial",
    SANKEY: "sankey",
    DEPENDENCY_WHEEL: "dependencywheel",
    XIRR: "xirr",
};
/**
 * @internal
 */
export function getVisualizationType(type) {
    if (type === VisualizationTypes.COMBO2) {
        return VisualizationTypes.COMBO;
    }
    return type;
}
//# sourceMappingURL=visualizationTypes.js.map