/// <reference types="react" />
import { NullableFiltersOrPlaceholders, SortsOrPlaceholders, AttributeMeasureOrPlaceholder, AttributeOrPlaceholder, AttributesMeasuresOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface IDonutChartBucketProps {
    /**
     * Specify one or more measures to segment the donut chart.
     *
     * @remarks
     * If you specify a single measure, then you may further specify the viewBy attribute - there will be
     * donut slice per attribute value.
     *
     * If you specify multiple measures, then there will be a donut slice for each measure value. You may not
     * specify the viewBy in this case.
     */
    measures: AttributeMeasureOrPlaceholder | AttributesMeasuresOrPlaceholders;
    /**
     * Specify viewBy attribute that will be used to create the donut slices. There will be a slice
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
export interface IDonutChartProps extends IBucketChartProps, IDonutChartBucketProps {
}
/**
 * Donut chart shows data as proportional segments of a disc and has a hollowed out center.
 *
 * @remarks
 * Donut charts can be segmented by either multiple measures or an attribute, and allow viewers to visualize
 * component parts of a whole.
 *
 * Note: the donut chart slices are by default sorted from largest to smallest. There is also a limit on the
 * number of slices that will be charted.
 *
 * See {@link IDonutChartProps} to learn how to configure the DonutChart and
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/donut_chart_component.html | donut chart documentation} for more information.
 *
 * @public
 */
export declare const DonutChart: (props: IDonutChartProps) => JSX.Element;
//# sourceMappingURL=DonutChart.d.ts.map