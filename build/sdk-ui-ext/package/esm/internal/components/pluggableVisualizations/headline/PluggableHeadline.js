// (C) 2019-2022 GoodData Corporation
import { bucketIsEmpty, insightBucket, insightHasDataDefined, MeasureGroupIdentifier, newDimension, } from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";
import { CoreHeadline, updateConfigWithSettings } from "@gooddata/sdk-ui-charts";
import React from "react";
import { METRIC } from "../../../constants/bucket";
import { InvalidBucketsSdkError, } from "../../../interfaces/Visualization";
import { configureOverTimeComparison, configurePercent } from "../../../utils/bucketConfig";
import { findDerivedBucketItem, getAllItemsByType, hasDerivedBucketItems, isDerivedBucketItem, limitNumberOfMeasuresInBuckets, removeAllArithmeticMeasuresFromDerived, removeAllDerivedMeasures, sanitizeFilters, } from "../../../utils/bucketHelper";
import { hasGlobalDateFilter } from "../../../utils/bucketRules";
import { unmountComponentsAtNodes } from "../../../utils/domHelper";
import { getReferencePointWithSupportedProperties, getSupportedProperties, } from "../../../utils/propertiesHelper";
import { removeSort } from "../../../utils/sort";
import { getDefaultHeadlineUiConfig, getHeadlineUiConfig, } from "../../../utils/uiConfigHelpers/headlineUiConfigHelper";
import UnsupportedConfigurationPanel from "../../configurationPanels/UnsupportedConfigurationPanel";
import { AbstractPluggableVisualization } from "../AbstractPluggableVisualization";
import { findComplementaryOverTimeComparisonMeasure, findSecondMasterMeasure, setHeadlineRefPointBuckets, tryToMapForeignBuckets, } from "./headlineBucketHelper";
import cloneDeep from "lodash/cloneDeep";
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
 * - |MeasureSecondary| ≤ 1
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
        this.settings = props.featureFlags;
        this.renderFun = props.renderFun;
    }
    unmount() {
        unmountComponentsAtNodes([this.getElement(), this.getConfigPanelElement()]);
    }
    getExtendedReferencePoint(referencePoint) {
        var _a;
        const referencePointCloned = cloneDeep(referencePoint);
        let newReferencePoint = Object.assign(Object.assign({}, referencePointCloned), { uiConfig: getDefaultHeadlineUiConfig() });
        if (!hasGlobalDateFilter(referencePoint.filters)) {
            newReferencePoint = removeAllArithmeticMeasuresFromDerived(newReferencePoint);
            newReferencePoint = removeAllDerivedMeasures(newReferencePoint);
        }
        const mappedReferencePoint = tryToMapForeignBuckets(newReferencePoint);
        if (mappedReferencePoint) {
            newReferencePoint = mappedReferencePoint;
        }
        else {
            const limitedBuckets = limitNumberOfMeasuresInBuckets(newReferencePoint.buckets, 2, true);
            const allMeasures = getAllItemsByType(limitedBuckets, [METRIC]);
            const primaryMeasure = allMeasures.length > 0 ? allMeasures[0] : null;
            const secondaryMeasure = findComplementaryOverTimeComparisonMeasure(primaryMeasure, allMeasures) ||
                findSecondMasterMeasure(allMeasures);
            newReferencePoint = setHeadlineRefPointBuckets(newReferencePoint, primaryMeasure, secondaryMeasure);
        }
        configurePercent(newReferencePoint, true);
        configureOverTimeComparison(newReferencePoint, !!((_a = this.settings) === null || _a === void 0 ? void 0 : _a["enableWeekFilters"]));
        newReferencePoint.uiConfig = getHeadlineUiConfig(newReferencePoint, this.intl);
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
        const { locale, custom = {}, config, customVisualizationConfig } = options;
        const { drillableItems } = custom;
        const execution = this.getExecution(options, insight, executionFactory);
        this.renderFun(React.createElement(CoreHeadline, { execution: execution, drillableItems: drillableItems, onDrill: this.onDrill, locale: locale, config: updateConfigWithSettings(Object.assign(Object.assign({}, config), customVisualizationConfig), this.settings), afterRender: this.afterRender, onLoadingChanged: this.onLoadingChanged, pushData: this.pushData, onError: this.onError, LoadingComponent: null, ErrorComponent: null }), this.getElement());
    }
    renderConfigurationPanel() {
        var _a;
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            const properties = (_a = this.visualizationProperties) !== null && _a !== void 0 ? _a : {};
            this.renderFun(React.createElement(UnsupportedConfigurationPanel, { locale: this.locale, pushData: this.pushData, properties: getSupportedProperties(properties, this.supportedPropertiesList) }), configPanelElement);
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
}
//# sourceMappingURL=PluggableHeadline.js.map