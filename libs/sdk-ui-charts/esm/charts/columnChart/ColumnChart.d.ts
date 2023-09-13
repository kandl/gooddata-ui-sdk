/// <reference types="react" />
import { AttributeOrPlaceholder, AttributesOrPlaceholders, AttributesMeasuresOrPlaceholders, FiltersOrPlaceholders, SortsOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface IColumnChartBucketProps {
    /**
     * Specify one or more measures to display on the column chart.
     *
     * @remarks
     * Note: it is possible to also include an attribute object among measures. In that case cardinality of the
     * attribute elements will be charted.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify one or two attributes to slice the measures along the X axis.
     *
     * @remarks
     * If you specify two attributes, the values of these attributes will appear on the X axis as grouped. For each
     * value of the first attribute there will be all applicable values of the second attribute. For each value of the
     * second attribute there will be a column indicating the respective slice's value.
     */
    viewBy?: AttributeOrPlaceholder | AttributesOrPlaceholders;
    /**
     * Specify attribute to stack the bars by.
     */
    stackBy?: AttributeOrPlaceholder;
    /**
     * Specify filters to apply on the data to chart.
     */
    filters?: FiltersOrPlaceholders;
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
export interface IColumnChartProps extends IBucketChartProps, IColumnChartBucketProps {
}
/**
 * Column chart shows data in vertical columns.
 *
 * @remarks
 * Column charts can display one or multiple measures side by side,
 * divided by either attribute values or by a single measure stacked by attribute values.
 *
 * See {@link IColumnChartProps} to learn how to configure the ColumnChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/column_chart_component.html | column chart documentation} for more information.
 *
 * @public
 */
export declare const ColumnChart: (props: IColumnChartProps) => JSX.Element;
//# sourceMappingURL=ColumnChart.d.ts.map