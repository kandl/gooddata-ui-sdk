// (C) 2019-2022 GoodData Corporation
import React from "react";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import without from "lodash/without";
import isEmpty from "lodash/isEmpty";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { isAreaChart, isLineChart } from "@gooddata/sdk-ui-charts";
import { insightBuckets, bucketsIsEmpty, newAttributeSort } from "@gooddata/sdk-model";
import { PluggableBaseChart } from "../baseChart/PluggableBaseChart";
import { AXIS, AXIS_NAME } from "../../../constants/axis";
import { BUCKETS, METRIC } from "../../../constants/bucket";
import { PROPERTY_CONTROLS_DUAL_AXIS } from "../../../constants/properties";
import { COMBO_CHART_SUPPORTED_PROPERTIES } from "../../../constants/supportedProperties";
import { COMBO_CHART_UICONFIG } from "../../../constants/uiConfig";
import { newAvailableSortsGroup } from "../../../interfaces/SortConfig";
import { configureOverTimeComparison, configurePercent } from "../../../utils/bucketConfig";
import { removeSort, getCustomSortDisabledExplanation } from "../../../utils/sort";
import { applyUiConfig, findBucket, getAllAttributeItemsWithPreference, getAllMeasuresShowOnSecondaryAxis, getBucketItemsByType, getBucketItemsWithExcludeByType, getMeasureItems, hasBucket, sanitizeFilters, setMeasuresShowOnSecondaryAxis, getBucketItems, } from "../../../utils/bucketHelper";
import { getMasterMeasuresCount } from "../../../utils/bucketRules";
import { getReferencePointWithSupportedProperties, isDualAxisOrSomeSecondaryAxisMeasure, setSecondaryMeasures, } from "../../../utils/propertiesHelper";
import { setComboChartUiConfig } from "../../../utils/uiConfigHelpers/comboChartUiConfigHelper";
import LineChartBasedConfigurationPanel from "../../configurationPanels/LineChartBasedConfigurationPanel";
/**
 * PluggableComboChart
 *
 * ## Buckets
 *
 * | Name                | Id                 | Accepts             |
 * |---------------------|--------------------|---------------------|
 * | Measure (Primary)   | measures           | measures only       |
 * | Measure (Secondary) | secondary_measures | measures only       |
 * | ViewBy              | view               | attributes or dates |
 *
 * ### Bucket axioms
 *
 * - |MeasurePrimary| ≤ 20
 * - |MeasureSecondary| ≤ 20
 * - |ViewBy| ≤ 1
 * - |MeasurePrimary| + |MeasureSecondary| ≥ 1
 *
 * ## Dimensions
 *
 * The PluggableComboChart always creates the same two dimensional execution.
 *
 * - ⊤ ⇒ [[MeasureGroupIdentifier], [...ViewBy]]
 *
 * ## Sorts
 *
 * The PluggableComboChart does not use any sorts.
 */
export class PluggableComboChart extends PluggableBaseChart {
    constructor(props) {
        var _a, _b, _c;
        super(props);
        this.primaryChartType = VisualizationTypes.COLUMN;
        this.secondaryChartType = VisualizationTypes.COLUMN;
        this.type = VisualizationTypes.COMBO;
        this.axis = AXIS.DUAL;
        this.secondaryAxis = AXIS_NAME.SECONDARY_Y;
        const propertiesControls = (_a = props.visualizationProperties) === null || _a === void 0 ? void 0 : _a.controls;
        this.primaryChartType = (_b = propertiesControls === null || propertiesControls === void 0 ? void 0 : propertiesControls.primaryChartType) !== null && _b !== void 0 ? _b : VisualizationTypes.COLUMN;
        this.secondaryChartType = (_c = propertiesControls === null || propertiesControls === void 0 ? void 0 : propertiesControls.secondaryChartType) !== null && _c !== void 0 ? _c : VisualizationTypes.COLUMN;
        this.supportedPropertiesList = this.getSupportedPropertiesList();
        this.defaultControlsProperties = {
            stackMeasures: this.isStackMeasuresByDefault(),
        };
        this.initializeProperties(props.visualizationProperties);
    }
    getSupportedPropertiesList() {
        return COMBO_CHART_SUPPORTED_PROPERTIES[this.axis] || [];
    }
    getUiConfig() {
        return cloneDeep(Object.assign(Object.assign({}, COMBO_CHART_UICONFIG), { optionalStacking: {
                supported: true,
                disabled: isLineChart(this.primaryChartType),
                stackMeasures: this.isStackMeasuresByDefault(),
            } }));
    }
    getExtendedReferencePoint(referencePoint) {
        var _a, _b, _c, _d, _e, _f;
        const clonedReferencePoint = cloneDeep(referencePoint);
        const properties = this.configureChartTypes(clonedReferencePoint);
        this.primaryChartType = (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.primaryChartType) !== null && _b !== void 0 ? _b : VisualizationTypes.COLUMN;
        this.secondaryChartType = (_d = (_c = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _c === void 0 ? void 0 : _c.secondaryChartType) !== null && _d !== void 0 ? _d : VisualizationTypes.COLUMN;
        let newReferencePoint = Object.assign(Object.assign({}, clonedReferencePoint), { properties, uiConfig: this.getUiConfig() });
        this.defaultControlsProperties = {
            stackMeasures: this.isStackMeasuresByDefault(),
        };
        this.configureBuckets(newReferencePoint);
        newReferencePoint = setSecondaryMeasures(newReferencePoint, this.secondaryAxis);
        this.axis = (_f = (_e = newReferencePoint === null || newReferencePoint === void 0 ? void 0 : newReferencePoint.uiConfig) === null || _e === void 0 ? void 0 : _e.axis) !== null && _f !== void 0 ? _f : AXIS.PRIMARY;
        this.supportedPropertiesList = this.getSupportedPropertiesList();
        newReferencePoint = setComboChartUiConfig(newReferencePoint, this.intl, this.type);
        newReferencePoint = configurePercent(newReferencePoint, this.isPercentDisabled(newReferencePoint));
        newReferencePoint = configureOverTimeComparison(newReferencePoint, !!this.featureFlags["enableWeekFilters"]);
        newReferencePoint = getReferencePointWithSupportedProperties(newReferencePoint, this.supportedPropertiesList);
        newReferencePoint = applyUiConfig(newReferencePoint);
        if (!this.featureFlags.enableChartsSorting) {
            newReferencePoint = removeSort(newReferencePoint);
        }
        return Promise.resolve(sanitizeFilters(newReferencePoint));
    }
    isStackMeasuresByDefault() {
        return isAreaChart(this.primaryChartType);
    }
    configureBuckets(extReferencePoint) {
        var _a, _b, _c, _d, _e, _f, _g;
        const buckets = (_a = extReferencePoint === null || extReferencePoint === void 0 ? void 0 : extReferencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        const attributes = getAllAttributeItemsWithPreference(buckets, [
            BucketNames.TREND,
            BucketNames.VIEW,
        ]).slice(0, 1);
        let measures = [];
        let secondaryMeasures = [];
        // ref. point has both my buckets -> reuse them fully
        if (hasBucket(buckets, BucketNames.MEASURES) && hasBucket(buckets, BucketNames.SECONDARY_MEASURES)) {
            measures = getBucketItemsByType(buckets, BucketNames.MEASURES, [METRIC]);
            secondaryMeasures = getBucketItemsByType(buckets, BucketNames.SECONDARY_MEASURES, [METRIC]);
            const restMeasures = getBucketItemsWithExcludeByType(buckets, [BucketNames.MEASURES, BucketNames.SECONDARY_MEASURES], [METRIC]);
            secondaryMeasures = secondaryMeasures.concat(restMeasures);
        }
        else {
            // transform from dual axis chart to combo chart
            const allMeasures = getMeasureItems(buckets);
            secondaryMeasures = getAllMeasuresShowOnSecondaryAxis(buckets);
            measures = without(allMeasures, ...secondaryMeasures);
        }
        const isDualAxisEnabled = isDualAxisOrSomeSecondaryAxisMeasure(extReferencePoint, secondaryMeasures);
        set(extReferencePoint, PROPERTY_CONTROLS_DUAL_AXIS, isDualAxisEnabled);
        const primaryChartType = (_d = (_c = (_b = extReferencePoint === null || extReferencePoint === void 0 ? void 0 : extReferencePoint.properties) === null || _b === void 0 ? void 0 : _b.controls) === null || _c === void 0 ? void 0 : _c.primaryChartType) !== null && _d !== void 0 ? _d : VisualizationTypes.COLUMN;
        const secondaryChartType = (_g = (_f = (_e = extReferencePoint === null || extReferencePoint === void 0 ? void 0 : extReferencePoint.properties) === null || _e === void 0 ? void 0 : _e.controls) === null || _f === void 0 ? void 0 : _f.secondaryChartType) !== null && _g !== void 0 ? _g : VisualizationTypes.LINE;
        set(extReferencePoint, BUCKETS, [
            {
                localIdentifier: BucketNames.MEASURES,
                items: setMeasuresShowOnSecondaryAxis(measures, false),
                chartType: primaryChartType,
            },
            {
                localIdentifier: BucketNames.SECONDARY_MEASURES,
                items: setMeasuresShowOnSecondaryAxis(secondaryMeasures, isDualAxisEnabled),
                chartType: secondaryChartType,
            },
            {
                localIdentifier: BucketNames.VIEW,
                items: attributes,
            },
        ]);
    }
    configureChartTypes(referencePoint) {
        var _a, _b, _c, _d, _e, _f, _g;
        const buckets = (_a = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        const controls = (_c = (_b = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.properties) === null || _b === void 0 ? void 0 : _b.controls) !== null && _c !== void 0 ? _c : {};
        const primaryChartType = (_e = (_d = findBucket(buckets, BucketNames.MEASURES)) === null || _d === void 0 ? void 0 : _d.chartType) !== null && _e !== void 0 ? _e : (controls.primaryChartType || VisualizationTypes.COLUMN);
        const secondaryChartType = (_g = (_f = findBucket(buckets, BucketNames.SECONDARY_MEASURES)) === null || _f === void 0 ? void 0 : _f.chartType) !== null && _g !== void 0 ? _g : (controls.secondaryChartType || VisualizationTypes.LINE);
        if (primaryChartType || secondaryChartType) {
            return Object.assign(Object.assign({}, referencePoint.properties), { controls: Object.assign(Object.assign({}, controls), { primaryChartType,
                    secondaryChartType }) });
        }
        return referencePoint.properties;
    }
    isPercentDisabled(extReferencePoint) {
        var _a;
        if (this.axis === AXIS.DUAL) {
            return false;
        }
        const buckets = (_a = extReferencePoint === null || extReferencePoint === void 0 ? void 0 : extReferencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        const primaryMasterMeasures = getMasterMeasuresCount(buckets, BucketNames.MEASURES);
        const secondaryMasterMeasures = getMasterMeasuresCount(buckets, BucketNames.SECONDARY_MEASURES);
        // disable percent if there is more than one measure on primary/secondary y-axis
        return primaryMasterMeasures + secondaryMasterMeasures > 1;
    }
    isDataPointsControlDisabled(insight) {
        const measureBucketsOfNonColumnCharts = [
            [this.primaryChartType, BucketNames.MEASURES],
            [this.secondaryChartType, BucketNames.SECONDARY_MEASURES],
        ]
            .filter(([chartType]) => chartType !== VisualizationTypes.COLUMN)
            .map(([, bucketId]) => insightBuckets(insight, bucketId));
        return (measureBucketsOfNonColumnCharts.length === 0 ||
            measureBucketsOfNonColumnCharts.every((bucket) => bucketsIsEmpty(bucket)));
    }
    getDefaultAndAvailableSort(buckets) {
        const measures = getBucketItemsByType(buckets, BucketNames.MEASURES, [METRIC]);
        const secondaryMeasures = getBucketItemsByType(buckets, BucketNames.SECONDARY_MEASURES, [METRIC]);
        const viewBy = getBucketItems(buckets, BucketNames.VIEW);
        const defaultSort = viewBy.map((vb) => newAttributeSort(vb.localIdentifier, "asc"));
        if (!isEmpty(viewBy) && (!isEmpty(measures) || !isEmpty(secondaryMeasures))) {
            const mergedMeasures = [...measures, ...secondaryMeasures];
            return {
                defaultSort,
                availableSorts: [
                    newAvailableSortsGroup(viewBy[0].localIdentifier, mergedMeasures.map((m) => m.localIdentifier), true, mergedMeasures.length > 1),
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
        const measures = getBucketItemsByType(buckets, BucketNames.MEASURES, [METRIC]);
        const secondaryMeasures = getBucketItemsByType(buckets, BucketNames.SECONDARY_MEASURES, [METRIC]);
        const viewBy = getBucketItems(buckets, BucketNames.VIEW);
        const disabled = viewBy.length < 1 ||
            availableSorts.length === 0 ||
            (measures.length < 1 && secondaryMeasures.length < 1);
        const disabledExplanation = getCustomSortDisabledExplanation([...measures, ...secondaryMeasures], viewBy, this.intl);
        return {
            disabled,
            disabledExplanation,
        };
    }
    getSortConfig(referencePoint) {
        const { buckets, properties, availableSorts: previousAvailableSorts } = referencePoint;
        const { defaultSort, availableSorts } = this.getDefaultAndAvailableSort(buckets);
        const { disabled, disabledExplanation } = this.isSortDisabled(referencePoint, availableSorts);
        return Promise.resolve(Object.assign({ supported: true, disabled, appliedSort: super.reuseCurrentSort(previousAvailableSorts, properties, availableSorts, defaultSort), defaultSort,
            availableSorts }, (disabledExplanation && { disabledExplanation })));
    }
    renderConfigurationPanel(insight) {
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            this.renderFun(React.createElement(LineChartBasedConfigurationPanel, { locale: this.locale, references: this.references, properties: this.visualizationProperties, propertiesMeta: this.propertiesMeta, insight: insight, colors: this.colors, pushData: this.handlePushData, type: this.type, isError: this.getIsError(), isLoading: this.isLoading, featureFlags: this.featureFlags, axis: this.axis, panelConfig: {
                    isDataPointsControlDisabled: this.isDataPointsControlDisabled(insight),
                }, dataLabelDefaultValue: "auto" }), configPanelElement);
        }
    }
}
//# sourceMappingURL=PluggableComboChart.js.map