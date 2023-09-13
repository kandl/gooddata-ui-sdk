// (C) 2019-2022 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import { Dropdown, DropdownButton } from "@gooddata/sdk-ui-kit";
import DrillOriginSelectorBody from "./DrillOriginSelectorBody.js";
const DROPDOWN_ALIGN_POINTS = [
    {
        align: "bl tl",
        offset: {
            x: 0,
            y: 4,
        },
    },
    {
        align: "tl bl",
        offset: {
            x: 0,
            y: -4,
        },
    },
];
export const DrillOriginSelector = (props) => {
    var _a, _b;
    const { items } = props;
    const onSelect = (selected) => {
        props.onSelect(selected);
    };
    const intl = useIntl();
    if (!((_a = items.measures) === null || _a === void 0 ? void 0 : _a.length) && !((_b = items.attributes) === null || _b === void 0 ? void 0 : _b.length)) {
        return null;
    }
    return (React.createElement(Dropdown, { className: "gd-drill-origin-selector", closeOnParentScroll: true, closeOnMouseDrag: false, closeOnOutsideClick: true, alignPoints: DROPDOWN_ALIGN_POINTS, renderButton: ({ isOpen, toggleDropdown }) => (React.createElement(DropdownButton, { value: intl.formatMessage({ id: "configurationPanel.drillConfig.addInteraction" }), iconLeft: "gd-icon-add", className: "s-drill-show-measures customizable", isOpen: isOpen, onClick: toggleDropdown })), renderBody: ({ closeDropdown }) => (React.createElement(DrillOriginSelectorBody, { supportedItems: items, onSelect: onSelect, onCloseDropdown: closeDropdown })) }));
};
//# sourceMappingURL=DrillOriginSelector.js.map