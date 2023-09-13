/// <reference types="react" />
import { IAttributeOrMeasure } from "@gooddata/sdk-model";
import { AttributeOrPlaceholder, NullableFiltersOrPlaceholders, SortsOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface IDependencyWheelChartBucketProps {
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
export interface IDependencyWheelChartProps extends IBucketChartProps, IDependencyWheelChartBucketProps {
}
/**
 * A dependency wheel is a type of flow diagram, where nodes are laid out in a circle, and links are drawn between them.
 * This width of the link and size of the nodes are proportional to the flow quantity or weight of each link.
 *
 * @remarks
 * A DependencyWheel diagram can be displayed with one measure and one or two attributes,
 * where the measure represents the width of the links and the attributes represent the nodes of the links
 *
 * See {@link IDependencyWheelChartProps} to learn how to configure the DependencyWheelChart.
 *
 * @public
 */
export declare const DependencyWheelChart: (props: IDependencyWheelChartProps) => JSX.Element;
//# sourceMappingURL=DependencyWheelChart.d.ts.map