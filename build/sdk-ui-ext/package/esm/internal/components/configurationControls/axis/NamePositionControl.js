// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import DropdownControl from "../DropdownControl";
import { getTranslatedDropdownItems } from "../../../utils/translations";
import { xAxisPositionDropdownItems, yAxisPositionDropdownItems } from "../../../constants/dropdowns";
import { messages } from "../../../../locales";
class NamePositionControl extends React.PureComponent {
    render() {
        const { axisVisible, axisNameVisible, namePosition } = this.getControlProperties();
        const { axis, properties, pushData, disabled, configPanelDisabled, intl } = this.props;
        const isDisabled = disabled || !axisVisible || !axisNameVisible;
        const items = getTranslatedDropdownItems(this.isXAxis() ? xAxisPositionDropdownItems : yAxisPositionDropdownItems, intl);
        return (React.createElement(DropdownControl, { value: namePosition, valuePath: `${axis}.name.position`, labelText: messages.axisNamePosition.id, disabled: isDisabled, showDisabledMessage: !configPanelDisabled && isDisabled, properties: properties, pushData: pushData, items: items }));
    }
    isXAxis() {
        const { axis } = this.props;
        return axis === "xaxis" || axis === "secondary_xaxis";
    }
    getControlProperties() {
        var _a, _b, _c, _d, _e, _f, _g;
        const axisProperties = (_b = (_a = this.props.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b[this.props.axis];
        const axisVisible = (_c = axisProperties === null || axisProperties === void 0 ? void 0 : axisProperties.visible) !== null && _c !== void 0 ? _c : true;
        const axisNameVisible = (_e = (_d = axisProperties === null || axisProperties === void 0 ? void 0 : axisProperties.name) === null || _d === void 0 ? void 0 : _d.visible) !== null && _e !== void 0 ? _e : true;
        const namePosition = (_g = (_f = axisProperties === null || axisProperties === void 0 ? void 0 : axisProperties.name) === null || _f === void 0 ? void 0 : _f.position) !== null && _g !== void 0 ? _g : "auto";
        return {
            axisVisible,
            axisNameVisible,
            namePosition,
        };
    }
}
export default injectIntl(NamePositionControl);
//# sourceMappingURL=NamePositionControl.js.map