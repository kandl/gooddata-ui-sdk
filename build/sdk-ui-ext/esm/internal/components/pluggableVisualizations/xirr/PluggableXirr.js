// (C) 2019-2022 GoodData Corporation
import { bucketAttributes, insightBucket, MeasureGroupIdentifier, newDimension, } from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";
import { CoreXirr, updateConfigWithSettings } from "@gooddata/sdk-ui-charts";
import React from "react";
import { removeAllArithmeticMeasuresFromDerived, removeAllDerivedMeasures, sanitizeFilters, } from "../../../utils/bucketHelper.js";
import { hasGlobalDateFilter } from "../../../utils/bucketRules.js";
import { getReferencePointWithSupportedProperties, getSupportedProperties, } from "../../../utils/propertiesHelper.js";
import { removeSort } from "../../../utils/sort.js";
import { getDefaultXirrUiConfig, getXirrUiConfig, } from "../../../utils/uiConfigHelpers/xirrUiConfigHelper.js";
import UnsupportedConfigurationPanel from "../../configurationPanels/UnsupportedConfigurationPanel.js";
import { AbstractPluggableVisualization } from "../AbstractPluggableVisualization.js";
import { getXirrBuckets } from "./xirrBucketHelper.js";
import cloneDeep from "lodash/cloneDeep.js";
/**
 * PluggableXirr
 *
 * ## Buckets
 *
 * | Name           | Id        | Accepts       |
 * |----------------|-----------|---------------|
 * | Measure        | measures  | measures only |
 * | Date Attribute | attribute | dates only    |
 *
 * ### Bucket axioms
 *
 * - |Measure| = 1
 * - |DateAttribute| = 1
 *
 * ## Dimensions
 *
 * The PluggableXirr always creates one dimensional execution.
 *
 * - ⊤ ⇒ [[MeasureGroupIdentifier, DateAttribute]]
 *
 * ## Sorts
 *
 * The PluggableXirr does not use any sorts.
 */
export class PluggableXirr extends AbstractPluggableVisualization {
    constructor(props) {
        super(props);
        this.getExtendedReferencePoint = async (referencePoint) => {
            const referencePointCloned = cloneDeep(referencePoint);
            let newReferencePoint = Object.assign(Object.assign({}, referencePointCloned), { uiConfig: getDefaultXirrUiConfig() });
            if (!hasGlobalDateFilter(referencePoint.filters)) {
                newReferencePoint = removeAllArithmeticMeasuresFromDerived(newReferencePoint);
                newReferencePoint = removeAllDerivedMeasures(newReferencePoint);
            }
            const buckets = getXirrBuckets(referencePoint);
            newReferencePoint.buckets = buckets;
            newReferencePoint.uiConfig = getXirrUiConfig(newReferencePoint, this.intl);
            newReferencePoint = removeSort(newReferencePoint);
            newReferencePoint = getReferencePointWithSupportedProperties(newReferencePoint, this.supportedPropertiesList);
            return sanitizeFilters(newReferencePoint);
        };
        // This is effectively calling super.pushData()
        // https://stackoverflow.com/questions/31088947/inheritance-method-call-triggers-typescript-compiler-error
        // https://github.com/basarat/typescript-book/blob/master/docs/arrow-functions.md#tip-arrow-functions-and-inheritance
        this.superPushData = this.pushData;
        this.pushData = (data, options) => {
            // For xirr chart we do not support drilling from attributes.
            const filterAttributes = this.withEmptyAttributeTargets(data);
            this.superPushData(filterAttributes, options);
        };
        this.settings = props.featureFlags;
        this.renderFun = props.renderFun;
        this.unmountFun = props.unmountFun;
    }
    unmount() {
        this.unmountFun([this.getElement(), this.getConfigPanelElement()]);
    }
    getExecution(options, insight, executionFactory) {
        const { dateFormat } = options;
        return executionFactory
            .forInsight(insight)
            .withDimensions(...this.getXirrDimensions(insight))
            .withDateFormat(dateFormat);
    }
    renderVisualization(options, insight, executionFactory) {
        const { locale, custom = {}, config } = options;
        const { drillableItems } = custom;
        const execution = this.getExecution(options, insight, executionFactory);
        this.renderFun(React.createElement(CoreXirr, { execution: execution, drillableItems: drillableItems, onDrill: this.onDrill, locale: locale, config: updateConfigWithSettings(config, this.settings), afterRender: this.afterRender, onLoadingChanged: this.onLoadingChanged, pushData: this.pushData, onError: this.onError, LoadingComponent: null, ErrorComponent: null }), this.getElement());
    }
    renderConfigurationPanel() {
        var _a;
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            const properties = (_a = this.visualizationProperties) !== null && _a !== void 0 ? _a : {};
            this.renderFun(React.createElement(UnsupportedConfigurationPanel, { locale: this.locale, pushData: this.pushData, properties: getSupportedProperties(properties, this.supportedPropertiesList) }), configPanelElement);
        }
    }
    getXirrDimensions(insight) {
        const attributeBucket = insightBucket(insight, BucketNames.ATTRIBUTE);
        const attributes = attributeBucket ? bucketAttributes(attributeBucket) : [];
        return [newDimension([MeasureGroupIdentifier, ...attributes])];
    }
    withEmptyAttributeTargets(data) {
        return Object.assign(Object.assign({}, data), { availableDrillTargets: Object.assign(Object.assign({}, data === null || data === void 0 ? void 0 : data.availableDrillTargets), { attributes: [] }) });
    }
}
//# sourceMappingURL=PluggableXirr.js.map