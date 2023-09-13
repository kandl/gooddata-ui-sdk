/// <reference types="react" />
import { AttributesMeasuresOrPlaceholders, AttributeOrPlaceholder, NullableFiltersOrPlaceholders, SortsOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface IPyramidChartBucketProps {
    /**
     * Specify one or more measures to chart into a pyramid.
     *
     * @remarks
     * If you specify single measure, then you can also specify the viewBy attribute. Values of that attribute
     * will be used for slicing and will be charted as a pyramid.
     *
     * If you specify multiple measures, then those calculate measure values will be charted into a pyramid.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify attribute that will be used to slice the single measure into multiple pieces that
     * will be charted into a pyramid.
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
export interface IPyramidChartProps extends IBucketChartProps, IPyramidChartBucketProps {
}
/**
 * A pyramid chart displays values on top of each other, useful for example for showing hierarchies or workflows.
 *
 * @remarks
 * You can define pyramid chart using either multiple measures or single measure and a viewBy attribute whose
 * values will be used to slice the single measure.
 *
 * See {@link IPyramidChartProps} to learn how to configure the PyramidChart.
 *
 * @public
 */
export declare const PyramidChart: (props: IPyramidChartProps) => JSX.Element;
//# sourceMappingURL=PyramidChart.d.ts.map