/// <reference types="react" />
import { SortsOrPlaceholders, AttributeMeasureOrPlaceholder, AttributeOrPlaceholder, AttributesOrPlaceholders, NullableFiltersOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps } from "../../interfaces/index.js";
/**
 * @public
 */
export interface IBulletChartBucketProps {
    /**
     * Specify primary measure. This will be charted as the primary bar.
     */
    primaryMeasure: AttributeMeasureOrPlaceholder;
    /**
     * Specify measure which contains the target/goal value. The value will be charted as the thick
     * line to reach.
     */
    targetMeasure?: AttributeMeasureOrPlaceholder;
    /**
     * Specify measure to use for comparison. This will be charted as the secondary bar.
     */
    comparativeMeasure?: AttributeMeasureOrPlaceholder;
    /**
     * Specify one or two attributes to use for slicing the measures.
     *
     * @remarks
     * If you specify two attributes, the values of these attributes will appear on the Y axis as grouped. For each
     * value of the first attribute there will be all applicable values of the second attribute. For each value of the
     * second attribute, there will be a bullet.
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
export interface IBulletChartProps extends IBulletChartBucketProps, IBucketChartProps {
}
/**
 * Bullet chart is a variation of a bar chart that displays performance of a measure (primary measure) and its progress
 * towards a goal (target measure).
 *
 * @remarks
 * Optionally, the primary measure can also be compared to another measure (comparative measure).
 *
 * See {@link IBulletChartProps} to learn how to configure the BulletChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/bullet_chart_component.html | bullet chart documentation} for more information.
 *
 * @public
 */
export declare const BulletChart: (props: IBulletChartProps) => JSX.Element;
//# sourceMappingURL=BulletChart.d.ts.map