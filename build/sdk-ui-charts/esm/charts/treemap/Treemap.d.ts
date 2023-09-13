/// <reference types="react" />
import { AttributesMeasuresOrPlaceholders, AttributeOrPlaceholder, NullableFiltersOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface ITreemapBucketProps {
    /**
     * Specify one or more measures whose values will be used to create the treemap rectangles.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify an attribute whose values will be used to slice the measure.
     *
     * @remarks
     * Treemap will chart one rectangle for each attribute value, these rectangles represent unique
     * entities in the hierarchy, each will be colored uniquely.
     *
     * Note: treemap only supports viewBy only when `measures` contains a single measure.
     */
    viewBy?: AttributeOrPlaceholder;
    /**
     * Specify an attribute, whose values will be used to segment the rectangles created for
     * the measures or the combination of measure and viewBy attribute values.
     *
     * @remarks
     * Segmenting essentially adds another level into the hierarchy.
     */
    segmentBy?: AttributeOrPlaceholder;
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
export interface ITreemapProps extends IBucketChartProps, ITreemapBucketProps {
}
/**
 * Treemap chart presents your data hierarchically as nested rectangles.
 *
 * @remarks
 * Treemaps are useful for comparing proportions within the hierarchy.
 *
 * See {@link ITreemapProps} to learn how to configure the Treemap and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/treemap_component.html | treemap documentation} for more information.
 *
 * @public
 */
export declare const Treemap: (props: ITreemapProps) => JSX.Element;
//# sourceMappingURL=Treemap.d.ts.map