// (C) 2022-2023 GoodData Corporation
import { areObjRefsEqual, idRef, uriRef, } from "@gooddata/sdk-model";
import { Dropdown, DropdownList } from "@gooddata/sdk-ui-kit";
import React from "react";
import { AttributeDisplayFormDropdownButton } from "./AttributeDisplayFormDropdownButton.js";
import { AttributeDisplayFormDropDownItem } from "./AttributeDisplayFormDropDownItem.js";
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
export const AttributeDisplayFormsDropdown = ({ displayForms, selectedDisplayForm, onChange, }) => {
    // try matching both uri and id in case the type of ref is different from what is in the ref field
    const selectedDisplayFormTitle = displayForms.find((df) => areObjRefsEqual(idRef(df.id, "displayForm"), selectedDisplayForm) ||
        areObjRefsEqual(uriRef(df.uri), selectedDisplayForm)).title;
    return (React.createElement(Dropdown, { alignPoints: ALIGN_POINTS, renderButton: ({ isOpen, toggleDropdown }) => {
            return (React.createElement(AttributeDisplayFormDropdownButton, { title: selectedDisplayFormTitle, isOpened: isOpen, toggleDropdown: toggleDropdown }));
        }, renderBody: ({ closeDropdown }) => (React.createElement(DropdownList, { className: "attribute-display-form-dropdown-body s-attribute-display-form-dropdown-body", items: displayForms, itemHeight: ITEM_HEIGHT, width: DROPDOWN_WIDTH, renderItem: ({ item }) => {
                const selected = areObjRefsEqual(selectedDisplayForm, item.ref);
                const onClick = (displayForm) => {
                    closeDropdown();
                    if (!selected) {
                        onChange(displayForm);
                    }
                };
                return (React.createElement(AttributeDisplayFormDropDownItem, { displayForm: item, selected: selected, onClick: onClick }));
            } })) }));
};
//# sourceMappingURL=AttributeDisplayFormsDropdown.js.map