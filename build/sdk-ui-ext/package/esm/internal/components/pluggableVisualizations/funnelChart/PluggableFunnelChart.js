// (C) 2019-2022 GoodData Corporation
import React from "react";
import { PluggablePieChart } from "../pieChart/PluggablePieChart";
import { setFunnelChartUiConfig } from "../../../utils/uiConfigHelpers/funnelChartUiConfigHelper";
import UnsupportedConfigurationPanel from "../../configurationPanels/UnsupportedConfigurationPanel";
import { VisualizationTypes } from "@gooddata/sdk-ui";
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
 * The PluggableFunnelChart does not use any sorts.
 *
 */
export class PluggableFunnelChart extends PluggablePieChart {
    constructor(props) {
        super(props);
        this.type = VisualizationTypes.FUNNEL;
    }
    getExtendedReferencePoint(referencePoint) {
        return super.getExtendedReferencePoint(referencePoint).then(setFunnelChartUiConfig);
    }
    renderConfigurationPanel() {
        var _a;
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            const properties = (_a = this.visualizationProperties) !== null && _a !== void 0 ? _a : {};
            this.renderFun(React.createElement(UnsupportedConfigurationPanel, { locale: this.locale, pushData: this.pushData, properties: properties }), configPanelElement);
        }
    }
    getSortConfig(_referencePoint) {
        return Promise.resolve({
            defaultSort: [],
            availableSorts: [],
            supported: false,
            disabled: false,
        });
    }
}
//# sourceMappingURL=PluggableFunnelChart.js.map