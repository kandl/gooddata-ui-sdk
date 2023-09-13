/// <reference types="react" />
import { AttributesMeasuresOrPlaceholders, AttributeOrPlaceholder, NullableFiltersOrPlaceholders, SortsOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface IFunnelChartBucketProps {
    /**
     * Specify one or more measures to chart into a funnel.
     *
     * @remarks
     * If you specify single measure, then you can also specify the viewBy attribute. Values of that attribute
     * will be used for slicing and will be charted as a funnel.
     *
     * If you specify multiple measures, then those calculate measure values will be charted into a funnel.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify attribute that will be used to slice the single measure into multiple pieces that
     * will be charted into a funnel.
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
export interface IFunnelChartProps extends IBucketChartProps, IFunnelChartBucketProps {
}
/**
 * A funnel chart displays values as progressively decreasing proportions.
 *
 * @remarks
 * You can define funnel chart using either multiple measures or single measure and a viewBy attribute whose
 * values will be used to slice the single measure.
 *
 * In either case, the measure values will be charted into a funnel. With the largest values being on the broadest
 * part of the funnel, and the smallest values towards the narrow part of the funnel.
 *
 * See {@link IFunnelChartProps} to learn how to configure the FunnelChart.
 *
 * @public
 */
export declare const FunnelChart: (props: IFunnelChartProps) => JSX.Element;
//# sourceMappingURL=FunnelChart.d.ts.map