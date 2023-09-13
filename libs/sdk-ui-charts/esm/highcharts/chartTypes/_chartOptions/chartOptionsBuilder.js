import { invariant } from "ts-invariant";
import { BucketNames, DataViewFacade, getMappingHeaderFormattedName, VisualizationTypes, } from "@gooddata/sdk-ui";
import { ViewByAttributesLimit } from "../../../interfaces/index.js";
import { PARENT_ATTRIBUTE_INDEX, PRIMARY_ATTRIBUTE_INDEX, STACK_BY_DIMENSION_INDEX, VIEW_BY_DIMENSION_INDEX, } from "../../constants/dimensions.js";
import { findAttributeInDimension, findMeasureGroupInDimensions } from "../_util/executionResultHelper.js";
import { valueWithEmptyHandling } from "@gooddata/sdk-ui-vis-commons";
import { isAreaChart, isBubbleChart, isChartSupported, isComboChart, isHeatmap, isPyramid, isOneOfTypes, isScatterPlot, isTreemap, stringifyChartTypes, unwrap, isSankeyOrDependencyWheel, isWaterfall, } from "../_util/common.js";
import { setMeasuresToSecondaryAxis } from "./dualAxis.js";
import { canComboChartBeStackedInPercent, getComboChartSeries, getComboChartStackingConfig, } from "../comboChart/comboChartOptions.js";
import { getCategoriesForTwoAttributes } from "./extendedStackingChartOptions.js";
import { ColorFactory } from "./colorFactory.js";
import { getChartProperties } from "../_chartCreators/helpers.js";
import { multiMeasuresAlternatingTypes, showingNameInLegendWhenViewByPresent, unsupportedStackingTypes, } from "./chartCapabilities.js";
import cloneDeep from "lodash/cloneDeep.js";
import isEmpty from "lodash/isEmpty.js";
import isUndefined from "lodash/isUndefined.js";
import without from "lodash/without.js";
import { getSeries } from "./chartSeries.js";
import { buildTooltipFactory, generateTooltipHeatmapFn, generateTooltipSankeyChartFn, generateTooltipXYFn, getTooltipFactory, getTooltipWaterfallChart, } from "./chartTooltips.js";
import { getDrillableSeries } from "./chartDrilling.js";
import { assignYAxes, getXAxes, getYAxes } from "./chartAxes.js";
import { buildWaterfallChartSeries, getColorAssignment, getWaterfallChartCategories, } from "../waterfallChart/waterfallChartOptions.js";
const isAreaChartStackingEnabled = (options) => {
    const { type, stacking, stackMeasures } = options;
    if (!isAreaChart(type)) {
        return false;
    }
    if (isUndefined(stackMeasures)) {
        return stacking || isUndefined(stacking);
    }
    return stackMeasures;
};
function getCategories(type, measureGroup, viewByAttribute, stackByAttribute, emptyHeaderTitle) {
    // We need an explicit any[] return type otherwise the code down the line no longer type checks, no time to fix all of it now
    if (isHeatmap(type)) {
        return [
            viewByAttribute
                ? viewByAttribute.items.map((item) => valueWithEmptyHandling(getMappingHeaderFormattedName(item), emptyHeaderTitle))
                : [""],
            stackByAttribute
                ? stackByAttribute.items.map((item) => valueWithEmptyHandling(getMappingHeaderFormattedName(item), emptyHeaderTitle))
                : [""],
        ];
    }
    if (isScatterPlot(type)) {
        return stackByAttribute
            ? stackByAttribute.items.map((item) => valueWithEmptyHandling(getMappingHeaderFormattedName(item), emptyHeaderTitle))
            : [""];
    }
    // Categories make up bar/slice labels in charts. These usually match view by attribute values.
    // Measure only pie or treemap charts get categories from measure names
    if (viewByAttribute) {
        return viewByAttribute.items.map((item) => valueWithEmptyHandling(getMappingHeaderFormattedName(item), emptyHeaderTitle));
    }
    if (isOneOfTypes(type, multiMeasuresAlternatingTypes)) {
        // Pie or Treemap chart with measures only (no viewByAttribute) needs to list
        return measureGroup.items.map((wrappedMeasure) => valueWithEmptyHandling(unwrap(wrappedMeasure).name, emptyHeaderTitle));
        // Pie chart categories are later sorted by seriesItem pointValue
    }
    return [];
}
function getStackingConfig(stackByAttribute, options) {
    const { type, stackMeasures, stackMeasuresToPercent } = options;
    const stackingValue = stackMeasuresToPercent ? "percent" : "normal";
    const supportsStacking = !isOneOfTypes(type, unsupportedStackingTypes);
    /**
     * we should enable stacking for one of the following cases :
     * 1) If stackby attribute have been set and chart supports stacking
     * 2) If chart is an area chart and stacking is enabled (stackBy attribute doesn't matter)
     * 3) If chart is column/bar chart and 'Stack Measures' is enabled
     */
    const isStackByChart = stackByAttribute && supportsStacking;
    const isAreaChartWithEnabledStacking = isAreaChartStackingEnabled(options);
    if (isStackByChart || isAreaChartWithEnabledStacking || stackMeasures || stackMeasuresToPercent) {
        return stackingValue;
    }
    return null; // no stacking
}
export const HEAT_MAP_CATEGORIES_COUNT = 7;
export const HIGHCHARTS_PRECISION = 15;
export const DEFAULT_HEATMAP_COLOR_INDEX = 1;
export function getHeatmapDataClasses(series = [], colorStrategy) {
    var _a, _b;
    const values = without(((_b = (_a = series[0]) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : []).map((item) => item.value), null, undefined, NaN);
    if (isEmpty(values)) {
        return [];
    }
    const min = Math.min(...values);
    const max = Math.max(...values);
    const safeMin = parseFloat(Number(min).toPrecision(HIGHCHARTS_PRECISION));
    const safeMax = parseFloat(Number(max).toPrecision(HIGHCHARTS_PRECISION));
    const dataClasses = [];
    if (min === max) {
        dataClasses.push({
            from: min,
            to: max,
            color: colorStrategy.getColorByIndex(DEFAULT_HEATMAP_COLOR_INDEX),
        });
    }
    else {
        const step = (safeMax - safeMin) / HEAT_MAP_CATEGORIES_COUNT;
        let currentSum = safeMin;
        for (let i = 0; i < HEAT_MAP_CATEGORIES_COUNT; i += 1) {
            dataClasses.push({
                from: currentSum,
                to: i === HEAT_MAP_CATEGORIES_COUNT - 1 ? safeMax : currentSum + step,
                color: colorStrategy.getColorByIndex(i),
            });
            currentSum += step;
        }
    }
    return dataClasses;
}
export function getDefaultTreemapAttributes(dv) {
    const dimensions = dv.meta().dimensions();
    const attributeHeaderItems = dv.meta().attributeHeaders();
    let viewByAttribute = findAttributeInDimension(dimensions[STACK_BY_DIMENSION_INDEX], attributeHeaderItems[STACK_BY_DIMENSION_INDEX]);
    const stackByAttribute = findAttributeInDimension(dimensions[STACK_BY_DIMENSION_INDEX], attributeHeaderItems[STACK_BY_DIMENSION_INDEX], 1);
    if (!viewByAttribute) {
        viewByAttribute = findAttributeInDimension(dimensions[VIEW_BY_DIMENSION_INDEX], attributeHeaderItems[VIEW_BY_DIMENSION_INDEX]);
    }
    return {
        viewByAttribute,
        stackByAttribute,
    };
}
export function getTreemapAttributes(dv) {
    if (!dv.def().hasBuckets()) {
        // without mdObject cant distinguish 1M 1Vb 0Sb and 1M 0Vb 1Sb
        return getDefaultTreemapAttributes(dv);
    }
    const dimensions = dv.meta().dimensions();
    const attributeHeaderItems = dv.meta().attributeHeaders();
    if (dv.def().isBucketEmpty(BucketNames.SEGMENT)) {
        if (dv.def().isBucketEmpty(BucketNames.VIEW)) {
            return {
                viewByAttribute: null,
                stackByAttribute: null,
            };
        }
        return {
            viewByAttribute: findAttributeInDimension(dimensions[VIEW_BY_DIMENSION_INDEX], attributeHeaderItems[VIEW_BY_DIMENSION_INDEX]),
            stackByAttribute: null,
        };
    }
    if (dv.def().isBucketEmpty(BucketNames.VIEW)) {
        return {
            viewByAttribute: null,
            stackByAttribute: findAttributeInDimension(dimensions[VIEW_BY_DIMENSION_INDEX], attributeHeaderItems[VIEW_BY_DIMENSION_INDEX]),
        };
    }
    return {
        viewByAttribute: findAttributeInDimension(dimensions[STACK_BY_DIMENSION_INDEX], attributeHeaderItems[STACK_BY_DIMENSION_INDEX]),
        stackByAttribute: findAttributeInDimension(dimensions[STACK_BY_DIMENSION_INDEX], attributeHeaderItems[STACK_BY_DIMENSION_INDEX], 1),
    };
}
function defaultChartedAttributeDiscovery(dv) {
    const attributeHeaderItems = dv.meta().attributeHeaders();
    const dimensions = dv.meta().dimensions();
    const isViewByTwoAttributes = attributeHeaderItems[VIEW_BY_DIMENSION_INDEX] &&
        attributeHeaderItems[VIEW_BY_DIMENSION_INDEX].length === ViewByAttributesLimit;
    let viewByParentAttribute;
    const viewByAttribute = findAttributeInDimension(dimensions[VIEW_BY_DIMENSION_INDEX], attributeHeaderItems[VIEW_BY_DIMENSION_INDEX], isViewByTwoAttributes ? PRIMARY_ATTRIBUTE_INDEX : undefined);
    const stackByAttribute = findAttributeInDimension(dimensions[STACK_BY_DIMENSION_INDEX], attributeHeaderItems[STACK_BY_DIMENSION_INDEX]);
    if (isViewByTwoAttributes) {
        viewByParentAttribute = findAttributeInDimension(dimensions[VIEW_BY_DIMENSION_INDEX], attributeHeaderItems[VIEW_BY_DIMENSION_INDEX], PARENT_ATTRIBUTE_INDEX);
    }
    return {
        viewByAttribute,
        viewByParentAttribute,
        stackByAttribute,
        isViewByTwoAttributes,
    };
}
function chartedAttributeDiscovery(dv, chartType) {
    if (isTreemap(chartType)) {
        return getTreemapAttributes(dv);
    }
    return defaultChartedAttributeDiscovery(dv);
}
function getLegendLabel(type, viewByAttribute, stackByAttribute) {
    var _a, _b, _c;
    let legendLabel;
    if (isTreemap(type)) {
        legendLabel = (_a = viewByAttribute === null || viewByAttribute === void 0 ? void 0 : viewByAttribute.formOf) === null || _a === void 0 ? void 0 : _a.name;
    }
    else if (isOneOfTypes(type, showingNameInLegendWhenViewByPresent) && viewByAttribute) {
        legendLabel = (_b = viewByAttribute === null || viewByAttribute === void 0 ? void 0 : viewByAttribute.formOf) === null || _b === void 0 ? void 0 : _b.name;
    }
    else {
        legendLabel = (_c = stackByAttribute === null || stackByAttribute === void 0 ? void 0 : stackByAttribute.formOf) === null || _c === void 0 ? void 0 : _c.name;
    }
    return legendLabel;
}
function isAutoSortableChart(type, viewByAttribute) {
    const isPyramidWithViewByAttribute = isPyramid(type) && Boolean(viewByAttribute);
    return (isOneOfTypes(type, [VisualizationTypes.DONUT, VisualizationTypes.PIE, VisualizationTypes.FUNNEL]) ||
        isPyramidWithViewByAttribute);
}
export function getChartOptions(dataView, chartConfig, drillableItems, emptyHeaderTitle, theme, totalColumnTitle) {
    var _a, _b, _c;
    const dv = DataViewFacade.for(dataView);
    const dimensions = dv.meta().dimensions();
    const config = setMeasuresToSecondaryAxis(chartConfig, dv);
    invariant(config && isChartSupported(config.type), `config.type must be defined and match one of supported chart types: ${stringifyChartTypes()}, got: ${config.type}`);
    const { type, chart } = config;
    const { viewByAttribute, viewByParentAttribute, stackByAttribute, isViewByTwoAttributes = false, } = chartedAttributeDiscovery(dv, type);
    const colorStrategy = ColorFactory.getColorStrategy(config.colorPalette, config.colorMapping, viewByAttribute, viewByParentAttribute, stackByAttribute, dv, type, theme);
    const gridEnabled = (_b = (_a = config === null || config === void 0 ? void 0 : config.grid) === null || _a === void 0 ? void 0 : _a.enabled) !== null && _b !== void 0 ? _b : true;
    const stacking = getStackingConfig(stackByAttribute, config);
    const measureGroup = findMeasureGroupInDimensions(dimensions);
    const xAxes = getXAxes(dv, config, measureGroup, viewByAttribute, viewByParentAttribute);
    const yAxes = getYAxes(dv, config, measureGroup, stackByAttribute);
    const seriesWithoutDrillability = getSeries(dv, measureGroup, viewByAttribute, viewByParentAttribute, stackByAttribute, type, colorStrategy, emptyHeaderTitle, theme);
    const drillableSeries = getDrillableSeries(dv, seriesWithoutDrillability, drillableItems, [viewByAttribute, viewByParentAttribute], stackByAttribute, type);
    const series = assignYAxes(drillableSeries, yAxes);
    let categories = viewByParentAttribute
        ? getCategoriesForTwoAttributes(viewByAttribute, viewByParentAttribute, emptyHeaderTitle)
        : getCategories(type, measureGroup, viewByAttribute, stackByAttribute, emptyHeaderTitle);
    // When custom sorting is enabled and is chart which does the auto-sorting,
    // need to skip this, so the sort specified by the user does not get overriden.
    if (isAutoSortableChart(type, viewByAttribute) && !config.enableChartSorting) {
        // dataPoints are sorted by default by value in descending order
        const dataPoints = series[0].data;
        const indexSortOrder = [];
        const sortedDataPoints = dataPoints
            .sort((pointDataA, pointDataB) => {
            if (pointDataA.y === pointDataB.y) {
                return 0;
            }
            return pointDataB.y - pointDataA.y;
        })
            .map((dataPoint, dataPointIndex) => {
            // Legend index equals original dataPoint index
            indexSortOrder.push(dataPoint.legendIndex);
            return Object.assign(Object.assign({}, dataPoint), { color: dataPoints[dataPointIndex].color, legendIndex: dataPointIndex });
        });
        // categories need to be sorted in exactly the same order as dataPoints
        categories = categories.map((_category, dataPointIndex) => categories[indexSortOrder[dataPointIndex]]);
        series[0].data = sortedDataPoints;
    }
    const colorAssignments = colorStrategy.getColorAssignment();
    const { colorPalette } = config;
    const { xAxisProps, yAxisProps, secondary_xAxisProps, secondary_yAxisProps } = getChartProperties(config, type);
    if (isComboChart(type)) {
        const comboSeries = getComboChartSeries(config, measureGroup, series, dv);
        const canStackInPercent = canComboChartBeStackedInPercent(comboSeries);
        return {
            type,
            xAxes,
            yAxes,
            stacking: getComboChartStackingConfig(config, comboSeries, stacking),
            legendLayout: config.legendLayout || "horizontal",
            actions: {
                tooltip: buildTooltipFactory(viewByAttribute, type, Object.assign(Object.assign({}, config), { stackMeasuresToPercent: config.stackMeasuresToPercent && canStackInPercent })),
            },
            grid: {
                enabled: gridEnabled,
            },
            data: {
                series: comboSeries,
                categories,
            },
            xAxisProps,
            yAxisProps,
            secondary_yAxisProps,
            colorAssignments,
            colorPalette,
            forceDisableDrillOnAxes: chartConfig.forceDisableDrillOnAxes,
        };
    }
    if (isScatterPlot(type)) {
        const { xAxisProps, yAxisProps } = getChartProperties(config, type);
        let measures = [
            measureGroup.items[0] ? measureGroup.items[0] : null,
            measureGroup.items[1] ? measureGroup.items[1] : null,
        ];
        if (dv.def().isBucketEmpty(BucketNames.MEASURES)) {
            measures = [null, measureGroup.items[0] ? measureGroup.items[0] : null];
        }
        return {
            type,
            stacking,
            legendLayout: "horizontal",
            yAxes,
            xAxes,
            data: {
                series,
                categories,
            },
            actions: {
                tooltip: generateTooltipXYFn(measures, stackByAttribute, config),
            },
            grid: {
                enabled: gridEnabled,
            },
            xAxisProps,
            yAxisProps,
            colorAssignments,
            colorPalette,
            forceDisableDrillOnAxes: chartConfig.forceDisableDrillOnAxes,
        };
    }
    if (isHeatmap(type)) {
        const { xAxisProps, yAxisProps } = getChartProperties(config, type);
        return {
            type,
            stacking: null,
            legendLayout: "horizontal",
            legendLabel: (_c = unwrap(measureGroup === null || measureGroup === void 0 ? void 0 : measureGroup.items[0])) === null || _c === void 0 ? void 0 : _c.name,
            title: {
                x: viewByAttribute ? viewByAttribute.name : "",
                y: stackByAttribute ? stackByAttribute.name : "",
                format: unwrap(measureGroup.items[0]).format,
            },
            xAxes,
            yAxes,
            data: {
                series,
                categories,
            },
            actions: {
                tooltip: generateTooltipHeatmapFn(viewByAttribute, stackByAttribute, emptyHeaderTitle, config),
            },
            grid: {
                enabled: false,
            },
            colorAxis: {
                dataClasses: getHeatmapDataClasses(series, colorStrategy),
            },
            xAxisProps,
            yAxisProps,
            colorAssignments,
            colorPalette,
            forceDisableDrillOnAxes: chartConfig.forceDisableDrillOnAxes,
        };
    }
    if (isBubbleChart(type)) {
        const measures = [];
        const measureGroupCopy = cloneDeep(measureGroup);
        const { xAxisProps, yAxisProps } = getChartProperties(config, type);
        if (!dv.def().isBucketEmpty(BucketNames.MEASURES)) {
            measures.push(measureGroup.items[0] ? measureGroupCopy.items.shift() : null);
        }
        else {
            measures.push(null);
        }
        if (!dv.def().isBucketEmpty(BucketNames.SECONDARY_MEASURES)) {
            measures.push(measureGroup.items[0] ? measureGroupCopy.items.shift() : null);
        }
        else {
            measures.push(null);
        }
        if (!dv.def().isBucketEmpty(BucketNames.TERTIARY_MEASURES)) {
            measures.push(measureGroup.items[0] ? measureGroupCopy.items.shift() : null);
        }
        else {
            measures.push(null);
        }
        return {
            type,
            stacking,
            hasViewByAttribute: Boolean(stackByAttribute),
            legendLayout: "horizontal",
            legendLabel: getLegendLabel(type, viewByAttribute, stackByAttribute),
            yAxes,
            xAxes,
            data: {
                series,
                categories: [[""]],
            },
            actions: {
                tooltip: generateTooltipXYFn(measures, stackByAttribute, config),
            },
            grid: {
                enabled: gridEnabled,
            },
            xAxisProps,
            yAxisProps,
            colorAssignments,
            colorPalette,
            forceDisableDrillOnAxes: chartConfig.forceDisableDrillOnAxes,
        };
    }
    if (isSankeyOrDependencyWheel(type)) {
        return {
            type,
            data: {
                series,
                categories: [[""]],
            },
            actions: {
                tooltip: generateTooltipSankeyChartFn(viewByAttribute, viewByParentAttribute, measureGroup.items[0], config),
            },
            colorPalette,
            colorAssignments,
        };
    }
    if (isWaterfall(type)) {
        const waterfallChartSeries = buildWaterfallChartSeries(measureGroup, series, chartConfig, colorAssignments[0], colorPalette, totalColumnTitle);
        const waterfallCategories = getWaterfallChartCategories(categories, chartConfig, measureGroup, totalColumnTitle);
        return {
            type,
            stacking,
            hasStackByAttribute: Boolean(stackByAttribute),
            hasViewByAttribute: Boolean(viewByAttribute),
            legendLayout: config.legendLayout || "horizontal",
            legendLabel: getLegendLabel(type, viewByAttribute, stackByAttribute),
            xAxes,
            yAxes,
            data: {
                series: waterfallChartSeries,
                categories: waterfallCategories,
            },
            actions: {
                tooltip: getTooltipWaterfallChart(viewByAttribute, chartConfig),
            },
            grid: {
                enabled: gridEnabled,
            },
            xAxisProps,
            yAxisProps,
            colorAssignments: getColorAssignment(colorAssignments, chartConfig, waterfallChartSeries),
            colorPalette,
            isViewByTwoAttributes,
            forceDisableDrillOnAxes: chartConfig.forceDisableDrillOnAxes,
            verticalAlign: chart === null || chart === void 0 ? void 0 : chart.verticalAlign,
        };
    }
    const isDualAxis = yAxes.length === 2;
    let measure;
    /**
     * Because of the problem described in TNT-16, we decided to change the visual of the tooltip.
     * If the visualization contains stack by attribute, it is possible to have just one measure.
     * Therefore the first measure from measureGroup is used.
     */
    if (!dv.def().isBucketEmpty(BucketNames.MEASURES)) {
        measure = Object.assign({}, measureGroup.items[0]);
    }
    const tooltipFactory = getTooltipFactory(isViewByTwoAttributes, viewByAttribute, viewByParentAttribute, stackByAttribute, measure, emptyHeaderTitle, config, isDualAxis);
    return {
        type,
        stacking,
        hasStackByAttribute: Boolean(stackByAttribute),
        hasViewByAttribute: Boolean(viewByAttribute),
        legendLayout: config.legendLayout || "horizontal",
        legendLabel: getLegendLabel(type, viewByAttribute, stackByAttribute),
        xAxes,
        yAxes,
        data: {
            series,
            categories,
        },
        actions: {
            tooltip: tooltipFactory,
        },
        grid: {
            enabled: gridEnabled,
        },
        xAxisProps,
        yAxisProps,
        secondary_xAxisProps,
        secondary_yAxisProps,
        colorAssignments,
        colorPalette,
        isViewByTwoAttributes,
        forceDisableDrillOnAxes: chartConfig.forceDisableDrillOnAxes,
        verticalAlign: chart === null || chart === void 0 ? void 0 : chart.verticalAlign,
    };
}
//# sourceMappingURL=chartOptionsBuilder.js.map