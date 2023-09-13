// (C) 2023 GoodData Corporation
import React from "react";
import { ConfigurationCategory } from "../ConfigurationCategory.js";
import { Dropdown, DropdownList } from "@gooddata/sdk-ui-kit";
import { SelectionModeItem } from "./SelectionModeItem.js";
import { SelectionModeButton } from "./SelectionModeButton.js";
const ITEM_HEIGHT = 23;
const DROPDOWN_WIDTH = 225;
const ALIGN_POINTS = [
    {
        align: "bl tl",
        offset: { x: 0, y: 1 },
    },
    {
        align: "tl bl",
        offset: { x: 0, y: -1 },
    },
];
export const SelectionMode = (props) => {
    const { selectionTitleText, multiSelectionOptionText, singleSelectionOptionText, singleSelectionDisabledTooltip, selectionMode, onSelectionModeChange, disabled, } = props;
    const selectionOptionTitleMap = {
        multi: multiSelectionOptionText,
        single: singleSelectionOptionText,
    };
    const items = ["multi", "single"];
    return (React.createElement(React.Fragment, null,
        React.createElement(ConfigurationCategory, { categoryTitle: selectionTitleText }),
        React.createElement("div", { className: "configuration-selection-mode" },
            React.createElement(Dropdown, { alignPoints: ALIGN_POINTS, renderButton: ({ isOpen, toggleDropdown }) => (React.createElement(SelectionModeButton, { isOpen: isOpen, title: selectionOptionTitleMap[selectionMode], toggleDropdown: toggleDropdown })), renderBody: ({ closeDropdown }) => (React.createElement(DropdownList, { className: "attribute-display-form-dropdown-body s-selection-mode-dropdown-body", items: items, itemHeight: ITEM_HEIGHT, width: DROPDOWN_WIDTH, renderItem: ({ item }) => (React.createElement(SelectionModeItem, { item: item, itemTitle: selectionOptionTitleMap[item], selected: item === selectionMode, disabled: item === "single" && disabled, disabledTooltip: singleSelectionDisabledTooltip, onClick: () => {
                            closeDropdown();
                            onSelectionModeChange(item);
                        } })) })) }))));
};
//# sourceMappingURL=SelectionMode.js.map