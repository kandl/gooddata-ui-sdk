// (C) 2019-2023 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import ConfigSection from "../configurationControls/ConfigSection.js";
import CheckboxControl from "../configurationControls/CheckboxControl.js";
import ContinuousLineControl from "../configurationControls/ContinuousLineControl.js";
import DataLabelsControl from "../configurationControls/DataLabelsControl.js";
import DataPointsControl from "../configurationControls/DataPointsControl.js";
import { SHOW_DELAY_DEFAULT, HIDE_DELAY_DEFAULT, BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y, } from "../../constants/bubble.js";
import BaseChartConfigurationPanel from "./BaseChartConfigurationPanel.js";
import { messages } from "../../../locales.js";
export default class LineChartBasedConfigurationPanel extends BaseChartConfigurationPanel {
    renderConfigurationPanel() {
        var _a, _b;
        const { gridEnabled, axes } = this.getControlProperties();
        const { featureFlags, properties, propertiesMeta, pushData, panelConfig, dataLabelDefaultValue = false, } = this.props;
        const { isDataPointsControlDisabled, isContinuousLineControlDisabled } = panelConfig;
        const controlsDisabled = this.isControlDisabled();
        const continuousLineEnabled = (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.continuousLine) === null || _b === void 0 ? void 0 : _b.enabled;
        const shouldContinuousLineControlDisabled = controlsDisabled || isContinuousLineControlDisabled;
        return (React.createElement(BubbleHoverTrigger, { showDelay: SHOW_DELAY_DEFAULT, hideDelay: HIDE_DELAY_DEFAULT },
            React.createElement("div", null,
                this.renderColorSection(),
                this.getBaseChartAxisSection(axes),
                this.renderLegendSection(),
                React.createElement(ConfigSection, { id: "canvas_section", className: "gd-canvas-section", title: messages.canvasTitle.id, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
                    React.createElement(DataLabelsControl, { pushData: pushData, properties: properties, isDisabled: controlsDisabled, defaultValue: dataLabelDefaultValue }),
                    featureFlags["enableHidingOfDataPoints"] ? (React.createElement(DataPointsControl, { pushData: pushData, properties: properties, isDisabled: controlsDisabled || isDataPointsControlDisabled, showDisabledMessage: isDataPointsControlDisabled })) : null,
                    React.createElement(CheckboxControl, { valuePath: "grid.enabled", labelText: messages.canvasGridLine.id, properties: properties, checked: gridEnabled, disabled: controlsDisabled, pushData: pushData }),
                    React.createElement(ContinuousLineControl, { properties: properties, checked: !shouldContinuousLineControlDisabled ? continuousLineEnabled : false, disabled: shouldContinuousLineControlDisabled, pushData: pushData }))),
            React.createElement(Bubble, { className: this.getBubbleClassNames(), arrowOffsets: { "tc bc": [BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y] }, alignPoints: [{ align: "tc bc" }] },
                React.createElement(FormattedMessage, { id: "properties.config.not_applicable" }))));
    }
}
//# sourceMappingURL=LineChartBasedConfigurationPanel.js.map