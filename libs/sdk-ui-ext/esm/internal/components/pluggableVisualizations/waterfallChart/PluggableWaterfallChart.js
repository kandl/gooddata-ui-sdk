// (C) 2023 GoodData Corporation
import React from "react";
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { newMeasureSort } from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";
import isEqual from "lodash/isEqual.js";
import WaterfallChartConfigurationPanel from "../../configurationPanels/WaterfallChartConfigurationPanel.js";
import { BUCKETS } from "../../../constants/bucket.js";
import { WATERFALL_CHART_SUPPORTED_PROPERTIES } from "../../../constants/supportedProperties.js";
import { DEFAULT_WATERFALL_UICONFIG, WATERFALL_UICONFIG_WITH_MULTIPLE_METRICS, UICONFIG, WATERFALL_UICONFIG_WITH_ONE_METRIC, } from "../../../constants/uiConfig.js";
import { configureOverTimeComparison, configurePercent } from "../../../utils/bucketConfig.js";
import { getAttributeItems, getBucketItems, getMeasureItems, getViewItems, limitNumberOfMeasuresInBuckets, removeAllArithmeticMeasuresFromDerived, removeAllDerivedMeasures, sanitizeFilters, } from "../../../utils/bucketHelper.js";
import { getReferencePointWithSupportedProperties, getSupportedPropertiesControls, } from "../../../utils/propertiesHelper.js";
import { getCustomSortDisabledExplanation, removeSort } from "../../../utils/sort.js";
import { getWaterfallTotalColumnName, setWaterfallChartUiConfig, } from "../../../utils/uiConfigHelpers/waterfallChartUiConfigHelper.js";
import { PluggableBaseChart } from "../baseChart/PluggableBaseChart.js";
import { newAvailableSortsGroup } from "../../../interfaces/SortConfig.js";
/**
 * PluggableWaterfallChart
 *
 * ## Buckets
 *
 * | Name     | Id       | Accepts             |
 * |----------|----------|---------------------|
 * | Measures | measures | measures only       |
 * | ViewBy   | view     | attribute or date   |
 *
 * ### Bucket axioms
 *
 * - |ViewBy| ≤ 1
 * - |Measures| ≥ 1 ∧ ≤ 20
 * - |ViewBy| = 1 ⇒ |Measures| = 1
 * - |ViewBy| = 0 ⇒ |Measures| ≥ 1
 *
 * ## Dimensions
 *
 * The PluggableWaterfallChart always creates two dimensional execution.
 *
 * With measures only:
 * - [[], [MeasureGroupIdentifier]]
 * With viewBy:
 * - [[MeasureGroupIdentifier], [ViewBy]]
 *
 * ## Default sorts
 *
 * When Waterfall Chart is used with measures only, it's sorted by their order by default.
 * When Waterfall Chart chart is used with viewBy attribute or date, it's sorted by the values of the measure by default.
 *
 * Default sort behavior can be overriden by sortBy option.
 *
 */
export class PluggableWaterfallChart extends PluggableBaseChart {
    constructor(props) {
        super(props);
        this.type = VisualizationTypes.WATERFALL;
        this.initializeProperties(props.visualizationProperties);
    }
    getSupportedPropertiesList() {
        return WATERFALL_CHART_SUPPORTED_PROPERTIES;
    }
    initializeProperties(visualizationProperties) {
        var _a, _b, _c;
        const controls = visualizationProperties === null || visualizationProperties === void 0 ? void 0 : visualizationProperties.controls;
        const supportedProperties = getSupportedPropertiesControls(controls, this.supportedPropertiesList);
        const initialProperties = {
            supportedProperties: {
                controls: Object.assign(Object.assign({}, supportedProperties), { total: {
                        enabled: (_b = (_a = controls === null || controls === void 0 ? void 0 : controls.total) === null || _a === void 0 ? void 0 : _a.enabled) !== null && _b !== void 0 ? _b : true,
                        name: getWaterfallTotalColumnName((_c = controls === null || controls === void 0 ? void 0 : controls.total) === null || _c === void 0 ? void 0 : _c.name, this.intl),
                    } }),
            },
        };
        this.pushData({
            initialProperties,
        });
    }
    getUiConfig() {
        return cloneDeep(DEFAULT_WATERFALL_UICONFIG);
    }
    getExtendedReferencePoint(referencePoint) {
        var _a;
        const clonedReferencePoint = cloneDeep(referencePoint);
        let newReferencePoint = Object.assign(Object.assign({}, clonedReferencePoint), { uiConfig: this.getUiConfig() });
        newReferencePoint = removeAllArithmeticMeasuresFromDerived(newReferencePoint);
        newReferencePoint = removeAllDerivedMeasures(newReferencePoint);
        const buckets = (_a = clonedReferencePoint === null || clonedReferencePoint === void 0 ? void 0 : clonedReferencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        const attributes = getAttributeItems(buckets);
        if (attributes.length) {
            const limitedBuckets = limitNumberOfMeasuresInBuckets(buckets, 1);
            const limitedMeasures = getMeasureItems(limitedBuckets);
            set(newReferencePoint, BUCKETS, [
                {
                    localIdentifier: BucketNames.MEASURES,
                    items: limitedMeasures,
                },
                {
                    localIdentifier: BucketNames.VIEW,
                    items: attributes.slice(0, 1),
                },
            ]);
        }
        else {
            const measures = getMeasureItems(buckets);
            if (measures.length > 1) {
                set(newReferencePoint, UICONFIG, cloneDeep(WATERFALL_UICONFIG_WITH_MULTIPLE_METRICS));
            }
            else {
                set(newReferencePoint, UICONFIG, cloneDeep(WATERFALL_UICONFIG_WITH_ONE_METRIC));
            }
            set(newReferencePoint, BUCKETS, [
                {
                    localIdentifier: BucketNames.MEASURES,
                    items: measures,
                },
                {
                    localIdentifier: BucketNames.VIEW,
                    items: [],
                },
            ]);
        }
        newReferencePoint = configurePercent(newReferencePoint, false);
        newReferencePoint = configureOverTimeComparison(newReferencePoint, !!this.featureFlags["enableWeekFilters"]);
        newReferencePoint = getReferencePointWithSupportedProperties(newReferencePoint, this.supportedPropertiesList);
        newReferencePoint = this.setPropertiesTotalMeasures(newReferencePoint);
        if (!this.featureFlags.enableChartsSorting) {
            newReferencePoint = removeSort(newReferencePoint);
        }
        newReferencePoint = setWaterfallChartUiConfig(newReferencePoint, this.intl, this.type);
        return Promise.resolve(sanitizeFilters(newReferencePoint));
    }
    getDefaultAndAvailableSort(measures, viewBy) {
        if (isEmpty(measures) || isEmpty(viewBy)) {
            return {
                defaultSort: [],
                availableSorts: [],
            };
        }
        return {
            defaultSort: [newMeasureSort(measures[0].localIdentifier, "desc")],
            availableSorts: [
                newAvailableSortsGroup(viewBy[0].localIdentifier, [measures[0].localIdentifier], true, false),
            ],
        };
    }
    isSortDisabled(referencePoint, availableSorts) {
        const { buckets } = referencePoint;
        const measures = getMeasureItems(buckets);
        const viewBy = getBucketItems(buckets, BucketNames.VIEW);
        const disabled = viewBy.length < 1 || measures.length < 1 || availableSorts.length === 0;
        const disabledExplanation = getCustomSortDisabledExplanation(measures, viewBy, this.intl);
        return {
            disabled,
            disabledExplanation,
        };
    }
    getSortConfig(referencePoint) {
        const { buckets, properties, availableSorts: previousAvailableSorts } = referencePoint;
        const measures = getMeasureItems(buckets);
        const viewBy = getBucketItems(buckets, BucketNames.VIEW);
        const { defaultSort, availableSorts } = this.getDefaultAndAvailableSort(measures, viewBy);
        const { disabled, disabledExplanation } = this.isSortDisabled(referencePoint, availableSorts);
        return Promise.resolve(Object.assign({ supported: true, disabled, appliedSort: super.reuseCurrentSort(previousAvailableSorts, properties, availableSorts, defaultSort), defaultSort,
            availableSorts }, (disabledExplanation && { disabledExplanation })));
    }
    renderConfigurationPanel(insight) {
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            this.renderFun(React.createElement(WaterfallChartConfigurationPanel, { locale: this.locale, properties: this.visualizationProperties, propertiesMeta: this.propertiesMeta, insight: insight, pushData: this.handlePushData, colors: this.colors, type: this.type, isError: this.getIsError(), isLoading: this.isLoading, featureFlags: this.featureFlags, references: this.references, dataLabelDefaultValue: "auto" }), configPanelElement);
        }
    }
    setPropertiesTotalMeasures(referencePoint) {
        var _a, _b;
        const { buckets, properties } = referencePoint;
        const viewItems = getViewItems(buckets);
        const measureItems = getMeasureItems(buckets);
        const listTotalMeasures = measureItems
            .filter((item) => item.isTotalMeasure)
            .map((item) => item.localIdentifier);
        const existingTotalMeasures = ((_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.total) === null || _b === void 0 ? void 0 : _b.measures) || [];
        if (measureItems.length <= 1 && existingTotalMeasures.length > 0) {
            // In case one view item, we need to reset the total measures is empty
            set(referencePoint, "properties.controls.total.measures", []);
        }
        if (viewItems.length > 0 || isEqual(listTotalMeasures, existingTotalMeasures)) {
            return referencePoint;
        }
        set(referencePoint, "properties.controls.total.measures", listTotalMeasures);
        return referencePoint;
    }
}
//# sourceMappingURL=PluggableWaterfallChart.js.map