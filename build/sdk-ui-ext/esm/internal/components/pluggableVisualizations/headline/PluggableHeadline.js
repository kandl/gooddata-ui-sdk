// (C) 2019-2022 GoodData Corporation
import React from "react";
import cloneDeep from "lodash/cloneDeep.js";
import { bucketIsEmpty, insightBucket, insightBuckets, insightFilters, insightHasDataDefined, insightId, insightProperties, insightSorts, isInsight, MeasureGroupIdentifier, newDimension, } from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";
import { CoreHeadline, createHeadlineProvider, DEFAULT_COMPARISON_PALETTE } from "@gooddata/sdk-ui-charts";
import { METRIC } from "../../../constants/bucket.js";
import { InvalidBucketsSdkError, } from "../../../interfaces/Visualization.js";
import { configureOverTimeComparison, configurePercent } from "../../../utils/bucketConfig.js";
import { findDerivedBucketItem, getAllItemsByType, hasDerivedBucketItems, isArithmeticBucketItem, isDerivedBucketItem, limitNumberOfMeasuresInBuckets, removeAllArithmeticMeasuresFromDerived, removeAllDerivedMeasures, sanitizeFilters, } from "../../../utils/bucketHelper.js";
import { hasGlobalDateFilter } from "../../../utils/bucketRules.js";
import { getReferencePointWithSupportedProperties } from "../../../utils/propertiesHelper.js";
import { removeSort } from "../../../utils/sort.js";
import { buildHeadlineVisualizationConfig, getDefaultHeadlineUiConfig, getHeadlineSupportedProperties, getHeadlineUiConfig, } from "../../../utils/uiConfigHelpers/headlineUiConfigHelper.js";
import HeadlineConfigurationPanel from "../../configurationPanels/HeadlineConfigurationPanel.js";
import UnsupportedConfigurationPanel from "../../configurationPanels/UnsupportedConfigurationPanel.js";
import { AbstractPluggableVisualization } from "../AbstractPluggableVisualization.js";
import { setHeadlineRefPointBuckets, tryToMapForeignBuckets } from "./headlineBucketHelper.js";
import { HEADLINE_DEFAULT_CONTROL_PROPERTIES, HEADLINE_DEFAULT_MIGRATION_CONTROL_PROPERTIES, HEADLINE_SUPPORTED_PROPERTIES, } from "../../../constants/supportedProperties.js";
/**
 * PluggableHeadline
 *
 * ## Buckets
 *
 * | Name             | Id                 | Accepts       |
 * |------------------|--------------------|---------------|
 * | MeasurePrimary   | measures           | measures only |
 * | MeasureSecondary | secondary_measures | measures only |
 *
 * ### Bucket axioms
 *
 * - |MeasurePrimary| = 1
 * - |MeasureSecondary| ≤ 2
 *
 * ## Dimensions
 *
 * The PluggableHeadline always creates one dimensional execution.
 *
 * - ⊤ ⇒ [[MeasureGroupIdentifier]]
 *
 * ## Sorts
 *
 * The PluggableHeadline does not use any sorts.
 */
export class PluggableHeadline extends AbstractPluggableVisualization {
    constructor(props) {
        super(props);
        this.keepPrimaryDerivedMeasureOnly = false;
        this.settings = props.featureFlags;
        this.renderFun = props.renderFun;
        this.unmountFun = props.unmountFun;
        this.supportedPropertiesList = HEADLINE_SUPPORTED_PROPERTIES;
    }
    unmount() {
        this.unmountFun([this.getElement(), this.getConfigPanelElement()]);
    }
    getExtendedReferencePoint(referencePoint) {
        var _a;
        const referencePointCloned = cloneDeep(referencePoint);
        let newReferencePoint = Object.assign(Object.assign({}, referencePointCloned), { uiConfig: getDefaultHeadlineUiConfig(this.settings) });
        if (!hasGlobalDateFilter(referencePoint.filters)) {
            newReferencePoint = removeAllArithmeticMeasuresFromDerived(newReferencePoint);
            newReferencePoint = removeAllDerivedMeasures(newReferencePoint);
        }
        const mappedReferencePoint = tryToMapForeignBuckets(newReferencePoint);
        if (mappedReferencePoint) {
            newReferencePoint = mappedReferencePoint;
            const primaryMeasure = mappedReferencePoint.buckets[0].items[0];
            this.keepPrimaryDerivedMeasureOnly =
                !primaryMeasure || !hasDerivedBucketItems(primaryMeasure, mappedReferencePoint.buckets);
        }
        else {
            const numberOfSecondaryMeasure = newReferencePoint.uiConfig.buckets[BucketNames.SECONDARY_MEASURES].itemsLimit;
            const limitedBuckets = limitNumberOfMeasuresInBuckets(newReferencePoint.buckets, numberOfSecondaryMeasure + 1, true);
            const allMeasures = getAllItemsByType(limitedBuckets, [METRIC]);
            const primaryMeasure = allMeasures.length > 0 ? allMeasures[0] : null;
            let secondaryMeasures = allMeasures.length > 1 ? allMeasures.slice(1, numberOfSecondaryMeasure + 1) : null;
            const primaryDerivedMeasure = findDerivedBucketItem(primaryMeasure, allMeasures);
            if (this.keepPrimaryDerivedMeasureOnly &&
                primaryDerivedMeasure &&
                !isArithmeticBucketItem(primaryMeasure)) {
                secondaryMeasures = [primaryDerivedMeasure];
            }
            this.keepPrimaryDerivedMeasureOnly = !primaryDerivedMeasure;
            newReferencePoint = setHeadlineRefPointBuckets(newReferencePoint, primaryMeasure, secondaryMeasures);
        }
        configurePercent(newReferencePoint, true);
        configureOverTimeComparison(newReferencePoint, !!((_a = this.settings) === null || _a === void 0 ? void 0 : _a["enableWeekFilters"]));
        newReferencePoint.uiConfig = getHeadlineUiConfig(newReferencePoint, this.intl, this.settings);
        newReferencePoint = getReferencePointWithSupportedProperties(newReferencePoint, this.supportedPropertiesList);
        newReferencePoint = removeSort(newReferencePoint);
        return Promise.resolve(sanitizeFilters(newReferencePoint));
    }
    getExecution(options, insight, executionFactory) {
        const { dateFormat, executionConfig } = options;
        return executionFactory
            .forInsight(insight)
            .withDimensions(newDimension([MeasureGroupIdentifier]))
            .withDateFormat(dateFormat)
            .withExecConfig(executionConfig);
    }
    checkBeforeRender(insight) {
        super.checkBeforeRender(insight);
        const measureBucket = insightBucket(insight, BucketNames.MEASURES);
        if (!measureBucket || bucketIsEmpty(measureBucket)) {
            // unmount on error because currently AD cannot recover in certain cases (RAIL-2625)
            this.unmount();
            throw new InvalidBucketsSdkError();
        }
        return true;
    }
    renderVisualization(options, insight, executionFactory) {
        if (!insightHasDataDefined(insight)) {
            return;
        }
        const { visualizationProperties, settings } = this;
        const { locale, custom = {} } = options;
        const { drillableItems } = custom;
        const buckets = [...(insightBuckets(insight) || [])];
        const headlineConfig = buildHeadlineVisualizationConfig(visualizationProperties, settings, options);
        const provider = createHeadlineProvider(buckets, headlineConfig, settings === null || settings === void 0 ? void 0 : settings.enableNewHeadline);
        const headlineTransformation = provider.getHeadlineTransformationComponent();
        const execution = provider.createExecution(executionFactory, {
            buckets,
            filters: [...(insightFilters(insight) || [])],
            sortItems: [...(insightSorts(insight) || [])],
            executionConfig: options.executionConfig,
            dateFormat: options.dateFormat,
        });
        this.renderFun(React.createElement(CoreHeadline, { headlineTransformation: headlineTransformation, execution: execution, drillableItems: drillableItems, onDrill: this.onDrill, locale: locale, config: headlineConfig, afterRender: this.afterRender, onLoadingChanged: this.onLoadingChanged, pushData: this.pushData, onError: this.onError, LoadingComponent: null, ErrorComponent: null }), this.getElement());
    }
    renderConfigurationPanel(insight) {
        var _a, _b;
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            const ConfigurationPanel = ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.enableNewHeadline)
                ? HeadlineConfigurationPanel
                : UnsupportedConfigurationPanel;
            this.renderFun(React.createElement(ConfigurationPanel, { locale: this.locale, insight: insight, panelConfig: {
                    separators: (_b = this.settings) === null || _b === void 0 ? void 0 : _b.separators,
                    comparisonColorPalette: DEFAULT_COMPARISON_PALETTE,
                }, pushData: this.pushData, properties: getHeadlineSupportedProperties(this.visualizationProperties), propertiesMeta: this.propertiesMeta, isError: this.getIsError(), isLoading: this.isLoading }), configPanelElement);
        }
    }
    mergeDerivedBucketItems(referencePoint, bucket, newDerivedBucketItems) {
        return bucket.items.reduce((resultItems, bucketItem) => {
            const newDerivedBucketItem = findDerivedBucketItem(bucketItem, newDerivedBucketItems);
            const shouldAddItem = newDerivedBucketItem &&
                !isDerivedBucketItem(bucketItem) &&
                !hasDerivedBucketItems(bucketItem, referencePoint.buckets);
            const shouldAddAfterMasterItem = bucket.localIdentifier === BucketNames.MEASURES;
            if (shouldAddItem && !shouldAddAfterMasterItem) {
                resultItems.push(newDerivedBucketItem);
            }
            resultItems.push(bucketItem);
            if (shouldAddItem && shouldAddAfterMasterItem) {
                resultItems.push(newDerivedBucketItem);
            }
            return resultItems;
        }, []);
    }
    updateInstanceProperties(options, insight, insightPropertiesMeta) {
        var _a, _b;
        super.updateInstanceProperties(options, insight, insightPropertiesMeta);
        const hasComparisonProperties = (_a = insightProperties(insight).controls) === null || _a === void 0 ? void 0 : _a.comparison;
        if (!hasComparisonProperties && ((_b = this.settings) === null || _b === void 0 ? void 0 : _b.enableNewHeadline)) {
            const defaultComparisonProperties = this.getDefaultPropertiesForComparison(options, insight);
            this.visualizationProperties = {
                controls: Object.assign({}, defaultComparisonProperties),
            };
            this.pushData({
                properties: {
                    controls: Object.assign({}, defaultComparisonProperties),
                },
            });
        }
    }
    getDefaultPropertiesForComparison(options, insight) {
        var _a;
        const isInsightOpened = isInsight(insight) && insightId(insight);
        const hasVisClassChanged = ((_a = options.custom) === null || _a === void 0 ? void 0 : _a.lastSavedVisClassUrl) !== "local:headline";
        const useDefaultMigrationProperties = isInsightOpened && !hasVisClassChanged;
        return useDefaultMigrationProperties
            ? this.buildDefaultMigrationProperties()
            : HEADLINE_DEFAULT_CONTROL_PROPERTIES;
    }
    buildDefaultMigrationProperties() {
        return {
            comparison: Object.assign(Object.assign({}, HEADLINE_DEFAULT_MIGRATION_CONTROL_PROPERTIES.comparison), { labelConfig: {
                    unconditionalValue: this.intl.formatMessage({
                        id: "visualizations.headline.tertiary.title",
                    }),
                } }),
        };
    }
}
//# sourceMappingURL=PluggableHeadline.js.map