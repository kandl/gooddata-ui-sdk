// (C) 2019-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import cx from "classnames";
import ConfigurationPanelContent from "./ConfigurationPanelContent";
import LabelSubsection from "../configurationControls/axis/LabelSubsection";
import NameSubsection from "../configurationControls/axis/NameSubsection";
import ConfigSection from "../configurationControls/ConfigSection";
import CheckboxControl from "../configurationControls/CheckboxControl";
import MinMaxControl from "../configurationControls//MinMaxControl";
import { SHOW_DELAY_DEFAULT, HIDE_DELAY_DEFAULT, BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y, } from "../../constants/bubble";
import { countItemsOnAxes } from "../pluggableVisualizations/baseChart/insightIntrospection";
import { messages } from "../../../locales";
export default class BulletChartConfigurationPanel extends ConfigurationPanelContent {
    renderConfigurationPanel() {
        const { featureFlags, propertiesMeta, properties, pushData, type, insight } = this.props;
        const controls = (properties === null || properties === void 0 ? void 0 : properties.controls) || {};
        const { xaxis, yaxis, grid } = controls;
        const xAxisVisible = xaxis && typeof xaxis.visible !== "undefined" ? xaxis.visible : true;
        const yAxisVisible = yaxis && typeof yaxis.visible !== "undefined" ? yaxis.visible : true;
        const gridEnabled = grid && typeof grid.enabled !== "undefined" ? grid.enabled : true;
        const controlsDisabled = this.isControlDisabled();
        const { xaxis: itemsOnXAxis, yaxis: itemsOnYAxis } = countItemsOnAxes(type, controls, insight);
        const xAxisNameSectionDisabled = controlsDisabled || itemsOnXAxis !== 1;
        const isNameSubsectionVisible = featureFlags.enableAxisNameConfiguration;
        const isAxisLabelsFormatEnabled = featureFlags.enableAxisLabelFormat;
        const isAxisNameViewByTwoAttributesEnabled = featureFlags.enableAxisNameViewByTwoAttributes;
        const yAxisNameSubsectionDisabled = isAxisNameViewByTwoAttributesEnabled
            ? controlsDisabled || itemsOnYAxis === 0
            : controlsDisabled || itemsOnYAxis !== 1;
        return (React.createElement(BubbleHoverTrigger, { showDelay: SHOW_DELAY_DEFAULT, hideDelay: HIDE_DELAY_DEFAULT },
            React.createElement("div", null,
                this.renderColorSection(),
                React.createElement(ConfigSection, { id: "xaxis_section", title: messages.xaxisTitle.id, valuePath: "xaxis.visible", canBeToggled: true, toggledOn: xAxisVisible, toggleDisabled: controlsDisabled, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
                    isNameSubsectionVisible ? (React.createElement(NameSubsection, { disabled: xAxisNameSectionDisabled, configPanelDisabled: controlsDisabled, axis: "xaxis", properties: properties, pushData: pushData })) : null,
                    React.createElement(LabelSubsection, { disabled: controlsDisabled, configPanelDisabled: controlsDisabled, axis: "xaxis", properties: properties, pushData: pushData, showFormat: isAxisLabelsFormatEnabled }),
                    this.renderMinMax("xaxis")),
                React.createElement(ConfigSection, { id: "yaxis_section", title: messages.yaxisTitle.id, valuePath: "yaxis.visible", canBeToggled: true, toggledOn: yAxisVisible, toggleDisabled: controlsDisabled, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
                    isNameSubsectionVisible ? (React.createElement(NameSubsection, { disabled: yAxisNameSubsectionDisabled, configPanelDisabled: controlsDisabled, axis: "yaxis", properties: properties, pushData: pushData })) : null,
                    React.createElement(LabelSubsection, { disabled: controlsDisabled || itemsOnYAxis === 0, configPanelDisabled: controlsDisabled, axis: "yaxis", properties: properties, pushData: pushData })),
                this.renderLegendSection(),
                React.createElement(ConfigSection, { id: "canvas_section", title: messages.canvasTitle.id, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
                    React.createElement(CheckboxControl, { valuePath: "grid.enabled", labelText: messages.canvasGridLine.id, properties: properties, checked: gridEnabled, disabled: controlsDisabled, pushData: pushData }))),
            React.createElement(Bubble, { className: this.getBubbleClassNames(), arrowOffsets: { "tc bc": [BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y] }, alignPoints: [{ align: "tc bc" }] },
                React.createElement(FormattedMessage, { id: "properties.config.not_applicable" }))));
    }
    renderMinMax(basePath) {
        const { pushData, properties, propertiesMeta } = this.props;
        return (React.createElement(MinMaxControl, { isDisabled: this.isControlDisabled(), basePath: basePath, pushData: pushData, properties: properties, propertiesMeta: propertiesMeta }));
    }
    getBubbleClassNames() {
        return cx("bubble-primary", {
            invisible: !this.isControlDisabled(),
        });
    }
}
//# sourceMappingURL=BulletChartConfigurationPanel.js.map