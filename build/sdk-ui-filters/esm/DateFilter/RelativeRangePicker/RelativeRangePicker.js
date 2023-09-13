// (C) 2019-2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import { DynamicSelect } from "../DynamicSelect/DynamicSelect.js";
import { getRelativeDateFilterItems } from "../DynamicSelect/utils.js";
import { injectIntl } from "react-intl";
import { defaultVisibleItemsRange } from "../Select/VirtualizedSelectMenu.js";
class RelativeRangePickerComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.toFieldRef = React.createRef();
        this.isTouchDevice = () => {
            return "ontouchstart" in window || navigator.maxTouchPoints > 0;
        };
        this.focusToField = () => {
            const isTouchDevice = this.isTouchDevice();
            if (this.toFieldRef.current) {
                /**
                 * Prevents hover style from persisting after switching to another field on
                 * touchscreen devices.
                 */
                isTouchDevice
                    ? setTimeout(() => {
                        var _a;
                        (_a = this.toFieldRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                    }, 0)
                    : this.toFieldRef.current.focus();
            }
        };
        this.blurToField = () => {
            const isTouchDevice = this.isTouchDevice();
            if (this.toFieldRef.current) {
                isTouchDevice
                    ? setTimeout(() => {
                        var _a;
                        (_a = this.toFieldRef.current) === null || _a === void 0 ? void 0 : _a.blur();
                    }, 0)
                    : this.toFieldRef.current.blur();
            }
        };
        this.handleFromChange = (from) => {
            this.props.onSelectedFilterOptionChange(Object.assign(Object.assign({}, this.props.selectedFilterOption), { from }));
            if (from !== undefined) {
                this.focusToField();
            }
        };
        this.handleToChange = (to) => {
            this.props.onSelectedFilterOptionChange(Object.assign(Object.assign({}, this.props.selectedFilterOption), { to }));
            this.blurToField();
        };
    }
    render() {
        const { handleFromChange, handleToChange } = this;
        const { selectedFilterOption, intl, isMobile } = this.props;
        const mobileVisibleItemsRange = 5;
        const commonProps = {
            visibleItemsRange: isMobile ? mobileVisibleItemsRange : defaultVisibleItemsRange,
            optionClassName: "s-relative-date-filter-option s-do-not-close-dropdown-on-click",
            getItems: (value) => {
                const items = getRelativeDateFilterItems(value, selectedFilterOption.granularity, intl);
                // separators are not needed in mobile as all the items have borders
                return isMobile ? items.filter((item) => item.type !== "separator") : items;
            },
        };
        return (React.createElement("div", { className: "gd-relative-range-picker s-relative-range-picker" },
            React.createElement(DynamicSelect, Object.assign({ value: selectedFilterOption.from, onChange: handleFromChange, placeholder: intl.formatMessage({ id: "filters.from" }), className: cx("gd-relative-range-picker-picker", "s-relative-range-picker-from", isMobile && "gd-relative-range-picker-picker-mobile") }, commonProps)),
            React.createElement("span", { className: "gd-relative-range-picker-dash" }, "\u2013"),
            React.createElement(DynamicSelect, Object.assign({ value: selectedFilterOption.to, onChange: handleToChange, placeholder: intl.formatMessage({ id: "filters.to" }), className: cx("gd-relative-range-picker-picker", "s-relative-range-picker-to", isMobile && "gd-relative-range-picker-picker-mobile") }, commonProps, { ref: this.toFieldRef }))));
    }
}
export const RelativeRangePicker = injectIntl(RelativeRangePickerComponent);
//# sourceMappingURL=RelativeRangePicker.js.map