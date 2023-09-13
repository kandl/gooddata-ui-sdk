// (C) 2023 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import ConfigSection from "../configurationControls/ConfigSection.js";
import CheckboxControl from "../configurationControls/CheckboxControl.js";
import DataLabelsControl from "../configurationControls/DataLabelsControl.js";
import { SHOW_DELAY_DEFAULT, HIDE_DELAY_DEFAULT, BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y, } from "../../constants/bubble.js";
import { messages } from "../../../locales.js";
import LegendSection from "../configurationControls/legend/LegendSection.js";
import TotalSection from "../configurationControls/total/TotalSection.js";
import { countItemsOnAxes } from "../pluggableVisualizations/baseChart/insightIntrospection.js";
import NameSubsection from "../configurationControls/axis/NameSubsection.js";
import LabelSubsection from "../configurationControls/axis/LabelSubsection.js";
import BaseChartConfigurationPanel from "./BaseChartConfigurationPanel.js";
import OrientationDropdownControl from "../configurationControls/OrientationDropdownControl.js";
const TOOLTIP_ARROW_OFFSET = { "tc bc": [BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y] };
const TOOLTIP_ALIGN_POINT = [{ align: "tc bc" }];
export default class WaterfallChartConfigurationPanel extends BaseChartConfigurationPanel {
    renderConfigurationPanel() {
        var _a, _b;
        const { gridEnabled, axes } = this.getControlProperties();
        const { properties, propertiesMeta, pushData, dataLabelDefaultValue = false } = this.props;
        const controlsDisabled = this.isControlDisabled();
        return (React.createElement(BubbleHoverTrigger, { showDelay: SHOW_DELAY_DEFAULT, hideDelay: HIDE_DELAY_DEFAULT },
            React.createElement("div", null,
                this.renderColorSection(),
                this.getBaseChartAxisSection(axes),
                this.renderLegendSection(),
                React.createElement(TotalSection, { controlsDisabled: controlsDisabled, properties: properties, propertiesMeta: propertiesMeta, pushData: pushData }),
                React.createElement(ConfigSection, { id: "canvas_section", className: "gd-canvas-section", title: messages.canvasTitle.id, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
                    React.createElement(OrientationDropdownControl, { pushData: pushData, properties: properties, disabled: controlsDisabled, value: ((_b = (_a = properties.controls) === null || _a === void 0 ? void 0 : _a.orientation) === null || _b === void 0 ? void 0 : _b.position) || "horizontal", showDisabledMessage: false }),
                    React.createElement(DataLabelsControl, { pushData: pushData, properties: properties, isDisabled: controlsDisabled, defaultValue: dataLabelDefaultValue }),
                    React.createElement(CheckboxControl, { valuePath: "grid.enabled", labelText: messages.canvasGridLine.id, properties: properties, checked: gridEnabled, disabled: controlsDisabled, pushData: pushData }))),
            React.createElement(Bubble, { className: this.getBubbleClassNames(), arrowOffsets: TOOLTIP_ARROW_OFFSET, alignPoints: TOOLTIP_ALIGN_POINT },
                React.createElement(FormattedMessage, { id: "properties.config.not_applicable" }))));
    }
    renderLegendSection() {
        const { properties, propertiesMeta, pushData } = this.props;
        const controlsDisabled = this.isControlDisabled();
        return (React.createElement(LegendSection, { properties: properties, propertiesMeta: propertiesMeta, controlsDisabled: controlsDisabled, defaultLegendEnabled: false, pushData: pushData }));
    }
    getBaseChartAxisSection(axes) {
        const { featureFlags, type, properties, propertiesMeta, pushData, insight } = this.props;
        const controls = properties === null || properties === void 0 ? void 0 : properties.controls;
        const controlsDisabled = this.isControlDisabled();
        const isViewedBy = this.isViewedBy();
        const itemsOnAxes = countItemsOnAxes(type, controls, insight);
        const isNameSubsectionVisible = featureFlags.enableAxisNameConfiguration;
        const isAxisLabelsFormatEnabled = featureFlags.enableAxisLabelFormat;
        const isAxisNameViewByTwoAttributesEnabled = featureFlags.enableAxisNameViewByTwoAttributes;
        return axes.map((axis) => {
            var _a;
            const isPrimaryAxis = ((_a = controls === null || controls === void 0 ? void 0 : controls.orientation) === null || _a === void 0 ? void 0 : _a.position) === "vertical" ? axis.name === "xaxis" : axis.primary;
            const isPrimaryAxisWithMoreThanOneItem = (isPrimaryAxis || !isAxisNameViewByTwoAttributesEnabled) && itemsOnAxes[axis.name] > 1;
            const nameSubsectionDisabled = !isViewedBy || isPrimaryAxisWithMoreThanOneItem;
            const { name, title, subtitle, visible } = axis;
            const showFormat = isPrimaryAxis && isAxisLabelsFormatEnabled;
            return (React.createElement(ConfigSection, { key: name, id: `${name}_section`, title: title, subtitle: subtitle, valuePath: `${name}.visible`, canBeToggled: true, toggledOn: visible, toggleDisabled: controlsDisabled, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
                isNameSubsectionVisible ? (React.createElement(NameSubsection, { disabled: nameSubsectionDisabled, configPanelDisabled: controlsDisabled, axis: axis.name, properties: properties, pushData: pushData })) : null,
                React.createElement(LabelSubsection, { disabled: false, configPanelDisabled: controlsDisabled, axis: axis.name, properties: properties, pushData: pushData, showFormat: showFormat }),
                isPrimaryAxis ? this.renderMinMax(axis.name) : null));
        });
    }
}
//# sourceMappingURL=WaterfallChartConfigurationPanel.js.map