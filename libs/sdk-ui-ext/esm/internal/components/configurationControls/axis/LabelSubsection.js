// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import ConfigSubsection from "../../configurationControls/ConfigSubsection.js";
import LabelRotationControl from "./LabelRotationControl.js";
import { messages } from "../../../../locales.js";
import { LabelFormatControl } from "./LabelFormatControl.js";
class LabelSubsection extends React.PureComponent {
    render() {
        const { axisVisible, axisLabelsEnabled } = this.getControlProperties();
        return (React.createElement(ConfigSubsection, { axisType: this.props.axis, title: messages.axisLabels.id, valuePath: `${this.props.axis}.labelsEnabled`, properties: this.props.properties, pushData: this.props.pushData, canBeToggled: true, toggledOn: axisLabelsEnabled, toggleDisabled: this.props.disabled || !axisVisible, showDisabledMessage: !this.props.configPanelDisabled && this.props.disabled },
            this.props.showFormat ? (React.createElement(LabelFormatControl, { disabled: this.props.disabled, configPanelDisabled: this.props.configPanelDisabled, axis: this.props.axis, properties: this.props.properties, pushData: this.props.pushData })) : null,
            React.createElement(LabelRotationControl, { disabled: this.props.disabled, configPanelDisabled: this.props.configPanelDisabled, axis: this.props.axis, properties: this.props.properties, pushData: this.props.pushData })));
    }
    getControlProperties() {
        var _a, _b, _c, _d;
        const axisProperties = (_b = (_a = this.props.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b[this.props.axis];
        const axisVisible = (_c = axisProperties === null || axisProperties === void 0 ? void 0 : axisProperties.visible) !== null && _c !== void 0 ? _c : true;
        const axisLabelsEnabled = (_d = axisProperties === null || axisProperties === void 0 ? void 0 : axisProperties.labelsEnabled) !== null && _d !== void 0 ? _d : true;
        return {
            axisVisible,
            axisLabelsEnabled,
        };
    }
}
export default injectIntl(LabelSubsection);
//# sourceMappingURL=LabelSubsection.js.map