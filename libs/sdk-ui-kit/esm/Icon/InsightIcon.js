import { Icon } from "./Icon.js";
const INSIGHT_ICON_MAP = {
    "local:scatter": Icon.ScatterPlot,
    "local:donut": Icon.Donut,
    "local:headline": Icon.HeadlineChart,
    "local:treemap": Icon.TreeMap,
    "local:combo2": Icon.Combo,
    "local:heatmap": Icon.HeatMap,
    "local:bubble": Icon.Bubble,
    "local:bullet": Icon.Bullet,
    "local:bar": Icon.Bar,
    "local:table": Icon.Table,
    "local:area": Icon.StackedArea,
    "local:column": Icon.Column,
    "local:line": Icon.Line,
    "local:pushpin": Icon.Geo,
    "local:pie": Icon.Pie,
    "local:sankey": Icon.Sankey,
    "local:dependencywheel": Icon.DependencyWheel,
    "local:funnel": Icon.Funnel,
    "local:pyramid": Icon.Pyramid,
    "local:waterfall": Icon.Waterfall,
};
/**
 * @internal
 */
export const InsightIcon = ({ visualizationUrl, iconProps = {} }) => {
    if (!visualizationUrl || !INSIGHT_ICON_MAP[visualizationUrl]) {
        return null;
    }
    return INSIGHT_ICON_MAP[visualizationUrl](iconProps);
};
//# sourceMappingURL=InsightIcon.js.map