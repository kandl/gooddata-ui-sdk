/**
 * @internal
 */
export declare const VisualizationTypes: {
    BAR: "bar";
    COLUMN: "column";
    LINE: "line";
    PIE: "pie";
    DONUT: "donut";
    TABLE: "table";
    HEADLINE: "headline";
    AREA: "area";
    SCATTER: "scatter";
    BUBBLE: "bubble";
    HEATMAP: "heatmap";
    GEO: "geo";
    PUSHPIN: "pushpin";
    COMBO: "combo";
    COMBO2: "combo2";
    HISTOGRAM: "histogram";
    BULLET: "bullet";
    TREEMAP: "treemap";
    WATERFALL: "waterfall";
    FUNNEL: "funnel";
    PYRAMID: "pyramid";
    PARETO: "pareto";
    ALLUVIAL: "alluvial";
    SANKEY: "sankey";
    DEPENDENCY_WHEEL: "dependencywheel";
    XIRR: "xirr";
};
/**
 * @public
 */
export type ChartType = "bar" | "column" | "pie" | "line" | "area" | "donut" | "scatter" | "bubble" | "heatmap" | "geo" | "pushpin" | "combo" | "combo2" | "histogram" | "bullet" | "treemap" | "waterfall" | "funnel" | "pyramid" | "pareto" | "alluvial" | "sankey" | "dependencywheel";
/**
 * @public
 */
export type HeadlineType = "headline";
/**
 * @public
 */
export type XirrType = "xirr";
/**
 * @public
 */
export type TableType = "table";
/**
 * @public
 */
export type VisType = ChartType | HeadlineType | TableType | XirrType;
/**
 * @public
 */
export type ChartElementType = "slice" | "bar" | "point" | "label" | "cell" | "target" | "primary" | "comparative";
/**
 * @public
 */
export type HeadlineElementType = "primaryValue" | "secondaryValue";
/**
 * @public
 */
export type TableElementType = "cell";
/**
 * @public
 */
export type VisElementType = ChartElementType | HeadlineElementType | TableElementType | "pushpin";
/**
 * @internal
 */
export type VisualizationEnvironment = "none" | "dashboards" | "analyticalDesigner";
/**
 * @internal
 */
export declare function getVisualizationType(type: ChartType): ChartType;
//# sourceMappingURL=visualizationTypes.d.ts.map