// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import ConfigSubsection from "./ConfigSubsection.js";
import DropdownControl from "./DropdownControl.js";
import { getTranslatedDropdownItems } from "../../utils/translations.js";
import { pushpinSizeDropdownItems } from "../../constants/dropdowns.js";
import { messages } from "../../../locales.js";
function getPushpinProperty(props) {
    var _a, _b, _c;
    const { minSize = "default", maxSize = "default" } = (_c = (_b = (_a = props.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b.points) !== null && _c !== void 0 ? _c : {};
    return {
        minSize,
        maxSize,
    };
}
function PushpinSizeControl(props) {
    const { minSize, maxSize } = getPushpinProperty(props);
    const { disabled, properties, pushData, intl } = props;
    const items = getTranslatedDropdownItems(pushpinSizeDropdownItems, intl);
    return (React.createElement(ConfigSubsection, { title: messages.pointsSizeTitle.id },
        React.createElement(DropdownControl, { value: minSize, valuePath: "points.minSize", labelText: messages.pointsSizeMinTitle.id, disabled: disabled, showDisabledMessage: disabled, properties: properties, pushData: pushData, items: items }),
        React.createElement(DropdownControl, { value: maxSize, valuePath: "points.maxSize", labelText: messages.pointsSizeMaxTitle.id, disabled: disabled, showDisabledMessage: disabled, properties: properties, pushData: pushData, items: items })));
}
export default injectIntl(PushpinSizeControl);
//# sourceMappingURL=PushpinSizeControl.js.map