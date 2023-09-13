// (C) 2019-2022 GoodData Corporation
import { bucketsItems, insightBuckets, newAttributeSort, } from "@gooddata/sdk-model";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import React from "react";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import isEmpty from "lodash/isEmpty";
import { ATTRIBUTE, BUCKETS, DATE } from "../../../constants/bucket";
import { AREA_CHART_SUPPORTED_PROPERTIES, OPTIONAL_STACKING_PROPERTIES, } from "../../../constants/supportedProperties";
import { AREA_UICONFIG_WITH_MULTIPLE_DATES, DEFAULT_AREA_UICONFIG, MAX_CATEGORIES_COUNT, MAX_STACKS_COUNT, MAX_VIEW_COUNT, } from "../../../constants/uiConfig";
import { configureOverTimeComparison, configurePercent } from "../../../utils/bucketConfig";
import { getAllAttributeItemsWithPreference, getAllCategoriesAttributeItems, getDateItems, getFilteredMeasuresForStackedCharts, getStackItems, removeDivergentDateItems, isDateBucketItem, isNotDateBucketItem, removeAllArithmeticMeasuresFromDerived, removeAllDerivedMeasures, sanitizeFilters, getMainDateItem, getBucketItems, } from "../../../utils/bucketHelper";
import { getReferencePointWithSupportedProperties, removeImmutableOptionalStackingProperties, } from "../../../utils/propertiesHelper";
import { removeSort, getCustomSortDisabledExplanation } from "../../../utils/sort";
import { setAreaChartUiConfig } from "../../../utils/uiConfigHelpers/areaChartUiConfigHelper";
import LineChartBasedConfigurationPanel from "../../configurationPanels/LineChartBasedConfigurationPanel";
import { PluggableBaseChart } from "../baseChart/PluggableBaseChart";
import { addIntersectionFiltersToInsight, modifyBucketsAttributesForDrillDown, reverseAndTrimIntersection, } from "../drillDownUtil";
import { newAvailableSortsGroup } from "../../../interfaces/SortConfig";
/**
 * PluggableAreaChart
 *
 * ## Buckets
 *
 * | Name     | Id       | Accepts             |
 * |----------|----------|---------------------|
 * | Measures | measures | measures only       |
 * | ViewBy   | view     | attributes or dates |
 * | StackBy  | stack    | attributes only     |
 *
 * The ViewBy can accept one date at most, unless "enableMultipleDates" FF is on.
 *
 * ### Bucket axioms
 *
 * - |Measures| ≥ 1
 * - |ViewBy| ≤ 2
 * - |StackBy| ≤ 1
 * - |ViewBy| + |StackBy| ≤ 2
 * - |ViewBy| + |StackBy| = 2 ⇒ |Measures| ≤ 1
 * - |ViewBy| + |StackBy| \< 2 ⇒ |Measures| ≤ 20
 *
 * ## Dimensions
 *
 * The PluggableAreaChart always creates two dimensional execution.
 *
 * - |StackBy| = 1 ∧ |ViewBy| ≥ 1 ⇒ [[StackBy[0]], [ViewBy[0], MeasureGroupIdentifier]]
 * - |StackBy| = 1 ∧ |ViewBy| = 0 ⇒ [[StackBy[0]], [MeasureGroupIdentifier]]
 * - |StackBy| = 0 ∧ |ViewBy| = 2 ⇒ [[ViewBy[1]], [ViewBy[0], MeasureGroupIdentifier]]
 * - |StackBy| = 0 ∧ |ViewBy| = 1 ⇒ [[MeasureGroupIdentifier], [ViewBy[0]]]
 * - |StackBy| = 0 ∧ |ViewBy| = 0 ⇒ [[MeasureGroupIdentifier], []]]
 *
 * ## Sorts
 *
 * Unless the user specifies otherwise, PluggableAreaChart does not use any sorts.
 *
 */
export class PluggableAreaChart extends PluggableBaseChart {
    constructor(props) {
        super(props);
        this.type = VisualizationTypes.AREA;
        this.defaultControlsProperties = {
            stackMeasures: true,
        };
        this.initializeProperties(props.visualizationProperties);
    }
    getUiConfig() {
        return cloneDeep(this.isMultipleDatesEnabled() ? AREA_UICONFIG_WITH_MULTIPLE_DATES : DEFAULT_AREA_UICONFIG);
    }
    getExtendedReferencePoint(referencePoint) {
        const clonedReferencePoint = cloneDeep(referencePoint);
        let newReferencePoint = Object.assign(Object.assign({}, clonedReferencePoint), { uiConfig: this.getUiConfig() });
        newReferencePoint = removeAllArithmeticMeasuresFromDerived(newReferencePoint);
        newReferencePoint = removeAllDerivedMeasures(newReferencePoint);
        this.configureBuckets(newReferencePoint);
        newReferencePoint = setAreaChartUiConfig(newReferencePoint, this.intl, this.type);
        newReferencePoint = configurePercent(newReferencePoint, false);
        newReferencePoint = configureOverTimeComparison(newReferencePoint, !!this.featureFlags["enableWeekFilters"]);
        this.supportedPropertiesList = removeImmutableOptionalStackingProperties(newReferencePoint, this.getSupportedPropertiesList());
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
        const { properties, availableSorts: previousAvailableSorts } = referencePoint;
        const { disabled, disabledExplanation } = this.isSortDisabled(referencePoint, availableSorts);
        return Promise.resolve(Object.assign({ supported: true, disabled, appliedSort: super.reuseCurrentSort(previousAvailableSorts, properties, availableSorts, defaultSort), defaultSort,
            availableSorts }, (disabledExplanation && { disabledExplanation })));
    }
    updateInstanceProperties(options, insight, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    insightPropertiesMeta) {
        super.updateInstanceProperties(options, insight, insightPropertiesMeta);
        this.updateCustomSupportedProperties(insight);
    }
    configureBuckets(extendedReferencePoint) {
        const { measures, views, stacks } = this.isMultipleDatesEnabled()
            ? this.getBucketItemsWithMultipleDates(extendedReferencePoint)
            : this.getBucketItems(extendedReferencePoint);
        set(extendedReferencePoint, BUCKETS, [
            {
                localIdentifier: BucketNames.MEASURES,
                items: measures,
            },
            {
                localIdentifier: BucketNames.VIEW,
                items: views,
            },
            {
                localIdentifier: BucketNames.STACK,
                items: stacks,
            },
        ]);
    }
    getSupportedPropertiesList() {
        return AREA_CHART_SUPPORTED_PROPERTIES;
    }
    renderConfigurationPanel(insight) {
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            this.renderFun(React.createElement(LineChartBasedConfigurationPanel, { locale: this.locale, colors: this.colors, properties: this.visualizationProperties, propertiesMeta: this.propertiesMeta, insight: insight, references: this.references, pushData: this.handlePushData, type: this.type, isError: this.getIsError(), isLoading: this.isLoading, featureFlags: this.featureFlags }), configPanelElement);
        }
    }
    addFilters(source, drillConfig, event, backendSupportsElementUris) {
        const cutIntersection = reverseAndTrimIntersection(drillConfig, event.drillContext.intersection);
        return addIntersectionFiltersToInsight(source, cutIntersection, backendSupportsElementUris);
    }
    updateCustomSupportedProperties(insight) {
        if (bucketsItems(insightBuckets(insight, BucketNames.VIEW)).length > 1) {
            this.addSupportedProperties(OPTIONAL_STACKING_PROPERTIES);
            this.setCustomControlsProperties({
                stackMeasures: false,
                stackMeasuresToPercent: false,
            });
        }
        else {
            this.setCustomControlsProperties({});
        }
    }
    addSupportedProperties(properties) {
        const supportedPropertiesList = this.supportedPropertiesList;
        (properties || []).forEach((property) => {
            if (!supportedPropertiesList.some((supportedProperty) => supportedProperty === property)) {
                supportedPropertiesList.push(property);
            }
        });
    }
    getAllAttributes(buckets) {
        return getAllAttributeItemsWithPreference(buckets, [
            BucketNames.TREND,
            BucketNames.VIEW,
            BucketNames.SEGMENT,
            BucketNames.STACK,
        ]);
    }
    getAllAttributesWithoutDate(buckets) {
        return this.getAllAttributes(buckets).filter(isNotDateBucketItem);
    }
    filterStackItems(bucketItems) {
        return bucketItems.filter(isNotDateBucketItem).slice(0, MAX_STACKS_COUNT);
    }
    getBucketItems(referencePoint) {
        var _a;
        const buckets = (_a = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        const measures = getFilteredMeasuresForStackedCharts(buckets);
        const dateItems = getDateItems(buckets);
        const mainDateItem = getMainDateItem(dateItems);
        let stacks = this.filterStackItems(getStackItems(buckets));
        const isAllowMoreThanOneViewByAttribute = !stacks.length && measures.length <= 1;
        const numOfAttributes = isAllowMoreThanOneViewByAttribute ? MAX_VIEW_COUNT : 1;
        let views = removeDivergentDateItems(getAllCategoriesAttributeItems(buckets), mainDateItem).slice(0, numOfAttributes);
        const hasDateItemInViewByBucket = views.some(isDateBucketItem);
        if (dateItems.length && !hasDateItemInViewByBucket) {
            const allAttributes = this.getAllAttributesWithoutDate(buckets);
            const extraViewItems = allAttributes.slice(0, numOfAttributes - 1);
            views = numOfAttributes > 1 ? [mainDateItem, ...extraViewItems] : [mainDateItem];
            if (!isAllowMoreThanOneViewByAttribute && measures.length <= 1) {
                stacks = allAttributes.slice(0, MAX_STACKS_COUNT);
            }
        }
        return {
            measures,
            views,
            stacks,
        };
    }
    getViewByMaxItemCount(referencePoint) {
        var _a, _b, _c, _d;
        return (_d = (_c = (_b = (_a = referencePoint.uiConfig) === null || _a === void 0 ? void 0 : _a.buckets) === null || _b === void 0 ? void 0 : _b[BucketNames.VIEW]) === null || _c === void 0 ? void 0 : _c.itemsLimit) !== null && _d !== void 0 ? _d : MAX_CATEGORIES_COUNT;
    }
    getBucketItemsWithMultipleDates(referencePoint) {
        var _a;
        const buckets = (_a = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        const measures = getFilteredMeasuresForStackedCharts(buckets);
        const viewByMaxItemCount = this.getViewByMaxItemCount(referencePoint);
        const stacks = getStackItems(buckets, [ATTRIBUTE, DATE]);
        const allAttributesWithoutStacks = getAllAttributeItemsWithPreference(buckets, [
            BucketNames.LOCATION,
            BucketNames.TREND,
            BucketNames.VIEW,
            BucketNames.ATTRIBUTES,
            BucketNames.SEGMENT,
            BucketNames.STACK,
        ]).filter((attribute) => !stacks.includes(attribute));
        const maxViews = stacks.length || measures.length > 1 ? 1 : viewByMaxItemCount;
        const views = allAttributesWithoutStacks.slice(0, maxViews);
        return {
            measures,
            views,
            stacks,
        };
    }
    getDefaultAndAvailableSort(referencePoint) {
        var _a, _b;
        const { buckets, properties } = referencePoint;
        const measures = getBucketItems(buckets, BucketNames.MEASURES);
        const viewBy = getBucketItems(buckets, BucketNames.VIEW);
        const stackBy = getBucketItems(buckets, BucketNames.STACK);
        const canSortStackTotal = (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.stackMeasures) !== null && _b !== void 0 ? _b : this.getUiConfig().optionalStacking.stackMeasures;
        const defaultSort = viewBy.length > 0 ? [newAttributeSort(viewBy[0].localIdentifier, "asc")] : [];
        if (measures.length >= 2 && viewBy.length === 1 && !canSortStackTotal) {
            return {
                defaultSort,
                availableSorts: [
                    newAvailableSortsGroup(viewBy[0].localIdentifier, measures.map((m) => m.localIdentifier)),
                ],
            };
        }
        if (measures.length === 1 && isEmpty(stackBy)) {
            if (viewBy.length >= 2) {
                return {
                    defaultSort,
                    availableSorts: [newAvailableSortsGroup(viewBy[0].localIdentifier)],
                };
            }
            if (viewBy.length === 1) {
                return {
                    defaultSort,
                    availableSorts: [
                        newAvailableSortsGroup(viewBy[0].localIdentifier, measures.map((m) => m.localIdentifier), true, false),
                    ],
                };
            }
        }
        if (measures.length > 0 && viewBy.length === 1 && (stackBy.length === 1 || canSortStackTotal)) {
            return {
                defaultSort,
                availableSorts: [
                    newAvailableSortsGroup(viewBy[0].localIdentifier, isEmpty(stackBy) ? measures.map((m) => m.localIdentifier) : []),
                ],
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
        const viewBy = getBucketItems(buckets, BucketNames.VIEW);
        const disabledExplanation = getCustomSortDisabledExplanation(measures, viewBy, this.intl);
        return {
            disabled: viewBy.length < 1 || measures.length < 1 || availableSorts.length === 0,
            disabledExplanation,
        };
    }
}
//# sourceMappingURL=PluggableAreaChart.js.map