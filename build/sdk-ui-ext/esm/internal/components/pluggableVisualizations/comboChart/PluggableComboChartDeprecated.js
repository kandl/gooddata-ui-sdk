// (C) 2019-2022 GoodData Corporation
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import React from "react";
import { BUCKETS, METRIC } from "../../../constants/bucket.js";
import { COMBO_CHART_UICONFIG_DEPRECATED } from "../../../constants/uiConfig.js";
import { configureOverTimeComparison, configurePercent } from "../../../utils/bucketConfig.js";
import { applyUiConfig, getAllAttributeItemsWithPreference, getAllItemsByType, getBucketItemsByType, getBucketItemsWithExcludeByType, getFirstMasterWithDerived, hasBucket, sanitizeFilters, } from "../../../utils/bucketHelper.js";
import { removeSort } from "../../../utils/sort.js";
import { setComboChartUiConfigDeprecated } from "../../../utils/uiConfigHelpers/comboChartUiConfigHelperDeprecated.js";
import UnsupportedConfigurationPanel from "../../configurationPanels/UnsupportedConfigurationPanel.js";
import { PluggableBaseChart } from "../baseChart/PluggableBaseChart.js";
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import without from "lodash/without.js";
export class PluggableComboChartDeprecated extends PluggableBaseChart {
    constructor(props) {
        super(props);
        this.type = VisualizationTypes.COMBO;
        this.supportedPropertiesList = [];
        this.initializeProperties(props.visualizationProperties);
    }
    getExtendedReferencePoint(referencePoint) {
        var _a;
        const clonedReferencePoint = cloneDeep(referencePoint);
        let newReferencePoint = Object.assign(Object.assign({}, clonedReferencePoint), { uiConfig: cloneDeep(COMBO_CHART_UICONFIG_DEPRECATED) });
        const buckets = (_a = clonedReferencePoint === null || clonedReferencePoint === void 0 ? void 0 : clonedReferencePoint.buckets) !== null && _a !== void 0 ? _a : [];
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
            secondaryMeasures.push(...restMeasures);
        }
        else {
            // take all measures, first and its derived to primary, rest to secondary
            const allMeasures = getAllItemsByType(buckets, [METRIC]);
            measures = getFirstMasterWithDerived(allMeasures);
            secondaryMeasures = without(allMeasures, ...measures);
        }
        set(newReferencePoint, BUCKETS, [
            {
                localIdentifier: BucketNames.MEASURES,
                items: measures,
            },
            {
                localIdentifier: BucketNames.SECONDARY_MEASURES,
                items: secondaryMeasures,
            },
            {
                localIdentifier: BucketNames.VIEW,
                items: attributes,
            },
        ]);
        newReferencePoint = setComboChartUiConfigDeprecated(newReferencePoint, this.intl, this.type);
        newReferencePoint = configurePercent(newReferencePoint, false);
        newReferencePoint = configureOverTimeComparison(newReferencePoint, !!this.featureFlags["enableWeekFilters"]);
        newReferencePoint = applyUiConfig(newReferencePoint);
        newReferencePoint = removeSort(newReferencePoint);
        return Promise.resolve(sanitizeFilters(newReferencePoint));
    }
    renderConfigurationPanel() {
        var _a;
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            const properties = (_a = this.visualizationProperties) !== null && _a !== void 0 ? _a : {};
            this.renderFun(React.createElement(UnsupportedConfigurationPanel, { locale: this.locale, pushData: this.pushData, properties: properties }), configPanelElement);
        }
        return null;
    }
}
//# sourceMappingURL=PluggableComboChartDeprecated.js.map