/// <reference types="react" />
import { IAttribute, IAttributeOrMeasure } from "@gooddata/sdk-model";
import { IBucketChartProps, IChartConfig } from "../../interfaces/index.js";
import { AttributesMeasuresOrPlaceholders, AttributeOrPlaceholder, AttributesOrPlaceholders, NullableFiltersOrPlaceholders, SortsOrPlaceholders } from "@gooddata/sdk-ui";
export declare function getBucketsProps(props: IAreaChartBucketProps): {
    measures: IAttributeOrMeasure[];
    viewBy: IAttribute[];
    stackBy: IAttribute[];
};
export declare function getConfigProps(props: IAreaChartProps): IChartConfig;
/**
 * @public
 */
export interface IAreaChartBucketProps {
    /**
     * Specify one or more measures to display on area chart.
     *
     * @remarks
     * Note: it is possible to also include an attribute object among measures. In that case cardinality of the
     * attribute elements will be charted.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify attributes to slice and stack the area chart.
     *
     * @remarks
     * -  If you specify single attribute, then elements of this attribute will be used to slice the measures along the
     *    X axis.
     *
     * -  If you specify two attributes, then the first attribute will be used to slice the measures along the X axis,
     *    and the second attribute will be used for stacking.
     *
     * -  If you specify three or more attributes, only the first two attributes will be used.
     *
     * Note: using two measures in viewBy is a convenience. It is equivalent to specifying single viewBy and single
     * stackBy attribute. In either case, as soon as the area chart is stacked, only the first measure will be
     * calculated and charted.
     */
    viewBy?: AttributeOrPlaceholder | AttributesOrPlaceholders;
    /**
     * Specify attribute to stack by. This is only applicable if you specify at most single viewBy
     * attribute.
     *
     * @remarks
     * Note: stacking area chart using attribute elements means only a single measure can be charted. The component
     * will take the first measure.
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
export interface IAreaChartProps extends IBucketChartProps, IAreaChartBucketProps {
}
/**
 * Area chart shows data as an area under a line intersecting dots.
 *
 * @remarks
 * It can display either:
 *
 * - multiple measures sliced by a single attribute, as different areas
 * - or a single measure split by one attribute into multiple areas with points intersecting attribute values
 *
 * Areas for multiple measures stack by default. Alternatively, the areas can overlap if `{ stackMeasures: false }`.
 *
 * See {@link IAreaChartProps} to learn how it is possible to configure the AreaChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/area_chart_component.html | area chart documentation} for more information.
 *
 * @public
 */
export declare const AreaChart: (props: IAreaChartProps) => JSX.Element;
//# sourceMappingURL=AreaChart.d.ts.map