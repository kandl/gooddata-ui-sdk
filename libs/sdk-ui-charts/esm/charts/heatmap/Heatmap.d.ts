/// <reference types="react" />
import { AttributeMeasureOrPlaceholder, AttributeOrPlaceholder, NullableFiltersOrPlaceholders, SortsOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface IHeatmapBucketProps {
    /**
     * Specify measure whose values will be charted on the heatmap.
     */
    measure: AttributeMeasureOrPlaceholder;
    /**
     * Specify attribute, whose values will be used to create rows in the heatmap.
     */
    rows?: AttributeOrPlaceholder;
    /**
     * Specify attribute, whose values will be used to create columns in the heatmap.
     */
    columns?: AttributeOrPlaceholder;
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
export interface IHeatmapProps extends IBucketChartProps, IHeatmapBucketProps {
}
/**
 * Heatmap represents data as a matrix where individual values are represented as colors.
 * Heatmaps can help you discover trends and understand complex datasets.
 *
 * @remarks
 * See {@link IHeatmapProps} to learn how to configure the Heatmap and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/heatmap_component.html | heatmap documentation} for more information.
 *
 * @public
 */
export declare const Heatmap: (props: IHeatmapProps) => JSX.Element;
//# sourceMappingURL=Heatmap.d.ts.map