/// <reference types="react" />
import { MeasureOrPlaceholder, NullableFiltersOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps, ICoreChartProps } from "../../interfaces/index.js";
import { ICoreHeadlineExtendedProps } from "./CoreHeadline.js";
/**
 * @public
 */
export interface IHeadlineBucketProps {
    /**
     * Specify the measure whose value will be shown as the headline.
     */
    primaryMeasure: MeasureOrPlaceholder;
    /**
     * Specify secondary measure whose value will be shown for comparison with the primary measure.
     * The change in percent between the two values will also be calculated and displayed.
     *
     * @deprecated this property is deprecated, use secondaryMeasures instead
     */
    secondaryMeasure?: MeasureOrPlaceholder;
    /**
     * Specify secondary measures whose values will be shown as the compare values.
     */
    secondaryMeasures?: MeasureOrPlaceholder[];
    /**
     * Specify filters to apply on the data to chart.
     */
    filters?: NullableFiltersOrPlaceholders;
    /**
     * Resolution context for composed placeholders.
     */
    placeholdersResolutionContext?: any;
}
/**
 * @public
 */
export interface IHeadlineProps extends IBucketChartProps, IHeadlineBucketProps {
}
/**
 * Headline shows a single number or compares two numbers. You can display both measures and attributes.
 *
 * @remarks
 * Headlines have two sections: Measure (primary) and Measure (secondary).
 * You can add one item to each section. If you add two items, the headline also displays the change in percent.
 *
 * See {@link IHeadlineProps} to learn how to configure the Headline and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/headline_component.html | headline documentation} for more information.
 *
 * @public
 */
export declare const Headline: (props: IHeadlineProps) => JSX.Element;
export declare function RenderHeadline(props: IHeadlineProps): JSX.Element;
type CoreHeadlineProps = ICoreChartProps & ICoreHeadlineExtendedProps;
export declare function toCoreHeadlineProps(props: IHeadlineProps, enableNewHeadline: boolean): CoreHeadlineProps;
export {};
//# sourceMappingURL=Headline.d.ts.map