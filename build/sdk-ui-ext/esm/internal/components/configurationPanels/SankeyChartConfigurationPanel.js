// (C) 2023 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import ConfigurationPanelContent from "./ConfigurationPanelContent.js";
import { BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y, HIDE_DELAY_DEFAULT, SHOW_DELAY_DEFAULT, } from "../../constants/bubble.js";
import { messages } from "../../../locales.js";
import DataLabelsControl from "../configurationControls/DataLabelsControl.js";
import ConfigSection from "../configurationControls/ConfigSection.js";
import LegendSection from "../configurationControls/legend/LegendSection.js";
export default class SankeyChartConfigurationPanel extends ConfigurationPanelContent {
    renderConfigurationPanel() {
        const bubbleClassNames = cx("bubble-primary", { invisible: !this.isControlDisabled() });
        return (React.createElement(BubbleHoverTrigger, { showDelay: SHOW_DELAY_DEFAULT, hideDelay: HIDE_DELAY_DEFAULT },
            React.createElement("div", null,
                this.renderColorSection(),
                this.renderLegendSection(),
                this.renderCanvasSection()),
            React.createElement(Bubble, { className: bubbleClassNames, arrowOffsets: { "tc bc": [BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y] }, alignPoints: [{ align: "tc bc" }] },
                React.createElement(FormattedMessage, { id: "properties.config.not_applicable" }))));
    }
    renderCanvasSection() {
        const { propertiesMeta, properties, pushData } = this.props;
        const controlsDisabled = this.isControlDisabled();
        return (React.createElement(ConfigSection, { id: "canvas_section", title: messages.canvasTitle.id, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
            React.createElement(DataLabelsControl, { pushData: pushData, properties: properties, isDisabled: controlsDisabled })));
    }
    renderLegendSection() {
        const { properties, propertiesMeta, pushData } = this.props;
        const controlsDisabled = this.isControlDisabled();
        return (React.createElement(LegendSection, { properties: properties, propertiesMeta: propertiesMeta, controlsDisabled: controlsDisabled, defaultLegendEnabled: false, pushData: pushData }));
    }
}
//# sourceMappingURL=SankeyChartConfigurationPanel.js.map