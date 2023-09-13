// (C) 2019-2022 GoodData Corporation
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import React from "react";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import { newAttributeSort } from "@gooddata/sdk-model";
import { AXIS, AXIS_NAME } from "../../../constants/axis";
import { ATTRIBUTE, BUCKETS, DATE } from "../../../constants/bucket";
import { LINE_CHART_SUPPORTED_PROPERTIES } from "../../../constants/supportedProperties";
import { DEFAULT_LINE_UICONFIG, LINE_UICONFIG_WITH_MULTIPLE_DATES } from "../../../constants/uiConfig";
import { configureOverTimeComparison, configurePercent } from "../../../utils/bucketConfig";
import { filterOutDerivedMeasures, getAllAttributeItemsWithPreference, getAttributeItemsWithoutStacks, getDateItems, getFilteredMeasuresForStackedCharts, getFistDateItemWithMultipleDates, getMeasureItems, getStackItems, isDateBucketItem, sanitizeFilters, getBucketItems, } from "../../../utils/bucketHelper";
import { getReferencePointWithSupportedProperties, setSecondaryMeasures, } from "../../../utils/propertiesHelper";
import { removeSort, getCustomSortDisabledExplanation } from "../../../utils/sort";
import { setLineChartUiConfig } from "../../../utils/uiConfigHelpers/lineChartUiConfigHelper";
import LineChartBasedConfigurationPanel from "../../configurationPanels/LineChartBasedConfigurationPanel";
import { PluggableBaseChart } from "../baseChart/PluggableBaseChart";
import { addIntersectionFiltersToInsight, modifyBucketsAttributesForDrillDown, reverseAndTrimIntersection, } from "../drillDownUtil";
import { newAvailableSortsGroup } from "../../../interfaces/SortConfig";
/**
 * PluggableLineChart
 *
 * ## Buckets
 *
 * | Name      | Id       | Accepts             |
 * |-----------|----------|---------------------|
 * | Measures  | measures | measures only       |
 * | TrendBy   | trend    | attributes or dates |
 * | SegmentBy | segment  | attributes or dates |
 *
 * ### Bucket axioms
 *
 * - |Measures| ≥ 1
 * - |TrendBy| ≤ 1
 * - |SegmentBy| ≤ 1
 * - |SegmentBy| = 1 ⇒ |Measures| = 1
 * - |SegmentBy| = 0 ⇒ |Measures| ≤ 20
 * - |Measures| ≥ 2 ⇒ |SegmentBy| = 0
 *
 * ## Dimensions
 *
 * The PluggableLineChart always creates two dimensional execution.
 *
 * - |SegmentBy| = 1 ⇒ [[...SegmentBy], [...TrendBy, MeasureGroupIdentifier]]
 * - |SegmentBy| = 0 ⇒ [[MeasureGroupIdentifier], [...TrendBy]]
 *
 * ## Sorts
 *
 * The PluggableLineChart does not use any sorts.
 */
export class PluggableLineChart extends PluggableBaseChart {
    constructor(props) {
        super(props);
        // set default to DUAL to get the full supported props list
        // and will be updated in getExtendedReferencePoint
        this.axis = AXIS.DUAL;
        this.type = VisualizationTypes.LINE;
        this.supportedPropertiesList = this.getSupportedPropertiesList();
        this.initializeProperties(props.visualizationProperties);
    }
    getSupportedPropertiesList() {
        return LINE_CHART_SUPPORTED_PROPERTIES[this.axis];
    }
    getUiConfig() {
        const config = this.isMultipleDatesEnabled()
            ? LINE_UICONFIG_WITH_MULTIPLE_DATES
            : DEFAULT_LINE_UICONFIG;
        return cloneDeep(config);
    }
    getExtendedReferencePoint(referencePoint) {
        var _a, _b;
        const clonedReferencePoint = cloneDeep(referencePoint);
        let newReferencePoint = Object.assign(Object.assign({}, clonedReferencePoint), { uiConfig: this.getUiConfig() });
        this.configureBuckets(newReferencePoint);
        newReferencePoint = setSecondaryMeasures(newReferencePoint, AXIS_NAME.SECONDARY_Y);
        this.axis = (_b = (_a = newReferencePoint === null || newReferencePoint === void 0 ? void 0 : newReferencePoint.uiConfig) === null || _a === void 0 ? void 0 : _a.axis) !== null && _b !== void 0 ? _b : AXIS.PRIMARY;
        this.supportedPropertiesList = this.getSupportedPropertiesList();
        newReferencePoint = setLineChartUiConfig(newReferencePoint, this.intl, this.type);
        newReferencePoint = configurePercent(newReferencePoint, false);
        newReferencePoint = configureOverTimeComparison(newReferencePoint, !!this.featureFlags["enableWeekFilters"]);
        newReferencePoint = getReferencePointWithSupportedProperties(newReferencePoint, this.supportedPropertiesList);
        if (!this.featureFlags.enableChartsSorting) {
            newReferencePoint = removeSort(newReferencePoint);
        }
        return Promise.resolve(sanitizeFilters(newReferencePoint));
    }
    getInsightWithDrillDownApplied(source, drillDownContext, backendSupportsElementUris) {
        const withFilters = this.addFilters(source, drillDownContext.drillDefinition, drillDownContext.event, backendSupportsElementUris);
        return modifyBucketsAttributesForDrillDown(withFilters, drillDownContext.drillDefinition);
    }
    getSortConfig(referencePoint) {
        const { defaultSort, availableSorts } = this.getDefaultAndAvailableSort(referencePoint);
        const { disabled, disabledExplanation } = this.isSortDisabled(referencePoint, availableSorts);
        const { properties, availableSorts: previousAvailableSorts } = referencePoint;
        return Promise.resolve(Object.assign({ supported: true, disabled, appliedSort: super.reuseCurrentSort(previousAvailableSorts, properties, availableSorts, defaultSort), defaultSort,
            availableSorts }, (disabledExplanation && { disabledExplanation })));
    }
    configureBuckets(newReferencePoint) {
        var _a;
        if (this.isMultipleDatesEnabled()) {
            this.configureBucketsWithMultipleDates(newReferencePoint);
            return;
        }
        const buckets = (_a = newReferencePoint === null || newReferencePoint === void 0 ? void 0 : newReferencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        const measures = getMeasureItems(buckets);
        const masterMeasures = filterOutDerivedMeasures(measures);
        let attributes = [];
        let stacks = getStackItems(buckets);
        const dateItems = getDateItems(buckets);
        const allAttributes = getAllAttributeItemsWithPreference(buckets, [
            BucketNames.LOCATION,
            BucketNames.TREND,
            BucketNames.VIEW,
            BucketNames.SEGMENT,
            BucketNames.STACK,
        ]);
        if (dateItems.length) {
            attributes = dateItems.slice(0, 1);
            stacks =
                masterMeasures.length <= 1 && allAttributes.length > 1
                    ? allAttributes
                        .filter((attribute) => !isDateBucketItem(attribute))
                        .slice(0, 1)
                    : stacks;
        }
        else {
            if (masterMeasures.length <= 1 &&
                allAttributes.length > 1 &&
                !isDateBucketItem(allAttributes === null || allAttributes === void 0 ? void 0 : allAttributes[1])) {
                stacks = allAttributes.slice(1, 2);
            }
            attributes = getAttributeItemsWithoutStacks(buckets).slice(0, 1);
        }
        set(newReferencePoint, BUCKETS, [
            {
                localIdentifier: BucketNames.MEASURES,
                items: getFilteredMeasuresForStackedCharts(buckets),
            },
            {
                localIdentifier: BucketNames.TREND,
                items: attributes,
            },
            {
                localIdentifier: BucketNames.SEGMENT,
                items: stacks,
            },
        ]);
    }
    renderConfigurationPanel(insight) {
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            this.renderFun(React.createElement(LineChartBasedConfigurationPanel, { locale: this.locale, references: this.references, properties: this.visualizationProperties, propertiesMeta: this.propertiesMeta, insight: insight, colors: this.colors, pushData: this.handlePushData, type: this.type, isError: this.getIsError(), isLoading: this.isLoading, featureFlags: this.featureFlags, axis: this.axis }), configPanelElement);
        }
    }
    configureBucketsWithMultipleDates(newReferencePoint) {
        var _a;
        const buckets = (_a = newReferencePoint === null || newReferencePoint === void 0 ? void 0 : newReferencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        const measures = getMeasureItems(buckets);
        const masterMeasures = filterOutDerivedMeasures(measures);
        let attributes = [];
        let stacks = getStackItems(buckets, [ATTRIBUTE, DATE]);
        const allAttributes = getAllAttributeItemsWithPreference(buckets, [
            BucketNames.LOCATION,
            BucketNames.TREND,
            BucketNames.VIEW,
            BucketNames.ATTRIBUTES,
            BucketNames.SEGMENT,
            BucketNames.STACK,
        ]);
        const firstDateItemInViews = getFistDateItemWithMultipleDates(buckets);
        if (firstDateItemInViews) {
            attributes = [firstDateItemInViews];
            const nextAttribute = allAttributes.find((attr) => attr !== firstDateItemInViews);
            if (masterMeasures.length <= 1 && nextAttribute && !stacks.length) {
                stacks = [nextAttribute];
            }
        }
        else {
            if (masterMeasures.length <= 1 && allAttributes.length > 1 && !stacks.length) {
                stacks = allAttributes.slice(1, 2);
            }
            attributes = getAttributeItemsWithoutStacks(buckets, [ATTRIBUTE, DATE]).slice(0, 1);
        }
        set(newReferencePoint, BUCKETS, [
            {
                localIdentifier: BucketNames.MEASURES,
                items: getFilteredMeasuresForStackedCharts(buckets),
            },
            {
                localIdentifier: BucketNames.TREND,
                items: attributes,
            },
            {
                localIdentifier: BucketNames.SEGMENT,
                items: stacks,
            },
        ]);
    }
    addFilters(source, drillConfig, event, backendSupportsElementUris) {
        const cutIntersection = reverseAndTrimIntersection(drillConfig, event.drillContext.intersection);
        return addIntersectionFiltersToInsight(source, cutIntersection, backendSupportsElementUris);
    }
    getDefaultAndAvailableSort(referencePoint) {
        const { buckets } = referencePoint;
        const measures = getBucketItems(buckets, BucketNames.MEASURES);
        const trendBy = getBucketItems(buckets, BucketNames.TREND);
        const segmentBy = getBucketItems(buckets, BucketNames.SEGMENT);
        const defaultSort = trendBy.length > 0 ? [newAttributeSort(trendBy[0].localIdentifier, "asc")] : [];
        if (measures.length > 0 && trendBy.length === 1) {
            if (isEmpty(segmentBy)) {
                return {
                    defaultSort,
                    availableSorts: [
                        newAvailableSortsGroup(trendBy[0].localIdentifier, measures.map((m) => m.localIdentifier), true, measures.length > 1),
                    ],
                };
            }
            return {
                defaultSort,
                availableSorts: [newAvailableSortsGroup(trendBy[0].localIdentifier)],
            };
        }
        return {
            defaultSort: [],
            availableSorts: [],
        };
    }
    isSortDisabled(referencePoint, availableSorts) {
        const { buckets } = referencePoint;
        const measures = getBucketItems(buckets, BucketNames.MEASURES);
        const viewBy = getBucketItems(buckets, BucketNames.TREND);
        const disabledExplanation = getCustomSortDisabledExplanation(measures, viewBy, this.intl);
        return {
            disabled: viewBy.length < 1 || measures.length < 1 || availableSorts.length === 0,
            disabledExplanation,
        };
    }
}
//# sourceMappingURL=PluggableLineChart.js.map