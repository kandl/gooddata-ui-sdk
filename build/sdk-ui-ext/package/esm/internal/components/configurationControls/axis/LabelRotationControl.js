// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import DropdownControl from "../DropdownControl";
import { getTranslatedDropdownItems } from "../../../utils/translations";
import { rotationDropdownItems } from "../../../constants/dropdowns";
import { messages } from "../../../../locales";
class LabelRotationControl extends React.PureComponent {
    render() {
        const { axisVisible, axisLabelsEnabled, axisRotation } = this.getControlProperties();
        const isDisabled = this.props.disabled || !axisVisible || !axisLabelsEnabled;
        return (React.createElement(DropdownControl, { value: axisRotation, valuePath: `${this.props.axis}.rotation`, labelText: messages.axisRotation.id, disabled: isDisabled, showDisabledMessage: !this.props.configPanelDisabled && isDisabled, properties: this.props.properties, pushData: this.props.pushData, items: getTranslatedDropdownItems(rotationDropdownItems, this.props.intl) }));
    }
    getControlProperties() {
        var _a, _b, _c, _d, _e;
        const axisProperties = (_b = (_a = this.props.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b[this.props.axis];
        const axisVisible = (_c = axisProperties === null || axisProperties === void 0 ? void 0 : axisProperties.visible) !== null && _c !== void 0 ? _c : true;
        const axisLabelsEnabled = (_d = axisProperties === null || axisProperties === void 0 ? void 0 : axisProperties.labelsEnabled) !== null && _d !== void 0 ? _d : true;
        const axisRotation = (_e = axisProperties === null || axisProperties === void 0 ? void 0 : axisProperties.rotation) !== null && _e !== void 0 ? _e : "auto";
        return {
            axisVisible,
            axisLabelsEnabled,
            axisRotation,
        };
    }
}
export default injectIntl(LabelRotationControl);
//# sourceMappingURL=LabelRotationControl.js.map