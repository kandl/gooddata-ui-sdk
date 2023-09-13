/// <reference types="react" />
import { IBucketChartProps } from "../../interfaces/index.js";
import { MeasureOrPlaceholder, AttributeOrPlaceholder, NullableFiltersOrPlaceholders, SortsOrPlaceholders } from "@gooddata/sdk-ui";
/**
 * @public
 */
export interface IBubbleChartBucketProps {
    /**
     * Specify measure which will be used to position bubbles on the X axis.
     */
    xAxisMeasure?: MeasureOrPlaceholder;
    /**
     * Specify measure which will be used to position bubbles on the Y axis
     */
    yAxisMeasure?: MeasureOrPlaceholder;
    /**
     * Specify measure which will be used to determine the size of each bubble.
     */
    size?: MeasureOrPlaceholder;
    /**
     * Specify attribute whose values will be used to create the bubbles.
     */
    viewBy?: AttributeOrPlaceholder;
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
export interface IBubbleChartProps extends IBucketChartProps, IBubbleChartBucketProps {
}
/**
 * Bubble chart shows data as bubbles using Cartesian coordinates.
 *
 * @remarks
 * Bubble charts typically have three measures, one
 * for the X-axis, one for the Y-axis, and one that determines the size of each bubble. The data is sliced by an
 * attribute, with each bubble (an attribute item) noted with a different color.
 *
 * See {@link IBubbleChartProps} to learn how to configure the BubbleChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/bubble_chart_component.html | bubble chart documentation} for more information.
 *
 * @public
 */
export declare const BubbleChart: (props: IBubbleChartProps) => JSX.Element;
//# sourceMappingURL=BubbleChart.d.ts.map