import { HighchartsResponsiveOptions } from "../../lib/index.js";
/**
 * Responsive config for multiple charts.
 * Some charts (e.g. bar chart) have inverted axes - the x-axis stands for the y-axis and vice versa,
 * therefore is possible to use the boolean parameter "inverted" to get inverted config.
 */
export declare const getCommonResponsiveConfig: (inverted?: boolean, xAxesCount?: number, yAxesCount?: number) => HighchartsResponsiveOptions;
/**
 * Special responsive config is applicable for Pie chart and Donut chart.
 * Pie chart config is implicitly called from Donut chart config, therefore these configs are same.
 */
export declare const getPieResponsiveConfig: () => HighchartsResponsiveOptions;
//# sourceMappingURL=responsive.d.ts.map