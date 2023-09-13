// (C) 2019-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import cx from "classnames";
import NameSubsection from "../configurationControls/axis/NameSubsection.js";
import ConfigurationPanelContent from "./ConfigurationPanelContent.js";
import ConfigSection from "../configurationControls/ConfigSection.js";
import DataLabelsControl from "../configurationControls/DataLabelsControl.js";
import { SHOW_DELAY_DEFAULT, HIDE_DELAY_DEFAULT, BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y, } from "../../constants/bubble.js";
import LabelSubsection from "../configurationControls/axis/LabelSubsection.js";
import { noRowsAndHasOneMeasure, noColumnsAndHasOneMeasure } from "../../utils/bucketHelper.js";
import { insightBuckets } from "@gooddata/sdk-model";
import { messages } from "../../../locales.js";
export default class HeatMapConfigurationPanel extends ConfigurationPanelContent {
    renderConfigurationPanel() {
        const { featureFlags, propertiesMeta, properties, pushData } = this.props;
        const { xAxisVisible, yAxisVisible } = this.getControlProperties();
        const controlsDisabled = this.isControlDisabled();
        const xAxisDisabled = this.isAxisDisabled(controlsDisabled, "xaxis", this.props.insight);
        const yAxisDisabled = this.isAxisDisabled(controlsDisabled, "yaxis", this.props.insight);
        const isNameSubsectionVisible = featureFlags.enableAxisNameConfiguration;
        return (React.createElement(BubbleHoverTrigger, { showDelay: SHOW_DELAY_DEFAULT, hideDelay: HIDE_DELAY_DEFAULT },
            React.createElement("div", null,
                this.renderColorSection(),
                React.createElement(ConfigSection, { id: "xaxis_section", title: messages.xaxisTitle.id, valuePath: "xaxis.visible", canBeToggled: true, toggledOn: xAxisVisible, toggleDisabled: xAxisDisabled, showDisabledMessage: !controlsDisabled && xAxisDisabled, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
                    isNameSubsectionVisible ? (React.createElement(NameSubsection, { disabled: xAxisDisabled, configPanelDisabled: controlsDisabled, axis: "xaxis", properties: properties, pushData: pushData })) : null,
                    React.createElement(LabelSubsection, { disabled: xAxisDisabled, configPanelDisabled: controlsDisabled, axis: "xaxis", properties: properties, pushData: pushData })),
                React.createElement(ConfigSection, { id: "yaxis_section", title: messages.yaxisTitle.id, valuePath: "yaxis.visible", canBeToggled: true, toggledOn: yAxisVisible, toggleDisabled: yAxisDisabled, showDisabledMessage: !controlsDisabled && yAxisDisabled, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
                    isNameSubsectionVisible ? (React.createElement(NameSubsection, { disabled: yAxisDisabled, configPanelDisabled: controlsDisabled, axis: "yaxis", properties: properties, pushData: pushData })) : null,
                    React.createElement(LabelSubsection, { disabled: yAxisDisabled, configPanelDisabled: controlsDisabled, axis: "yaxis", properties: properties, pushData: pushData })),
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
    getControlProperties() {
        var _a, _b, _c, _d, _e;
        const propertiesControls = (_a = this.props.properties) === null || _a === void 0 ? void 0 : _a.controls;
        const xAxisVisible = (_c = (_b = propertiesControls === null || propertiesControls === void 0 ? void 0 : propertiesControls.xaxis) === null || _b === void 0 ? void 0 : _b.visible) !== null && _c !== void 0 ? _c : true;
        const yAxisVisible = (_e = (_d = propertiesControls === null || propertiesControls === void 0 ? void 0 : propertiesControls.yaxis) === null || _d === void 0 ? void 0 : _d.visible) !== null && _e !== void 0 ? _e : true;
        return {
            xAxisVisible,
            yAxisVisible,
        };
    }
    isAxisDisabled(controlsDisabled, axis, insight) {
        const isAxisDisabled = axis === "xaxis"
            ? noColumnsAndHasOneMeasure(insightBuckets(insight))
            : noRowsAndHasOneMeasure(insightBuckets(insight));
        return Boolean(controlsDisabled || isAxisDisabled);
    }
}
//# sourceMappingURL=HeatMapConfigurationPanel.js.map