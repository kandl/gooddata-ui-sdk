/// <reference types="react" />
import { AttributeOrPlaceholder, AttributesMeasuresOrPlaceholders, NullableFiltersOrPlaceholders, SortsOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface IWaterfallChartBucketProps {
    /**
     * Specify one or more measures to segment the waterfall chart.
     *
     * @remarks
     * If you specify a single measure, then you may further specify the viewBy attribute
     *
     * If you specify multiple measures, then there will be a column for each measure value. You may not
     * specify the viewBy in this case.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify viewBy attribute that will be used to create the column There will be a column
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
export interface IWaterfallChartProps extends IBucketChartProps, IWaterfallChartBucketProps {
}
/**
 * Waterfall chart shows data as proportional segments of a disc.
 *
 * @remarks
 * Waterfall charts can be segmented by either multiple measures or an attribute.
 *
 * See {@link IWaterfallChartProps} to learn how to configure the WaterfallChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/waterfall_chart_component.html | Waterfall chart documentation} for more information.
 *
 * @public
 */
export declare const WaterfallChart: (props: IWaterfallChartProps) => JSX.Element;
//# sourceMappingURL=WaterfallChart.d.ts.map