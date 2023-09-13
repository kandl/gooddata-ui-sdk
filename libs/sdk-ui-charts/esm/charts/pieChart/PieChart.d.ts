/// <reference types="react" />
import { NullableFiltersOrPlaceholders, SortsOrPlaceholders, AttributeOrPlaceholder, AttributesMeasuresOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface IPieChartBucketProps {
    /**
     * Specify one or more measures to segment the pie chart.
     *
     * @remarks
     * If you specify a single measure, then you may further specify the viewBy attribute - there will be a
     * pie slice per attribute value.
     *
     * If you specify multiple measures, then there will be a pie slice for each measure value. You may not
     * specify the viewBy in this case.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify viewBy attribute that will be used to create the pie slices. There will be a slice
     * for each value of the attribute.
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
export interface IPieChartProps extends IBucketChartProps, IPieChartBucketProps {
}
/**
 * Pie chart shows data as proportional segments of a disc.
 *
 * @remarks
 * Pie charts can be segmented by either multiple measures or an attribute.
 *
 * See {@link IPieChartProps} to learn how to configure the PieChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/pie_chart_component.html | pie chart documentation} for more information.
 *
 * @public
 */
export declare const PieChart: (props: IPieChartProps) => JSX.Element;
//# sourceMappingURL=PieChart.d.ts.map