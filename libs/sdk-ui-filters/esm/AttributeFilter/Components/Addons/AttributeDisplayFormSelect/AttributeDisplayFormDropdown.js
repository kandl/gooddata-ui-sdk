// (C) 2021-2022 GoodData Corporation
import React, { useMemo } from "react";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import { Dropdown, DropdownList } from "@gooddata/sdk-ui-kit";
import { AttributeDisplayFormDropdownButton } from "./AttributeDisplayFormDropdownButton.js";
import { AttributeDisplayFormSelectItem } from "./AttributeDisplayFormSelectItem.js";
const ITEM_HEIGHT = 23;
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
/**
 * @internal
 */
export const AttributeDisplayFormDropdown = (props) => {
    const { displayForms, selectedDisplayForm, onSelect, alignPoints } = props;
    const buttonTitle = useMemo(() => {
        var _a;
        return (_a = displayForms.find((displayForm) => areObjRefsEqual(displayForm.ref, selectedDisplayForm))) === null || _a === void 0 ? void 0 : _a.title;
    }, [displayForms, selectedDisplayForm]);
    return (React.createElement(Dropdown, { className: "gd-attribute-display-form-dropdown", alignPoints: alignPoints !== null && alignPoints !== void 0 ? alignPoints : ALIGN_POINTS, closeOnMouseDrag: true, closeOnParentScroll: true, renderButton: ({ isOpen, toggleDropdown }) => (React.createElement(AttributeDisplayFormDropdownButton, { text: buttonTitle, isOpened: isOpen, toggleDropdown: toggleDropdown })), renderBody: ({ closeDropdown }) => (React.createElement(DropdownList, { className: "gd-attribute-display-form-dropdown-body s-attribute-display-form-dropdown-body", items: displayForms, itemHeight: ITEM_HEIGHT, renderItem: ({ item }) => {
                const selected = areObjRefsEqual(item.ref, selectedDisplayForm);
                const onClick = (displayForm) => {
                    closeDropdown();
                    if (!selected) {
                        onSelect(displayForm);
                    }
                };
                return (React.createElement(AttributeDisplayFormSelectItem, { key: item.id, displayForm: item, onClick: onClick, selected: selected }));
            } })) }));
};
//# sourceMappingURL=AttributeDisplayFormDropdown.js.map