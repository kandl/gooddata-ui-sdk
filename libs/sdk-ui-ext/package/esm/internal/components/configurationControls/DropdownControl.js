// (C) 2019 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { Dropdown, DropdownList, DropdownButton, SingleSelectListItem } from "@gooddata/sdk-ui-kit";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import DisabledBubbleMessage from "../DisabledBubbleMessage";
import { getTranslation } from "../../utils/translations";
const alignPoints = ["bl tl", "tl bl", "br tr", "tr br"];
const DROPDOWN_ALIGNMENTS = alignPoints.map((align) => ({ align, offset: { x: 1, y: 0 } }));
class DropdownControl extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.getSelectedItem = this.getSelectedItem.bind(this);
    }
    render() {
        const { disabled, labelText, value, width, items, showDisabledMessage, intl } = this.props;
        const selectedItem = this.getSelectedItem(value) || {};
        return (React.createElement(DisabledBubbleMessage, { showDisabledMessage: showDisabledMessage },
            React.createElement("div", { className: "adi-properties-dropdown-container" },
                React.createElement("span", { className: "input-label-text" }, getTranslation(labelText, intl)),
                React.createElement("label", { className: "adi-bucket-inputfield gd-input gd-input-small" },
                    React.createElement(Dropdown, { renderButton: ({ isOpen, toggleDropdown }) => {
                            return this.getDropdownButton(selectedItem, disabled, isOpen, toggleDropdown);
                        }, closeOnParentScroll: true, closeOnMouseDrag: true, alignPoints: DROPDOWN_ALIGNMENTS, renderBody: ({ closeDropdown, isMobile }) => {
                            return (React.createElement(DropdownList, { width: width, isMobile: isMobile, items: items, renderItem: ({ item }) => (React.createElement(SingleSelectListItem, { title: item.title, isSelected: item.value === selectedItem.value, onClick: () => {
                                        this.onSelect(item);
                                        closeDropdown();
                                    }, type: item.type, icon: item.icon, info: item.info })) }));
                        }, className: "adi-bucket-dropdown" })))));
    }
    getDropdownButton(selectedItem, disabled, isOpen, toggleDropdown) {
        const { icon, title } = selectedItem;
        return (React.createElement(DropdownButton, { value: title, iconLeft: icon, isOpen: isOpen, onClick: toggleDropdown, disabled: disabled }));
    }
    onSelect(selectedItem) {
        const { valuePath, properties, pushData } = this.props;
        // we must not change the properties at any cost, so deep clone for now.
        // ideally we should use st. like immer with copy on write to not clone everything all the time
        const clonedProperties = cloneDeep(properties);
        set(clonedProperties, `controls.${valuePath}`, selectedItem.value);
        pushData({ properties: clonedProperties });
    }
    getSelectedItem(value) {
        if (this.props.items) {
            return this.props.items.find((item) => item.value === value);
        }
        return undefined;
    }
}
DropdownControl.defaultProps = {
    value: "",
    items: [],
    disabled: false,
    width: 117,
    showDisabledMessage: false,
};
export default injectIntl(DropdownControl);
//# sourceMappingURL=DropdownControl.js.map