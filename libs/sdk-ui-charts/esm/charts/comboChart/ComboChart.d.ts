/// <reference types="react" />
import { MeasuresOrPlaceholders, AttributeOrPlaceholder, AttributesOrPlaceholders, NullableFiltersOrPlaceholders, SortsOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface IComboChartBucketProps {
    /**
     * Specify primary measures to render using the primary chart type.
     */
    primaryMeasures?: MeasuresOrPlaceholders;
    /**
     * Specify secondary measures to render using the secondary chart type.
     */
    secondaryMeasures?: MeasuresOrPlaceholders;
    /**
     * Specify one or two attributes to use for slicing the measure values along the X axis.
     *
     * @remarks
     * If you specify two attributes, the values of these attributes will appear on the X axis as grouped. For each
     * value of the first attribute there will be all applicable values of the second attribute. For each value of the
     * second attribute there will be a point/column/area indicating the respective slice's value.
     */
    viewBy?: AttributeOrPlaceholder | AttributesOrPlaceholders;
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
export interface IComboChartProps extends IBucketChartProps, IComboChartBucketProps {
}
/**
 * Combo chart combines two types of visualizations, for example, a column chart and a line chart.
 *
 * @remarks
 * A combo chart can
 * have one or two axes. If a combo chart has two axes, it is often referred to as a dual axis chart.
 *
 * By default, a combo chart is displayed as a combination of a column chart and a line chart, with the secondary axis
 * enabled (you can [disable it](https://sdk.gooddata.com/gooddata-ui/docs/combo_chart_component.html#disable-the-secondary-axis)).
 *
 * The chart types used to display primary and secondary measures can be customized in {@link IChartConfig}.
 *
 * See {@link IComboChartProps} to learn how to configure the ComboChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/combo_chart_component.html | combo chart documentation} for more information.
 *
 * @public
 */
export declare const ComboChart: (props: IComboChartProps) => JSX.Element;
//# sourceMappingURL=ComboChart.d.ts.map