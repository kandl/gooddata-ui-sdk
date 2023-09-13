/// <reference types="react" />
import { AttributeOrPlaceholder, AttributesMeasuresOrPlaceholders, NullableFiltersOrPlaceholders, SortsOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface ILineChartBucketProps {
    /**
     * Specify one or more measures whose values will be displayed on the line chart.
     *
     * @remarks
     * If you specify two or more measures, values of each measure will have their own line.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify single attribute whose values will be used to slice the lines along the X axis.
     */
    trendBy?: AttributeOrPlaceholder;
    /**
     * Specify single attribute whose values will be used to segment the measure values.
     *
     * @remarks
     * The line chart will display one line per measure values pertaining to the segmentBy attribute values.
     */
    segmentBy?: AttributeOrPlaceholder;
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
export interface ILineChartProps extends IBucketChartProps, ILineChartBucketProps {
}
/**
 * Line chart shows data as line-connected dots.
 *
 * @remarks
 * Line charts can display either multiple measures as individual lines
 * or a single measure split by one attribute into multiple lines with points intersecting attribute values.
 *
 * See {@link ILineChartProps} to learn how to configure the LineChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/line_chart_component.html | line chart documentation} for more information.
 *
 * @public
 */
export declare const LineChart: (props: ILineChartProps) => JSX.Element;
//# sourceMappingURL=LineChart.d.ts.map