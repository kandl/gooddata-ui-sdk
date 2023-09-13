// (C) 2019-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import cx from "classnames";
import ConfigurationPanelContent from "./ConfigurationPanelContent";
import ConfigSection from "../configurationControls/ConfigSection";
import DataLabelsControl from "../configurationControls/DataLabelsControl";
import { SHOW_DELAY_DEFAULT, HIDE_DELAY_DEFAULT, BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y, } from "../../constants/bubble";
import { messages } from "../../../locales";
export default class TreeMapConfigurationPanel extends ConfigurationPanelContent {
    renderConfigurationPanel() {
        const { propertiesMeta, properties, pushData } = this.props;
        const controlsDisabled = this.isControlDisabled();
        return (React.createElement(BubbleHoverTrigger, { showDelay: SHOW_DELAY_DEFAULT, hideDelay: HIDE_DELAY_DEFAULT },
            React.createElement("div", null,
                this.renderColorSection(),
                this.renderLegendSection(),
                React.createElement(ConfigSection, { id: "canvas_section", title: messages.canvasTitle.id, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
                    React.createElement(DataLabelsControl, { pushData: pushData, properties: properties, isDisabled: controlsDisabled, defaultValue: "auto" }))),
            React.createElement(Bubble, { className: this.getBubbleClassNames(), arrowOffsets: { "tc bc": [BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y] }, alignPoints: [{ align: "tc bc" }] },
                React.createElement(FormattedMessage, { id: "properties.config.not_applicable" }))));
    }
    getBubbleClassNames() {
        return cx("bubble-primary", {
            invisible: !this.isControlDisabled(),
        });
    }
}
//# sourceMappingURL=TreeMapConfigurationPanel.js.map