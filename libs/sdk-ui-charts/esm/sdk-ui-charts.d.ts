/**
 * This package provides a set of React-based chart visualizations that you can use to visualize your data.
 *
 * @remarks
 * These include bar charts, pie charts, line charts, and more.
 * For a table visualization, see the `@gooddata/sdk-ui-pivot` package.
 * For map-based charts, see the `@gooddata/sdk-ui-geo` package.
 *
 * @packageDocumentation
 */

/// <reference types="react" />

import { AttributeMeasureOrPlaceholder } from '@gooddata/sdk-ui';
import { AttributeOrPlaceholder } from '@gooddata/sdk-ui';
import { AttributesMeasuresOrPlaceholders } from '@gooddata/sdk-ui';
import { AttributesOrPlaceholders } from '@gooddata/sdk-ui';
import { ChartType } from '@gooddata/sdk-ui';
import { ColorUtils } from '@gooddata/sdk-ui-vis-commons';
import { ExplicitDrill } from '@gooddata/sdk-ui';
import { FiltersOrPlaceholders } from '@gooddata/sdk-ui';
import { getColorMappingPredicate } from '@gooddata/sdk-ui-vis-commons';
import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IAttributeOrMeasure } from '@gooddata/sdk-model';
import { IBucket } from '@gooddata/sdk-model';
import { IColor } from '@gooddata/sdk-model';
import { IColorMapping } from '@gooddata/sdk-ui-vis-commons';
import { IColorPalette } from '@gooddata/sdk-model';
import { IDataView } from '@gooddata/sdk-backend-spi';
import { Identifier } from '@gooddata/sdk-model';
import { IDrillEventCallback } from '@gooddata/sdk-ui';
import { IExecutionConfig } from '@gooddata/sdk-model';
import { IExecutionFactory } from '@gooddata/sdk-backend-spi';
import { IFilter } from '@gooddata/sdk-model';
import { IPreparedExecution } from '@gooddata/sdk-backend-spi';
import { IRgbColorValue } from '@gooddata/sdk-model';
import { ISeparators } from '@gooddata/sdk-model';
import { ISettings } from '@gooddata/sdk-model';
import { ISortItem } from '@gooddata/sdk-model';
import { ITheme } from '@gooddata/sdk-model';
import { IVisualizationCallbacks } from '@gooddata/sdk-ui';
import { IVisualizationProps } from '@gooddata/sdk-ui';
import { LodashIsEqual1x1 } from 'lodash/fp.js';
import { MeasureOrPlaceholder } from '@gooddata/sdk-ui';
import { MeasuresOrPlaceholders } from '@gooddata/sdk-ui';
import { NullableFiltersOrPlaceholders } from '@gooddata/sdk-ui';
import { default as React_2 } from 'react';
import { SortsOrPlaceholders } from '@gooddata/sdk-ui';
import { VisType } from '@gooddata/sdk-ui';

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

/**
 * Position of the axis label relative to the axis.
 *
 * @public
 */
export declare type AxisNamePosition = "high" | "low" | "middle";

/**
 * Bar chart shows data in horizontal bars.
 *
 * @remarks
 * Bar charts can display one or multiple metrics side by side divided by
 * attribute values or a single measure stacked by attribute values.
 *
 * See {@link IBarChartProps} to learn how to configure the BarChart and the
 *  {@link https://sdk.gooddata.com/gooddata-ui/docs/bar_chart_component.html | bar chart documentation} for more information.
 *
 * @public
 */
export declare const BarChart: (props: IBarChartProps) => JSX.Element;

/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disappear.
 *
 * @internal
 */
export declare const BaseChart: React_2.ComponentClass<IBaseChartProps, any>;

/**
 * @internal
 */
export declare const BOTTOM = "bottom";

/**
 * Bubble chart shows data as bubbles using Cartesian coordinates.
 *
 * @remarks
 * Bubble charts typically have three measures, one
 * for the X-axis, one for the Y-axis, and one that determines the size of each bubble. The data is sliced by an
 * attribute, with each bubble (an attribute item) noted with a different color.
 *
 * See {@link IBubbleChartProps} to learn how to configure the BubbleChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/bubble_chart_component.html | bubble chart documentation} for more information.
 *
 * @public
 */
export declare const BubbleChart: (props: IBubbleChartProps) => JSX.Element;

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

/**
 * @internal
 */
export declare const CalculateAs: Record<Uppercase<CalculationType>, CalculationType>;

/**
 * Defines the calculation types for an algorithm.
 *
 * @remarks
 * The table below summarizes the available calculation types:
 *
 * <table>
 *     <tr><th width="150">Type</th><th width="350">Algorithm</th></tr>
 *     <tr><td>change</td><td>(Primary - Secondary) / Secondary</td></tr>
 *     <tr><td>difference</td><td>Primary - Secondary</td></tr>
 *     <tr><td>ratio</td><td>Primary / Secondary</td></tr>
 * </table>
 *
 * @public
 */
export declare type CalculationType = "change" | "ratio" | "difference";

/**
 * Vertical chart alignment options.
 *
 * @public
 */
export declare type ChartAlignTypes = "top" | "bottom" | "middle";

/**
 * Available orientation positions.
 *
 * @public
 */
export declare type ChartOrientationType = "horizontal" | "vertical";

export { ColorUtils }

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

/**
 * @internal
 */
export declare enum ComparisonColorType {
    POSITIVE = "positive",
    NEGATIVE = "negative",
    EQUALS = "equals"
}

/**
 * Comparison format type
 *
 * @remarks
 * Providing a null value will configure the format to inherit from the format of primary measure.
 *
 * @public
 */
export declare type ComparisonFormat = string | null;

/**
 * Defines how the comparison value will be placed.
 *
 * @public
 */
export declare type ComparisonPosition = "top" | "left" | "right" | "auto";

/**
 * @internal
 */
export declare const ComparisonPositionValues: Record<Uppercase<ComparisonPosition>, ComparisonPosition>;

/**
 * @internal
 */
export declare const CoreHeadline: React_2.ComponentClass<ICoreChartProps & ICoreHeadlineExtendedProps, any>;

/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disapppear.
 *
 * @internal
 */
export declare const CoreXirr: React_2.ComponentClass<ICoreChartProps, any>;

/**
 * Factory method to create a specific HeadlineProvider based on the provided buckets and chart configuration.
 *
 * @returns An instance of the IHeadlineProvider interface that corresponds headline business.
 *
 * @internal
 */
export declare const createHeadlineProvider: (buckets: IBucket[], config: IChartConfig, enableNewHeadline: boolean) => IHeadlineProvider;

/**
 * @internal
 */
export declare const DEFAULT_COMPARISON_PALETTE: IColorPalette;

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

/**
 * Donut chart shows data as proportional segments of a disc and has a hollowed out center.
 *
 * @remarks
 * Donut charts can be segmented by either multiple measures or an attribute, and allow viewers to visualize
 * component parts of a whole.
 *
 * Note: the donut chart slices are by default sorted from largest to smallest. There is also a limit on the
 * number of slices that will be charted.
 *
 * See {@link IDonutChartProps} to learn how to configure the DonutChart and
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/donut_chart_component.html | donut chart documentation} for more information.
 *
 * @public
 */
export declare const DonutChart: (props: IDonutChartProps) => JSX.Element;

/**
 * A funnel chart displays values as progressively decreasing proportions.
 *
 * @remarks
 * You can define funnel chart using either multiple measures or single measure and a viewBy attribute whose
 * values will be used to slice the single measure.
 *
 * In either case, the measure values will be charted into a funnel. With the largest values being on the broadest
 * part of the funnel, and the smallest values towards the narrow part of the funnel.
 *
 * See {@link IFunnelChartProps} to learn how to configure the FunnelChart.
 *
 * @public
 */
export declare const FunnelChart: (props: IFunnelChartProps) => JSX.Element;

/**
 * Method to retrieve default values corresponding to the calculation type.
 *
 * @internal
 */
export declare const getCalculationValuesDefault: (calculationType?: CalculationType) => ICalculationDefaultValue;

export { getColorMappingPredicate }

/**
 * Get comparison format
 *
 * @remarks
 * We offer the option to inherit the format with a null value. When the provided format is null,
 * it indicates the user's preference to utilize the inherit format.
 *
 * If the format is undefined, the default format will be used.
 *
 * @internal
 */
export declare const getComparisonFormat: (providedFormat: string, defaultFormat: string) => string;

/**
 * @internal
 */
export declare const getComparisonRgbColor: (color: IColor, colorType: ComparisonColorType, colorPalette?: IColorPalette) => IRgbColorValue;

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

/**
 * @public
 */
export declare interface IAreaChartBucketProps {
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
export declare interface IAreaChartProps extends IBucketChartProps, IAreaChartBucketProps {
}

/**
 * @public
 */
export declare interface IAxisConfig {
    /**
     * Toggle axis visilibity.
     */
    visible?: boolean;
    /**
     * Toggle visibility of labels describing the different axis tics.
     */
    labelsEnabled?: boolean;
    /**
     * If labels are enabled, rotation lets you customize how they should be rotated. Specify this as a number
     * of degrees. Positive number means clockwise rotation, negative is counter-clockwise rotation.
     */
    rotation?: string;
    /**
     * Fox axis with numeric tics, this can influence the minimum value shown on the axis and in the chart itself.
     *
     * The min and max can be used to zoom-in or zoom-out the chart.
     */
    min?: string;
    /**
     * For axis with numeric tics, this can influence the maximum value shown on the axis and in the chart itself.
     *
     * The min and max can be used to zoom-in or zoom-out the chart.
     */
    max?: string;
    /**
     * Customize whether to use format from measure or the default one
     */
    format?: string;
    /**
     * Customize measures which are bound to this axis. This setting comes into play in dual-axis charts where you
     * must specify which measures are on the primary and which on the secondary axis.
     */
    measures?: Identifier[];
    /**
     * Customize whether and how the axis name should appear.
     */
    name?: IAxisNameConfig;
}

/**
 * Customize whether to display the axis name and if so, where relative to the axis it should be positioned.
 *
 * @public
 */
export declare interface IAxisNameConfig {
    /**
     * Toggle axis name visibility.
     */
    visible?: boolean;
    /**
     * Customize where, relative to the axis should the axis name appear.
     */
    position?: AxisNamePosition;
}

/**
 * @public
 */
export declare interface IBarChartBucketProps {
    /**
     * Specify one or more measures to display on the bar chart.
     *
     * @remarks
     * Note: it is possible to also include an attribute object among measures. In that case cardinality of the
     * attribute elements will be charted.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify one or two attributes to slice the measures along the Y axis.
     *
     * @remarks
     * If you specify two attributes, the values of these attributes will appear on the Y axis as grouped. For each
     * value of the first attribute there will be all applicable values of the second attribute. For each value of the
     * second attribute there will be a bar indicating the respective slice's value.
     */
    viewBy?: AttributeOrPlaceholder | AttributesOrPlaceholders;
    /**
     * Specify attribute to stack the bars by.
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
export declare interface IBarChartProps extends IBarChartBucketProps, IBucketChartProps {
}

/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disappear.
 *
 * @internal
 */
export declare interface IBaseChartProps extends ICoreChartProps {
    type: ChartType;
    onLegendReady?: OnLegendReady;
    theme?: ITheme;
}

/**
 * @public
 */
export declare interface IBubbleChartBucketProps {
    /**
     * Specify measure which will be used to position bubbles on the X axis.
     */
    xAxisMeasure?: MeasureOrPlaceholder;
    /**
     * Specify measure which will be used to position bubbles on the Y axis
     */
    yAxisMeasure?: MeasureOrPlaceholder;
    /**
     * Specify measure which will be used to determine the size of each bubble.
     */
    size?: MeasureOrPlaceholder;
    /**
     * Specify attribute whose values will be used to create the bubbles.
     */
    viewBy?: AttributeOrPlaceholder;
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
export declare interface IBubbleChartProps extends IBucketChartProps, IBubbleChartBucketProps {
}

/**
 * Props for all bucket charts.
 *
 * @public
 */
export declare interface IBucketChartProps extends ICommonChartProps {
    /**
     * Analytical backend, from which the chart will obtain data to visualize
     *
     * If you do not specify instance of analytical backend using this prop, then you MUST have
     * BackendProvider up in the component tree.
     */
    backend?: IAnalyticalBackend;
    /**
     * Identifier of analytical workspace, from which the chart will obtain data to visualize.
     *
     * If you do not specify workspace identifier, then you MUST have WorkspaceProvider up in the
     * component tree.
     */
    workspace?: string;
}

/**
 * @public
 */
export declare interface IBulletChartBucketProps {
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
export declare interface IBulletChartProps extends IBulletChartBucketProps, IBucketChartProps {
}

/**
 * @internal
 */
export declare interface ICalculationDefaultValue {
    defaultLabelKey: string;
    defaultFormat: string;
}

/**
 * Defines callbacks to execute for different events.
 *
 * @public
 */
export declare interface IChartCallbacks extends IVisualizationCallbacks {
    /**
     * Called when legend is rendered.
     */
    onLegendReady?: OnLegendReady;
}

/**
 * Chart config is used to customize visual aspects of the different charts.
 *
 * @remarks
 * At the moment, a single structure is used for all the charts - however not all options are applicable to all charts.
 *
 * As is, using the not-applicable option for a chart will be ignored. Going forward, we will add warnings to
 * notify developers that the option has no effect.
 *
 * Note: some properties of the chart config leak unnecessary implementation detail and should not be used. These
 * properties are marked as internal.
 *
 * @public
 */
export declare interface IChartConfig {
    /**
     * Customize what separators to use between different segments of formatted numbers (thousands, decimals etc).
     */
    separators?: ISeparators;
    /**
     * Specify list of colors (#rrggbb) to use when coloring the chart.
     */
    colors?: string[];
    /**
     * Specify color palette to use when coloring the chart.
     *
     * @remarks
     * Note: The color palette is the primary way to specify the colors. If you specify both `colorPalette` and `colors`,
     * then colorPalette will be used.
     */
    colorPalette?: IColorPalette;
    /**
     * Specify custom coloring.
     *
     * @remarks
     * This is done using (predicate, color) pairs. The different entities to chart (e.g.
     * data point, or a measure slice for particular attribute value) will be evaluated against the predicates. The color
     * will be associated in first-found approach.
     */
    colorMapping?: IColorMapping[];
    /**
     * Configure how legend appears and behaves.
     */
    legend?: ILegendConfig;
    /**
     * Configure for the total column of Waterfall chart.
     */
    total?: ITotalConfig;
    /**
     * Configure whether legend items should be laid-out vertically (column legend) or horizontally (line legend).
     */
    legendLayout?: "vertical" | "horizontal";
    /**
     * Configure chart grid.
     */
    grid?: IGridConfig;
    /**
     * Configure chart continuous line.
     */
    continuousLine?: IContinuousLineConfig;
    /**
     * Customize format string to use for numeric tics on the X axis.
     */
    xFormat?: string;
    /**
     * Customize name of the x axis
     */
    xLabel?: string;
    /**
     * Customize format string to use for numeric tics on the Y axis.
     *
     * @remarks
     * The format string conventions are exact same as when formatting measure values.
     */
    yFormat?: string;
    /**
     * Customize name of the y axis
     */
    yLabel?: string;
    /**
     * Customize visibility of the primary X axis, what should be on the primary X axis and how it should look like.
     */
    xaxis?: IAxisConfig;
    /**
     * Customize visibility of the primary Y axis, what should be on the primary Y axis and how it should look like.
     */
    yaxis?: IAxisConfig;
    /**
     * Customize visibility of the secondary X axis, what should be on the secondary X axis and how it should look like.
     */
    secondary_xaxis?: IAxisConfig;
    /**
     * Customize visibility of the secondary Y axis, what should be on the secondary Y axis and how it should look like.
     */
    secondary_yaxis?: IAxisConfig;
    /**
     * Customize visibility of the data labels.
     *
     * @remarks
     * Data Labels typically appear within chart (e.g. next to a bar, inside a pie slice)
     */
    dataLabels?: IDataLabelsConfig;
    /**
     * Customize visibility of the data points.
     *
     * @remarks
     * Data points mark non-extrapolated data in "continuous" charts like line chart, area chart and combo chart made up of these two.
     */
    dataPoints?: IDataPointsConfig;
    /**
     * This turns on dual axis support for ComboChart visualization.
     *
     * @remarks
     * Applicable for ComboChart only. When combo chart specifies both primary and secondary measures, it is by default
     * treated as dual-axis chart. Both primary and secondary axis will be visible.
     *
     * To turn the secondary axis off for ComboChart, set dualAxis: false
     */
    dualAxis?: boolean;
    /**
     * Sets the chart type for primary measures.
     *
     * @remarks
     * Applicable for ComboChart only. Specify type of chart to use for primary measures.
     */
    primaryChartType?: "line" | "column" | "area";
    /**
     * Sets the chart type for secondary measures.
     *
     * @remarks
     * Applicable for ComboChart only. Specify type of chart to use for secondary measures.
     */
    secondaryChartType?: "line" | "column" | "area";
    /**
     * Applicable for Area, Bar, Column and Combo charts which have more than one measure.
     *
     * @remarks
     * For Area chart, this is on by default. If disables, the areas will overall.
     * For Bar and Column charts, this is off by default and each measure has its own bar or column.
     * For Combo, only measures assigned to the left (primary) axis will be stacked.
     */
    stackMeasures?: boolean;
    /**
     * This turns on measure stacking and client-side calculation of percentage contribution.
     *
     * @remarks
     * Applicable for Area, Bar, Column and Combo charts which have more than one measure.
     *
     * This option has preference over the `stackMeasures` option.
     */
    stackMeasuresToPercent?: boolean;
    /**
     * Disables drilling by clicking on axis labels.
     *
     * @remarks
     * When drilling is configured for a chart, users can click either the charted entities (data points, bars, columns etc)
     * or labels on the axes. This setting an be used to disable clicks on the drillable labels on axes.
     */
    forceDisableDrillOnAxes?: boolean;
    /**
     * Disable underlining of drillable items.
     *
     * @remarks
     * Any label or text that is drillable and can be clicked is by default underlined. Set this option to true to
     * disable underlining.
     */
    disableDrillUnderline?: boolean;
    /**
     * Allow zooming and panning in a chart.
     *
     * @remarks
     * When this option is enabled, we will prepare some configs for the 'chart' option to allow the chart can be zooming/panning.
     */
    zoomInsight?: boolean;
    /**
     * Enables more compact rendering of visualization in small containers.
     *
     * @remarks
     * Note: this property might not be supported in all the visualizations.
     *
     */
    enableCompactSize?: boolean;
    /**
     * Enable attribute axis name for the column, bar and bullet charts when view by many attributes.
     */
    enableJoinedAttributeAxisName?: boolean;
    /**
     * Enables custom sorting of visualizations.
     *
     * @remarks
     * Note: this property might not be supported in all the visualizations.
     *
     */
    enableChartSorting?: boolean;
    /**
     * Enables change order of stacked items in bar chart.
     */
    enableReversedStacking?: boolean;
    enableSeparateTotalLabels?: boolean;
    /**
     * This configuration allows users to customize how the comparative measure looks.
     *
     * @remarks
     * Note: currently, this property only supports headlines.
     */
    comparison?: IComparison;
    /**
     * Do not use this. Instead use stackMeasures and/or stackMeasuresToPercent
     * @internal
     */
    stacking?: boolean;
    /**
     * Options passed directly to Highcharts constructor (ChartOptions type)
     *
     * @internal
     */
    chart?: any;
    /**
     * @internal
     */
    limits?: IChartLimits;
    /**
     * @internal
     */
    type?: VisType;
    /**
     * @internal
     */
    tooltip?: ITooltipConfig;
    /**
     * The orientation of the chart
     * @internal
     */
    orientation?: IOrientationConfig;
}

/**
 *
 * @public
 */
export declare interface IChartLimits {
    series?: number;
    categories?: number;
    nodes?: number;
    dataPoints?: number;
}

/**
 * Configuration options for color settings.
 *
 * @public
 */
export declare interface IColorConfig {
    /**
     * Determines whether to disable the comparison color.
     *
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * Specifies the color to use, which can be selected from the color palette or provided as an RGB code.
     * This color is used when the primary measure greater than the secondary measure.
     *
     * @defaultValue rgb(0, 193, 141)
     */
    positive?: IColor;
    /**
     * Specifies the color to use, which can be selected from the color palette or provided as an RGB code.
     * This color is used when the primary measure less than the secondary measure.
     *
     * @defaultValue rgb(229, 77, 64)
     */
    negative?: IColor;
    /**
     * Specifies the color to use, which can be selected from the color palette or provided as an RGB code.
     * This color is used when the primary measure equal to the secondary measure.
     *
     * @defaultValue rgb(148, 161, 173)
     */
    equals?: IColor;
}

export { IColorMapping }

/**
 * @public
 */
export declare interface IColumnChartBucketProps {
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
export declare interface IColumnChartProps extends IBucketChartProps, IColumnChartBucketProps {
}

/**
 * @public
 */
export declare interface IComboChartBucketProps {
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
export declare interface IComboChartProps extends IBucketChartProps, IComboChartBucketProps {
}

/**
 * Props applicable for all charts
 *
 * @public
 */
export declare interface ICommonChartProps extends IVisualizationProps, IChartCallbacks {
    /**
     * Configure chart's behavior and appearance.
     */
    config?: IChartConfig;
    /**
     * Execution configuration, will provide the execution with necessary config before initiating execution.
     */
    execConfig?: IExecutionConfig;
    /**
     * Set height of the chart (in pixels).
     */
    height?: number;
    /**
     * Set width of the chart (in pixels).
     */
    width?: number;
}

/**
 * Configuration options for comparing values.
 *
 * @public
 */
export declare interface IComparison {
    /**
     * Enables or disables the comparison.
     *
     * @defaultValue true
     */
    enabled: boolean;
    /**
     * Defines how the comparison value will be calculated.
     *
     * @remarks
     * The default value is determined by the type of secondary measure:
     * <table>
     *     <tr><th width="250">Type of secondary measure</th><th width="250">Default value</th></tr>
     *     <tr><td>Derived measure</td><td>change</td></tr>
     *     <tr><td>Non-derived measure</td><td>ratio</td></tr>
     * </table>
     *
     * @see {@link CalculationType} for available calculation methods.
     *
     * @defaultValue Based on the secondary measure.
     */
    calculationType?: CalculationType;
    /**
     * Defines how the comparison value will be placed.
     *
     * @see {@link ComparisonPosition} for supported positions
     *
     * @defaultValue auto
     */
    position?: ComparisonPosition;
    /**
     * Defines the number format of the comparison value.
     *
     * @remarks
     * The default value is based on the calculation type:
     * <table>
     *     <tr><th width="150">Calculation Type</th><th width="350">Default format</th></tr>
     *     <tr><td>change</td><td>Percent (rounded)</td></tr>
     *     <tr><td>ratio</td><td>Percent (rounded)</td></tr>
     *     <tr><td>difference</td><td>Inherit</td></tr>
     * </table>
     *
     * @see {@link ComparisonFormat} for supported formats.
     *
     * @defaultValue Based on the calculation type.
     */
    format?: ComparisonFormat;
    /**
     * Controls the visibility of the arrow trend indicator and its direction based on conditions.
     *
     * @remarks
     * The arrow direction is determined as follows:
     *
     * <table>
     *     <tr><th width="300">Condition</th><th width="200">Direction</th></tr>
     *     <tr><td>Primary greater than Secondary</td><td>Up</td></tr>
     *     <tr><td>Primary less than Secondary</td><td>Down</td></tr>
     *     <tr><td>Primary equal to Secondary</td><td>No direction, arrow hidden</td></tr>
     * </table>
     */
    isArrowEnabled?: boolean;
    /**
     * Controls the application of conditional colors.
     *
     * @see {@link IColorConfig} for configuration details.
     */
    colorConfig?: IColorConfig;
    /**
     * Controls the label displayed beneath the comparison value.
     *
     * @see {@link ILabelConfig} for configuration details.
     */
    labelConfig?: ILabelConfig;
}

/**
 * Indicates whether the continuous line for the missing value display or not on Area, Line, and Combo chart
 * @public
 */
export declare interface IContinuousLineConfig {
    /**
     * Enables the continuous line on Area, Line, and Combo chart.
     */
    enabled?: boolean;
}

/**
 * Props for all Core* charts.
 *
 * NOTE: Core* charts are NOT part of public API.
 *
 * @internal
 */
export declare interface ICoreChartProps extends ICommonChartProps {
    /**
     * Prepared execution, which when executed, will provide data to visualize in the chart.
     */
    execution: IPreparedExecution;
}

/**
 * @internal
 */
export declare interface ICoreHeadlineExtendedProps {
    headlineTransformation: React_2.ComponentType<IHeadlineTransformationProps>;
}

/**
 * @internal
 */
export declare interface ICreateExecutionParams {
    buckets: IBucket[];
    filters: IFilter[];
    executionConfig: IExecutionConfig;
    dateFormat?: string;
    sortItems?: ISortItem[];
}

/**
 * @public
 */
export declare interface IDataLabelsConfig {
    visible?: IDataLabelsVisible;
    totalsVisible?: IDataLabelsVisible;
    /**
     * Indicates whether to render data labels enriched with percentages.
     * Applies only to funnel chart.
     */
    percentsVisible?: boolean;
}

/**
 * Data label visibility options.
 *
 * @remarks
 * - false: no labels
 * - true: labels shown, values can overlap when rendered
 * - "auto": labels shown, values will not overlap when rendered
 *
 * @public
 */
export declare type IDataLabelsVisible = boolean | string;

/**
 * @public
 */
export declare interface IDataPointsConfig {
    visible?: IDataPointsVisible;
}

/**
 * Data points visibility options.
 *
 * @remarks
 * - false: no points
 * - true: datapoints shown, datapoints can overlap when rendered
 * - "auto": datapoints shown, datapoints will not overlap when rendered
 *
 * @public
 */
export declare type IDataPointsVisible = boolean | "auto";

/**
 * @public
 */
export declare interface IDependencyWheelChartBucketProps {
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
export declare interface IDependencyWheelChartProps extends IBucketChartProps, IDependencyWheelChartBucketProps {
}

/**
 * @public
 */
export declare interface IDonutChartBucketProps {
    /**
     * Specify one or more measures to segment the donut chart.
     *
     * @remarks
     * If you specify a single measure, then you may further specify the viewBy attribute - there will be
     * donut slice per attribute value.
     *
     * If you specify multiple measures, then there will be a donut slice for each measure value. You may not
     * specify the viewBy in this case.
     */
    measures: AttributeMeasureOrPlaceholder | AttributesMeasuresOrPlaceholders;
    /**
     * Specify viewBy attribute that will be used to create the donut slices. There will be a slice
     * for each value of the attribute.
     */
    viewBy?: AttributeOrPlaceholder;
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
export declare interface IDonutChartProps extends IBucketChartProps, IDonutChartBucketProps {
}

/**
 * @public
 */
export declare interface IFunnelChartBucketProps {
    /**
     * Specify one or more measures to chart into a funnel.
     *
     * @remarks
     * If you specify single measure, then you can also specify the viewBy attribute. Values of that attribute
     * will be used for slicing and will be charted as a funnel.
     *
     * If you specify multiple measures, then those calculate measure values will be charted into a funnel.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify attribute that will be used to slice the single measure into multiple pieces that
     * will be charted into a funnel.
     */
    viewBy?: AttributeOrPlaceholder;
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
export declare interface IFunnelChartProps extends IBucketChartProps, IFunnelChartBucketProps {
}

/**
 * @public
 */
export declare interface IGridConfig {
    enabled?: boolean;
}

/**
 * @public
 */
export declare interface IHeadlineBucketProps {
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
export declare interface IHeadlineProps extends IBucketChartProps, IHeadlineBucketProps {
}

/**
 * This interface defines the contract for classes that provide headline-related functionality in the Headline.
 * Headlines consist of multiple visuals, each displaying different content, and each visual has a unique execution associated with it.
 *
 * @internal
 */
export declare interface IHeadlineProvider {
    /**
     * Creates a execution for the core headline based on the provided parameters.
     */
    createExecution(executionFactory: IExecutionFactory, params: ICreateExecutionParams): IPreparedExecution;
    /**
     * Retrieves the headline transformation component responsible for rendering visuals associated with the headline.
     *
     * @returns The component responsible for rendering visuals in the headline.
     */
    getHeadlineTransformationComponent: () => React.ComponentType<IHeadlineTransformationProps>;
}

/**
 * @internal
 */
export declare interface IHeadlineTransformationProps {
    dataView: IDataView;
    drillableItems?: ExplicitDrill[];
    config?: IChartConfig;
    onDrill?: IDrillEventCallback;
    onAfterRender?: () => void;
}

/**
 * @public
 */
export declare interface IHeatmapBucketProps {
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
export declare interface IHeatmapProps extends IBucketChartProps, IHeatmapBucketProps {
}

/**
 * Configuration options for labeling conditions.
 *
 * @public
 */
export declare interface ILabelConfig {
    /**
     * Specifies the label to be used for the comparison value.
     *
     * @remarks
     * The default value is based on the calculation type:
     * <table>
     *     <tr><th width="150">Calculation Type</th><th width="350">Default value</th></tr>
     *     <tr><td>change</td><td>Change</td></tr>
     *     <tr><td>ratio</td><td>of</td></tr>
     *     <tr><td>difference</td><td>Difference</td></tr>
     * </table>
     */
    unconditionalValue?: string;
}

/**
 * @public
 */
export declare interface ILegendConfig {
    /**
     * Indicates whether legend should be rendered or not.
     */
    enabled?: boolean;
    /**
     * Where, relative to the chart, should the legend appear.
     */
    position?: PositionType;
    /**
     * Turns on responsive behavior. Legend items will be rendered horizontally on
     * screens smaller than 767px.
     */
    responsive?: boolean | "autoPositionWithPopup";
}

/**
 * @public
 */
export declare interface ILegendData {
    legendItems: ILegendItem[];
}

/**
 * @public
 */
export declare interface ILegendItem {
    name: string;
    color: string;
    onClick: () => void;
}

/**
 * @public
 */
export declare interface ILineChartBucketProps {
    /**
     * Specify one or more measures whose values will be displayed on the line chart.
     *
     * @remarks
     * If you specify two or more measures, values of each measure will have their own line.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify single attribute whose values will be used to slice the lines along the X axis.
     */
    trendBy?: AttributeOrPlaceholder;
    /**
     * Specify single attribute whose values will be used to segment the measure values.
     *
     * @remarks
     * The line chart will display one line per measure values pertaining to the segmentBy attribute values.
     */
    segmentBy?: AttributeOrPlaceholder;
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
export declare interface ILineChartProps extends IBucketChartProps, ILineChartBucketProps {
}

/**
 * Chart orientation config
 *
 * @public
 */
export declare interface IOrientationConfig {
    position?: ChartOrientationType;
}

/**
 * @public
 */
export declare interface IPieChartBucketProps {
    /**
     * Specify one or more measures to segment the pie chart.
     *
     * @remarks
     * If you specify a single measure, then you may further specify the viewBy attribute - there will be a
     * pie slice per attribute value.
     *
     * If you specify multiple measures, then there will be a pie slice for each measure value. You may not
     * specify the viewBy in this case.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify viewBy attribute that will be used to create the pie slices. There will be a slice
     * for each value of the attribute.
     */
    viewBy?: AttributeOrPlaceholder;
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
export declare interface IPieChartProps extends IBucketChartProps, IPieChartBucketProps {
}

/**
 * @public
 */
export declare interface IPyramidChartBucketProps {
    /**
     * Specify one or more measures to chart into a pyramid.
     *
     * @remarks
     * If you specify single measure, then you can also specify the viewBy attribute. Values of that attribute
     * will be used for slicing and will be charted as a pyramid.
     *
     * If you specify multiple measures, then those calculate measure values will be charted into a pyramid.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify attribute that will be used to slice the single measure into multiple pieces that
     * will be charted into a pyramid.
     */
    viewBy?: AttributeOrPlaceholder;
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
export declare interface IPyramidChartProps extends IBucketChartProps, IPyramidChartBucketProps {
}

/**
 * @public
 */
export declare interface ISankeyChartBucketProps {
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
export declare interface ISankeyChartProps extends IBucketChartProps, ISankeyChartBucketProps {
}

/**
 * @internal
 */
export declare const isAreaChart: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isBarChart: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isBubbleChart: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isBulletChart: LodashIsEqual1x1;

/**
 * @public
 */
export declare interface IScatterPlotBucketProps {
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
export declare interface IScatterPlotProps extends IBucketChartProps, IScatterPlotBucketProps {
}

/**
 * @internal
 */
export declare const isColumnChart: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isComboChart: (type: string) => boolean;

/**
 * @internal
 */
export declare const isDependencyWheel: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isDonutChart: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isFunnel: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isHeatmap: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isLineChart: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isPieChart: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isPieOrDonutChart: (type: string) => boolean;

/**
 * @internal
 */
export declare const isPyramid: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isSankey: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isSankeyOrDependencyWheel: (type: string) => boolean;

/**
 * @internal
 */
export declare const isScatterPlot: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isTreemap: LodashIsEqual1x1;

/**
 * @internal
 */
export declare const isWaterfall: LodashIsEqual1x1;

/**
 * Tooltip customization
 *
 * @public
 */
export declare interface ITooltipConfig {
    /**
     * Indicates if tooltip is shown.
     *
     * @defaultValue defaults to true, meaning the tooltip is shown
     */
    enabled?: boolean;
}

/**
 * @public
 */
export declare interface ITotalConfig {
    /**
     * Indicates whether total column should be rendered or not.
     */
    enabled?: boolean;
    /**
     * Custom title for the total column (Total is default)
     */
    name?: string;
    /**
     * the list of localIdentifier of the measures which are the total measure
     */
    measures?: string[];
}

/**
 * @public
 */
export declare interface ITreemapBucketProps {
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
export declare interface ITreemapProps extends IBucketChartProps, ITreemapBucketProps {
}

/**
 * @public
 */
export declare interface IWaterfallChartBucketProps {
    /**
     * Specify one or more measures to segment the waterfall chart.
     *
     * @remarks
     * If you specify a single measure, then you may further specify the viewBy attribute
     *
     * If you specify multiple measures, then there will be a column for each measure value. You may not
     * specify the viewBy in this case.
     */
    measures: AttributesMeasuresOrPlaceholders;
    /**
     * Specify viewBy attribute that will be used to create the column There will be a column
     * for each value of the attribute.
     */
    viewBy?: AttributeOrPlaceholder;
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
export declare interface IWaterfallChartProps extends IBucketChartProps, IWaterfallChartBucketProps {
}

/**
 * @beta
 */
export declare interface IXirrBucketProps {
    /**
     * The measure to calculate the Internal Rate of Return for.
     *
     * @remarks
     * For the result to make sense, the measure should start with a negative value at some point in time (the investment) followed by other values (the returns).
     */
    measure: MeasureOrPlaceholder;
    /**
     * The date dimension to use for the computation. This allows you to set the granularity (day, month, etc.) for the IRR calculation.
     */
    attribute?: AttributeOrPlaceholder;
    /**
     * Specify filters to apply on the data to compute with.
     */
    filters?: NullableFiltersOrPlaceholders;
    /**
     * Resolution context for composed placeholders.
     */
    placeholdersResolutionContext?: any;
}

/**
 * @beta
 */
export declare interface IXirrProps extends IBucketChartProps, IXirrBucketProps {
}

/**
 * Line chart shows data as line-connected dots.
 *
 * @remarks
 * Line charts can display either multiple measures as individual lines
 * or a single measure split by one attribute into multiple lines with points intersecting attribute values.
 *
 * See {@link ILineChartProps} to learn how to configure the LineChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/line_chart_component.html | line chart documentation} for more information.
 *
 * @public
 */
export declare const LineChart: (props: ILineChartProps) => JSX.Element;

/**
 * @internal
 */
export declare const MIDDLE = "middle";

/**
 * Callback to be called once the legend is rendered.
 *
 * @public
 */
export declare type OnLegendReady = (data: ILegendData) => void;

/**
 * Pie chart shows data as proportional segments of a disc.
 *
 * @remarks
 * Pie charts can be segmented by either multiple measures or an attribute.
 *
 * See {@link IPieChartProps} to learn how to configure the PieChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/pie_chart_component.html | pie chart documentation} for more information.
 *
 * @public
 */
export declare const PieChart: (props: IPieChartProps) => JSX.Element;

/**
 * Available legend positions.
 *
 * @public
 */
export declare type PositionType = "left" | "right" | "top" | "bottom" | "auto";

/**
 * A pyramid chart displays values on top of each other, useful for example for showing hierarchies or workflows.
 *
 * @remarks
 * You can define pyramid chart using either multiple measures or single measure and a viewBy attribute whose
 * values will be used to slice the single measure.
 *
 * See {@link IPyramidChartProps} to learn how to configure the PyramidChart.
 *
 * @public
 */
export declare const PyramidChart: (props: IPyramidChartProps) => JSX.Element;

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

/**
 * @internal
 */
export declare const TOP = "top";

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

/**
 * @internal
 */
export declare function updateConfigWithSettings(config: IChartConfig, settings: ISettings): IChartConfig;

/**
 * Maximum number of attributes for view-by slicing.
 *
 * @public
 */
export declare const ViewByAttributesLimit = 2;

/**
 * Waterfall chart shows data as proportional segments of a disc.
 *
 * @remarks
 * Waterfall charts can be segmented by either multiple measures or an attribute.
 *
 * See {@link IWaterfallChartProps} to learn how to configure the WaterfallChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/waterfall_chart_component.html | Waterfall chart documentation} for more information.
 *
 * @public
 */
export declare const WaterfallChart: (props: IWaterfallChartProps) => JSX.Element;

/**
 * @internal
 */
export declare const withJsxExport: <T extends object>(Component: React_2.ComponentType<T>) => React_2.ComponentType<T>;

/**
 * Xirr computes the {@link https://en.wikipedia.org/wiki/Internal_rate_of_return | Internal Rate of Return} from the given measure and date dimension.
 *
 *
 * @remarks
 * The "X" in the name means that the returns do not have to happen periodically (as in the standard IRR), but they
 * can {@link https://en.wikipedia.org/wiki/Internal_rate_of_return#Exact_dates_of_cash_flows | happen at any day}.
 * You must specify both the measure and date dimension.
 *
 * For date parsing, we currently use the browser's Date constructor. There might be some differences
 * between how browsers implement this, so for best results use the Day granularity if possible.
 *
 * See {@link IXirrProps} to learn how to configure the Xirr.
 *
 * @beta
 */
export declare const Xirr: (props: IXirrProps) => JSX.Element;

export { }
