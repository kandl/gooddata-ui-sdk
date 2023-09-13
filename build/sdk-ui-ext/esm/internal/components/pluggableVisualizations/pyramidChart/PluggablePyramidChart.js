// (C) 2019-2023 GoodData Corporation
import React from "react";
import { PluggablePieChart } from "../pieChart/PluggablePieChart.js";
import PyramidChartConfigurationPanel from "../../configurationPanels/PyramidChartConfigurationPanel.js";
import { setPyramidChartUiConfig } from "../../../utils/uiConfigHelpers/pyramidChartUiConfigHelper.js";
import { VisualizationTypes } from "@gooddata/sdk-ui";
/**
 * PluggablePyramidChart
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
 * The PluggablePyramidChart always creates two dimensional execution.
 *
 * - |ViewBy| = 0 ⇒ [[], [MeasureGroupIdentifier]]
 * - |ViewBy| = 1 ⇒ [[MeasureGroupIdentifier], [ViewBy]]
 *
 * ## Default sorts
 *
 * The PluggablePyramidChart uses the same sorts as pie chart.
 *
 */
export class PluggablePyramidChart extends PluggablePieChart {
    constructor(props) {
        super(props);
        this.type = VisualizationTypes.PYRAMID;
    }
    getExtendedReferencePoint(referencePoint) {
        return super.getExtendedReferencePoint(referencePoint).then(setPyramidChartUiConfig);
    }
    renderConfigurationPanel(insight) {
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            this.renderFun(React.createElement(PyramidChartConfigurationPanel, { locale: this.locale, properties: this.visualizationProperties, propertiesMeta: this.propertiesMeta, insight: insight, pushData: this.handlePushData, colors: this.colors, type: this.type, isError: this.getIsError(), isLoading: this.isLoading, featureFlags: this.featureFlags, references: this.references }), configPanelElement);
        }
    }
}
//# sourceMappingURL=PluggablePyramidChart.js.map