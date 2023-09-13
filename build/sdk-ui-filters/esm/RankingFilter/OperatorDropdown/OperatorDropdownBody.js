// (C) 2020 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { Overlay } from "@gooddata/sdk-ui-kit";
import { OperatorDropdownItem } from "./OperatorDropdownItem.js";
const OperatorDropdownBodyComponent = ({ items, selectedValue, onSelect, onClose, intl, }) => {
    return (React.createElement(Overlay, { closeOnOutsideClick: true, alignTo: ".gd-rf-operator-dropdown-button", alignPoints: [{ align: "bl tl" }, { align: "tl bl" }], onClose: onClose },
        React.createElement("div", { className: "gd-dropdown overlay gd-rf-inner-overlay-dropdown gd-rf-operator-dropdown-body s-rf-operator-dropdown-body" }, items.map(({ value, translationId }) => {
            const title = intl.formatMessage({ id: translationId });
            return (React.createElement(OperatorDropdownItem, { key: value, title: title, value: value, isSelected: value === selectedValue, onSelect: onSelect }));
        }))));
};
export const OperatorDropdownBody = injectIntl(OperatorDropdownBodyComponent);
//# sourceMappingURL=OperatorDropdownBody.js.map