// (C) 2019-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import cx from "classnames";
import ConfigurationPanelContent from "./ConfigurationPanelContent";
import LabelSubsection from "../configurationControls/axis/LabelSubsection";
import MinMaxControl from "../configurationControls//MinMaxControl";
import ConfigSection from "../configurationControls/ConfigSection";
import DataLabelsControl from "../configurationControls/DataLabelsControl";
import CheckboxControl from "../configurationControls/CheckboxControl";
import { getMeasuresFromMdObject } from "../../utils/bucketHelper";
import { BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y, HIDE_DELAY_DEFAULT, SHOW_DELAY_DEFAULT, } from "../../constants/bubble";
import { insightHasAttributes } from "@gooddata/sdk-model";
import NameSubsection from "../configurationControls/axis/NameSubsection";
import { countItemsOnAxes } from "../pluggableVisualizations/baseChart/insightIntrospection";
import { messages } from "../../../locales";
export default class ScatterPlotConfigurationPanel extends ConfigurationPanelContent {
    isControlDisabled() {
        const { insight, isError, isLoading } = this.props;
        const measures = getMeasuresFromMdObject(insight);
        return !measures || measures.length < 1 || isError || isLoading;
    }
    renderConfigurationPanel() {
        const { xAxisVisible, gridEnabled, yAxisVisible } = this.getControlProperties();
        const { featureFlags, propertiesMeta, properties, pushData, insight, type } = this.props;
        const controls = properties === null || properties === void 0 ? void 0 : properties.controls;
        const controlsDisabled = this.isControlDisabled();
        const { xaxis: itemsOnXAxis, yaxis: itemsOnYAxis } = countItemsOnAxes(type, controls, insight);
        const xAxisNameSectionDisabled = controlsDisabled || itemsOnXAxis !== 1;
        const yAxisNameSectionDisabled = controlsDisabled || itemsOnYAxis !== 1;
        const isNameSubsectionVisible = featureFlags.enableAxisNameConfiguration;
        const isAxisLabelsFormatEnabled = featureFlags.enableAxisLabelFormat;
        return (React.createElement(BubbleHoverTrigger, { showDelay: SHOW_DELAY_DEFAULT, hideDelay: HIDE_DELAY_DEFAULT },
            React.createElement("div", null,
                this.renderColorSection(),
                React.createElement(ConfigSection, { id: "xaxis_section", title: messages.xaxisTitle.id, valuePath: "xaxis.visible", canBeToggled: true, toggledOn: xAxisVisible, toggleDisabled: controlsDisabled, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
                    isNameSubsectionVisible ? (React.createElement(NameSubsection, { disabled: xAxisNameSectionDisabled, configPanelDisabled: controlsDisabled, axis: "xaxis", properties: properties, pushData: pushData })) : null,
                    React.createElement(LabelSubsection, { disabled: controlsDisabled, configPanelDisabled: controlsDisabled, axis: "xaxis", properties: properties, pushData: pushData, showFormat: isAxisLabelsFormatEnabled }),
                    this.renderMinMax("xaxis")),
                React.createElement(ConfigSection, { id: "yaxis_section", title: messages.yaxisTitle.id, valuePath: "yaxis.visible", canBeToggled: true, toggledOn: yAxisVisible, toggleDisabled: controlsDisabled, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
                    isNameSubsectionVisible ? (React.createElement(NameSubsection, { disabled: yAxisNameSectionDisabled, configPanelDisabled: controlsDisabled, axis: "yaxis", properties: properties, pushData: pushData })) : null,
                    React.createElement(LabelSubsection, { disabled: controlsDisabled, configPanelDisabled: controlsDisabled, axis: "yaxis", properties: properties, pushData: pushData, showFormat: isAxisLabelsFormatEnabled }),
                    this.renderMinMax("yaxis")),
                React.createElement(ConfigSection, { id: "canvas_section", title: messages.canvasTitle.id, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
                    React.createElement(DataLabelsControl, { pushData: pushData, properties: properties, isDisabled: this.areDataLabelsDisabled(), defaultValue: false, showDisabledMessage: this.isDataLabelsWarningShown() }),
                    React.createElement(CheckboxControl, { valuePath: "grid.enabled", labelText: messages.canvasGridLine.id, properties: properties, checked: gridEnabled, disabled: controlsDisabled, pushData: pushData }))),
            React.createElement(Bubble, { className: this.getBubbleClassNames(), arrowOffsets: { "tc bc": [BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y] }, alignPoints: [{ align: "tc bc" }] },
                React.createElement(FormattedMessage, { id: "properties.config.not_applicable" }))));
    }
    renderMinMax(basePath) {
        const { pushData, properties, propertiesMeta } = this.props;
        return (React.createElement(MinMaxControl, { isDisabled: this.isControlDisabled(), basePath: basePath, pushData: pushData, properties: properties, propertiesMeta: propertiesMeta }));
    }
    areDataLabelsDisabled() {
        const isDisabled = super.isControlDisabled();
        return isDisabled || !insightHasAttributes(this.props.insight);
    }
    isDataLabelsWarningShown() {
        const isDisabled = super.isControlDisabled();
        return !isDisabled && !insightHasAttributes(this.props.insight);
    }
    getBubbleClassNames() {
        return cx("bubble-primary", {
            invisible: !this.isControlDisabled(),
        });
    }
    getControlProperties() {
        var _a, _b, _c, _d, _e, _f, _g;
        const propertiesControls = (_a = this.props.properties) === null || _a === void 0 ? void 0 : _a.controls;
        const xAxisVisible = (_c = (_b = propertiesControls === null || propertiesControls === void 0 ? void 0 : propertiesControls.xaxis) === null || _b === void 0 ? void 0 : _b.visible) !== null && _c !== void 0 ? _c : true;
        const yAxisVisible = (_e = (_d = propertiesControls === null || propertiesControls === void 0 ? void 0 : propertiesControls.yaxis) === null || _d === void 0 ? void 0 : _d.visible) !== null && _e !== void 0 ? _e : true;
        const gridEnabled = (_g = (_f = propertiesControls === null || propertiesControls === void 0 ? void 0 : propertiesControls.grid) === null || _f === void 0 ? void 0 : _f.enabled) !== null && _g !== void 0 ? _g : true;
        return {
            xAxisVisible,
            yAxisVisible,
            gridEnabled,
        };
    }
}
//# sourceMappingURL=ScatterPlotConfigurationPanel.js.map