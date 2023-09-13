// (C) 2019-2023 GoodData Corporation
import React from "react";
import { PluggablePieChart } from "../pieChart/PluggablePieChart.js";
import { setFunnelChartUiConfig } from "../../../utils/uiConfigHelpers/funnelChartUiConfigHelper.js";
import FunnelChartConfigurationPanel from "../../configurationPanels/FunnelChartConfigurationPanel.js";
import { VisualizationTypes } from "@gooddata/sdk-ui";
import { FUNNELCHART_SUPPORTED_PROPERTIES } from "../../../constants/supportedProperties.js";
/**
 * PluggableFunnelChart
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
 * The PluggableFunnelChart always creates two dimensional execution.
 *
 * - |ViewBy| = 0 ⇒ [[], [MeasureGroupIdentifier]]
 * - |ViewBy| = 1 ⇒ [[MeasureGroupIdentifier], [ViewBy]]
 *
 * ## Default sorts
 *
 * The PluggableFunnelChart allows the same sorts as pie chart, however it does not sort automatically.
 *
 */
export class PluggableFunnelChart extends PluggablePieChart {
    constructor(props) {
        super(props);
        this.type = VisualizationTypes.FUNNEL;
        this.supportedPropertiesList = FUNNELCHART_SUPPORTED_PROPERTIES;
    }
    getExtendedReferencePoint(referencePoint) {
        return super.getExtendedReferencePoint(referencePoint).then(setFunnelChartUiConfig);
    }
    renderConfigurationPanel(insight) {
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            this.renderFun(React.createElement(FunnelChartConfigurationPanel, { locale: this.locale, properties: this.visualizationProperties, propertiesMeta: this.propertiesMeta, insight: insight, pushData: this.handlePushData, colors: this.colors, type: this.type, isError: this.getIsError(), isLoading: this.isLoading, featureFlags: this.featureFlags, references: this.references }), configPanelElement);
        }
    }
}
//# sourceMappingURL=PluggableFunnelChart.js.map