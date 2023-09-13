// (C) 2019-2022 GoodData Corporation
import React from "react";
import DefaultDownshift from "downshift";
import cx from "classnames";
import { getSelectableItems, itemToString } from "../Select/utils.js";
import { defaultVisibleItemsRange, getMedianIndex, VirtualizedSelectMenu, } from "../Select/VirtualizedSelectMenu.js";
import { defaultImport } from "default-import";
import { findRelativeDateFilterOptionByValue } from "./utils.js";
import noop from "lodash/noop.js";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const Downshift = defaultImport(DefaultDownshift);
class DynamicSelect extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.onChange = (option) => {
            if (option) {
                this.props.onChange(option.value);
            }
        };
        this.componentDidUpdate = (lastProps) => {
            var _a;
            if (lastProps.value !== this.props.value) {
                const defaultItems = this.props.getItems(this.props.value.toString());
                const inputValue = ((_a = findRelativeDateFilterOptionByValue(defaultItems, this.props.value)) === null || _a === void 0 ? void 0 : _a.label) ||
                    this.props.value.toString();
                this.setState({
                    inputValue,
                });
            }
        };
        this.focus = () => {
            if (this.inputRef.current) {
                this.inputRef.current.focus();
            }
        };
        this.blur = () => {
            if (this.inputRef.current) {
                this.inputRef.current.blur();
            }
        };
        this.onInputValueChanged = (inputValue) => {
            if (inputValue !== this.state.inputValue) {
                this.setState({ inputValue });
            }
        };
        this.onBlurHandler = (selectedItem, selectItem, closeMenu) => {
            const { customValueValidator, value } = this.props;
            if (customValueValidator) {
                closeMenu();
                this.onInputValueChanged(value === null || value === void 0 ? void 0 : value.toString());
            }
            else {
                selectItem(selectedItem);
                this.onInputValueChanged(selectedItem ? selectedItem.label : "");
            }
        };
        this.onChangeHandler = (event, selectItem) => {
            const { customValueValidator } = this.props;
            const currentValue = event.target.value;
            if (customValueValidator === null || customValueValidator === void 0 ? void 0 : customValueValidator(currentValue)) {
                selectItem({
                    type: "option",
                    value: Number(currentValue),
                    label: currentValue,
                });
            }
            // Downshifts onInputValueChanged fires twice and with an old value,
            // so we need to use our own callback
            this.onInputValueChanged(currentValue);
        };
        const selectedItem = props.value !== undefined
            ? findRelativeDateFilterOptionByValue(
            // pass the current value to make sure the searched options include it even if it is outside the default range
            props.getItems(props.value.toString()), props.value)
            : null;
        this.state = {
            inputValue: selectedItem ? itemToString(selectedItem) : props.value ? props.value.toString() : "",
        };
    }
    render() {
        const { initialIsOpen, placeholder, getItems, value = null, className, style, optionClassName, visibleItemsRange, } = this.props;
        const items = getItems(this.state.inputValue);
        // this is important to correctly find out selected option. It is different than 'items'.
        const itemsByValue = value !== null ? getItems(value.toString()) : [];
        // Downshift requires null as empty selected item, if we would pass undefined it would change
        // from controlled to uncontrolled component
        const selectedItem = (value !== null && findRelativeDateFilterOptionByValue(itemsByValue, value)) || null;
        const selectableItems = getSelectableItems(items);
        const isFiltered = this.state.inputValue.trim() !== "";
        return (React.createElement(Downshift, { onChange: this.onChange, itemToString: itemToString, initialIsOpen: initialIsOpen, selectedItem: selectedItem, itemCount: selectableItems.length, inputValue: this.state.inputValue, 
            // automatically highlight (and therefore scroll to) the middle option if default items are displayed
            defaultHighlightedIndex: selectedItem || isFiltered ? 0 : getMedianIndex(selectableItems) }, ({ getInputProps, getMenuProps, getItemProps, isOpen, openMenu, closeMenu, inputValue, highlightedIndex, setHighlightedIndex, selectItem, }) => {
            // Without this, highlight is not properly reset during filtering
            const effectiveHighlightedIndex = highlightedIndex > selectableItems.length - 1 ? 0 : highlightedIndex;
            const menuProps = {
                items,
                selectedItem,
                highlightedIndex: effectiveHighlightedIndex,
                getItemProps,
                getMenuProps,
                className: "gd-dynamic-select-menu",
                optionClassName,
                inputValue,
                setHighlightedIndex,
                visibleItemsRange,
            };
            return (React.createElement("div", { className: cx("gd-dynamic-select", className), style: style },
                React.createElement("div", { className: "gd-dynamic-select-input-wrapper" },
                    React.createElement("input", Object.assign({ type: "text", className: "s-relative-range-input gd-input-field" }, getInputProps({
                        ref: this.inputRef,
                        placeholder: selectedItem ? selectedItem.label : placeholder,
                        value: inputValue,
                        onFocus: () => {
                            this.setState({ inputValue: "" });
                            openMenu();
                        },
                        onChange: (event) => this.onChangeHandler(event, selectItem),
                        onBlur: () => this.onBlurHandler(selectedItem, selectItem, closeMenu),
                    })))),
                isOpen && items.length > 0 ? React.createElement(VirtualizedSelectMenu, Object.assign({}, menuProps)) : null));
        }));
    }
}
DynamicSelect.defaultProps = {
    onChange: noop,
    initialIsOpen: false,
    visibleItemsRange: defaultVisibleItemsRange,
};
export { DynamicSelect };
//# sourceMappingURL=DynamicSelect.js.map