// (C) 2022 GoodData Corporation
import React, { useCallback } from "react";
import { SingleSelectListItem } from "../../../../List/index.js";
import { Dropdown, DropdownButton, DropdownList } from "../../../../Dropdown/index.js";
import { NumericInput } from "./NumericInput.js";
import { DEFAULT_UNIT, UNITS } from "../types.js";
import { getDefaultHeightForEmbedCodeByUnit } from "../../utils.js";
/**
 * @internal
 */
export const HeightSetting = (props) => {
    const { value, onValueChange, unit = DEFAULT_UNIT } = props;
    const onChange = useCallback((val) => {
        if (val !== value) {
            onValueChange(val, unit);
        }
    }, [value, unit, onValueChange]);
    const onUnitChange = useCallback((unit) => {
        onValueChange(getDefaultHeightForEmbedCodeByUnit(unit), unit);
    }, [onValueChange]);
    return (React.createElement("div", { className: "height-setting-component" },
        React.createElement(NumericInput, { value: value !== null && value !== void 0 ? value : getDefaultHeightForEmbedCodeByUnit(unit), onValueChanged: onChange }),
        React.createElement(UnitSelect, { selectedUnit: unit, onSelectUnit: onUnitChange })));
};
const items = UNITS.map((u) => ({ id: u, title: u }));
const UnitSelect = (props) => {
    const { selectedUnit, onSelectUnit } = props;
    return (React.createElement(Dropdown, { renderBody: ({ closeDropdown }) => (React.createElement(DropdownList, { items: items, width: 60, renderItem: ({ item }) => {
                return (React.createElement(SingleSelectListItem, { title: item.title, isSelected: item.id === selectedUnit, onClick: () => {
                        onSelectUnit(item.id);
                        closeDropdown();
                    } }));
            } })), renderButton: ({ openDropdown, isOpen }) => (React.createElement(DropdownButton, { value: selectedUnit, isOpen: isOpen, onClick: openDropdown })) }));
};
//# sourceMappingURL=HeightSetting.js.map