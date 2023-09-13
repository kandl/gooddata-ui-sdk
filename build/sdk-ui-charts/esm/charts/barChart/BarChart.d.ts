/// <reference types="react" />
import { AttributesMeasuresOrPlaceholders, AttributeOrPlaceholder, AttributesOrPlaceholders, NullableFiltersOrPlaceholders, SortsOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface IBarChartBucketProps {
    /**
     * Specify one or more measures to display on the bar chart.
     *
     * @remarks
     * Note: it is possible to also include an attribute object among measures. In that case cardinality of the
     * attribute elements will be charted.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify one or two attributes to slice the measures along the Y axis.
     *
     * @remarks
     * If you specify two attributes, the values of these attributes will appear on the Y axis as grouped. For each
     * value of the first attribute there will be all applicable values of the second attribute. For each value of the
     * second attribute there will be a bar indicating the respective slice's value.
     */
    viewBy?: AttributeOrPlaceholder | AttributesOrPlaceholders;
    /**
     * Specify attribute to stack the bars by.
     */
    stackBy?: AttributeOrPlaceholder;
    /**
     * Specify filters to apply on the data to chart.
     */
    filters?: NullableFiltersOrPlaceholders;
    /**
     * Specify how to sort the data to chart.
     */
    sortBy?: SortsOrPlaceholders;
    /**
     * Resolution context for composed placeholders.
     */
    placeholdersResolutionContext?: any;
}
/**
 * @public
 */
export interface IBarChartProps extends IBarChartBucketProps, IBucketChartProps {
}
/**
 * Bar chart shows data in horizontal bars.
 *
 * @remarks
 * Bar charts can display one or multiple metrics side by side divided by
 * attribute values or a single measure stacked by attribute values.
 *
 * See {@link IBarChartProps} to learn how to configure the BarChart and the
 *  {@link https://sdk.gooddata.com/gooddata-ui/docs/bar_chart_component.html | bar chart documentation} for more information.
 *
 * @public
 */
export declare const BarChart: (props: IBarChartProps) => JSX.Element;
//# sourceMappingURL=BarChart.d.ts.map