// (C) 2020-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import DropdownControl from "./DropdownControl.js";
import { getTranslatedDropdownItems } from "../../utils/translations.js";
import { pushpinViewportDropdownItems } from "../../constants/dropdowns.js";
import { messages } from "../../../locales.js";
function getPushpinProperty(props) {
    var _a, _b, _c;
    return (_c = (_b = (_a = props.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b.viewport) !== null && _c !== void 0 ? _c : { area: "auto" };
}
function PushpinViewportControl(props) {
    const { area } = getPushpinProperty(props);
    const { disabled, properties, pushData, intl } = props;
    return (React.createElement("div", { className: "s-pushpin-viewport-control" },
        React.createElement(DropdownControl, { value: area, valuePath: "viewport.area", labelText: messages.viewportAreaTitle.id, disabled: disabled, showDisabledMessage: disabled, properties: properties, pushData: pushData, items: getTranslatedDropdownItems(pushpinViewportDropdownItems, intl) })));
}
export default injectIntl(PushpinViewportControl);
//# sourceMappingURL=PushpinViewportControl.js.map