/// <reference types="react" />
import { MeasureOrPlaceholder, NullableFiltersOrPlaceholders, SortsOrPlaceholders, AttributeOrPlaceholder } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface IScatterPlotBucketProps {
    /**
     * Specify measure which will be used to position data points on the X axis.
     */
    xAxisMeasure?: MeasureOrPlaceholder;
    /**
     * Specify measure which will be used to position data points on the Y axis.
     */
    yAxisMeasure?: MeasureOrPlaceholder;
    /**
     * Specify attribute whose values will be used to create data points.
     */
    attribute?: AttributeOrPlaceholder;
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
export interface IScatterPlotProps extends IBucketChartProps, IScatterPlotBucketProps {
}
/**
 * Scatter plot shows data as points using Cartesian coordinates.
 *
 * @remarks
 * Scatter plots typically have a minimum of two measures, one for the X-axis and the other for the Y-axis, and one
 * attribute, which determines the meaning of each data point. Scatter plots are useful for analyzing trends between
 * two measures or for tracking the magnitude of two measures from the same chart.
 *
 * See {@link IScatterPlotProps} to learn how to configure the ScatterPlot and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/scatter_plot_component.html | scatter plot documentation} for more information.
 *
 * @public
 */
export declare const ScatterPlot: (props: IScatterPlotProps) => JSX.Element;
//# sourceMappingURL=ScatterPlot.d.ts.map