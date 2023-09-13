// (C) 2023 GoodData Corporation
import React from "react";
import cloneDeep from "lodash/cloneDeep.js";
import { VisualizationTypes } from "@gooddata/sdk-ui";
import { PluggableBaseChart } from "../baseChart/PluggableBaseChart.js";
import { DEFAULT_SANKEY_UI_CONFIG } from "../../../constants/uiConfig.js";
import { removeAllArithmeticMeasuresFromDerived, removeAllDerivedMeasures, sanitizeFilters, } from "../../../utils/bucketHelper.js";
import { configBuckets, configSankeyUiConfig, } from "../../../utils/uiConfigHelpers/sankeyChartUiConfigHelper.js";
import SankeyChartConfigurationPanel from "../../configurationPanels/SankeyChartConfigurationPanel.js";
import { configureOverTimeComparison, configurePercent } from "../../../utils/bucketConfig.js";
import { SANKEY_CHART_SUPPORTED_PROPERTIES } from "../../../constants/supportedProperties.js";
/**
 * PluggableSankeyChart
 *
 * ## Buckets
 *
 * | Name              | Id             | Accepts             |
 * |-------------------|----------------|---------------------|
 * | Measure           | measure        | measures only       |
 * | Attribute ( From )| attribute_from | attribute or date |
 * | Attribute ( To )  | attribute_to   | attribute or date |
 *
 * ### Bucket axioms
 *
 * - |Measure           | = 1
 * - |Attribute ( From )| ≤ 1
 * - |Attribute ( To )  | ≤ 1
 *
 * ## Dimensions
 *
 * The PluggableSankeyChart always creates the same two dimensional execution.
 *
 * - ⊤ ⇒ [[MeasureGroupIdentifier], compact([attributeFrom, attributeTo])]
 *
 * ## Sorts
 *
 * The PluggableSankeyChart does not use any sorts.
 */
export class PluggableSankeyChart extends PluggableBaseChart {
    constructor(params) {
        super(params);
        this.type = VisualizationTypes.SANKEY;
    }
    getExtendedReferencePoint(referencePoint) {
        const enableWeekFilters = !!this.featureFlags["enableWeekFilters"];
        let extendedReferencePoint = Object.assign(Object.assign({}, cloneDeep(referencePoint)), { uiConfig: cloneDeep(DEFAULT_SANKEY_UI_CONFIG) });
        extendedReferencePoint = removeAllArithmeticMeasuresFromDerived(extendedReferencePoint);
        extendedReferencePoint = removeAllDerivedMeasures(extendedReferencePoint);
        extendedReferencePoint = configBuckets(extendedReferencePoint);
        extendedReferencePoint = configurePercent(extendedReferencePoint, false);
        extendedReferencePoint = configureOverTimeComparison(extendedReferencePoint, enableWeekFilters);
        extendedReferencePoint = configSankeyUiConfig(extendedReferencePoint, this.intl, this.type);
        return Promise.resolve(sanitizeFilters(extendedReferencePoint));
    }
    getSupportedPropertiesList() {
        return SANKEY_CHART_SUPPORTED_PROPERTIES;
    }
    renderConfigurationPanel(insight) {
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            this.renderFun(React.createElement(SankeyChartConfigurationPanel, { locale: this.locale, references: this.references, properties: this.visualizationProperties, propertiesMeta: this.propertiesMeta, insight: insight, colors: this.colors, pushData: this.handlePushData, type: this.type, isError: this.getIsError(), isLoading: this.isLoading, featureFlags: this.featureFlags }), configPanelElement);
        }
        return null;
    }
}
//# sourceMappingURL=PluggableSankeyChart.js.map