// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import ConfigSubsection from "../../configurationControls/ConfigSubsection";
import NamePositionControl from "./NamePositionControl";
import { messages } from "../../../../locales";
class NameSubsection extends React.PureComponent {
    render() {
        const { axisVisible, axisNameVisible } = this.getControlProperties();
        const { axis, properties, pushData, disabled, configPanelDisabled } = this.props;
        return (React.createElement(ConfigSubsection, { axisType: axis, title: messages.axisName.id, valuePath: `${axis}.name.visible`, properties: properties, pushData: pushData, canBeToggled: true, toggledOn: axisNameVisible, toggleDisabled: disabled || !axisVisible, showDisabledMessage: !configPanelDisabled && disabled },
            React.createElement(NamePositionControl, { disabled: disabled, configPanelDisabled: configPanelDisabled, axis: axis, properties: properties, pushData: pushData })));
    }
    getControlProperties() {
        var _a, _b, _c, _d, _e;
        const axisProperties = (_b = (_a = this.props.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b[this.props.axis];
        const axisVisible = (_c = axisProperties === null || axisProperties === void 0 ? void 0 : axisProperties.visible) !== null && _c !== void 0 ? _c : true;
        const axisNameVisible = (_e = (_d = axisProperties === null || axisProperties === void 0 ? void 0 : axisProperties.name) === null || _d === void 0 ? void 0 : _d.visible) !== null && _e !== void 0 ? _e : true;
        return {
            axisVisible,
            axisNameVisible,
        };
    }
}
export default injectIntl(NameSubsection);
//# sourceMappingURL=NameSubsection.js.map