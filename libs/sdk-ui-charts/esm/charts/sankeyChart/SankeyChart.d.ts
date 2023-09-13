/// <reference types="react" />
import { IAttributeOrMeasure } from "@gooddata/sdk-model";
import { AttributeOrPlaceholder, NullableFiltersOrPlaceholders, SortsOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface ISankeyChartBucketProps {
    /**
     * Specify a measure whose values will be displayed as the width of the links
     */
    measure: IAttributeOrMeasure;
    /**
     * Specify attribute, whose values will be used to create from element.
     */
    attributeFrom?: AttributeOrPlaceholder;
    /**
     * Specify attribute, whose values will be used to create to element.
     */
    attributeTo?: AttributeOrPlaceholder;
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
export interface ISankeyChartProps extends IBucketChartProps, ISankeyChartBucketProps {
}
/**
 * A Sankey diagram is a type of flow diagram,
 * in which the width of the link between two nodes is shown proportionally to the flow quantity.
 *
 * @remarks
 * A Sankey diagram can be displayed with one measure and one or two attributes,
 * where the measure represents the width of the links and the attributes represent the nodes of the links
 *
 * See {@link ISankeyChartProps} to learn how to configure the SankeyChart.
 *
 * @public
 */
export declare const SankeyChart: (props: ISankeyChartProps) => JSX.Element;
//# sourceMappingURL=SankeyChart.d.ts.map