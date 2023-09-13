// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
// This has to be a class because DayPickerInput refs to it internally.
// See https://github.com/gpbl/react-day-picker/issues/748 for more information
export class DateRangePickerInputFieldBody extends React.Component {
    constructor() {
        super(...arguments);
        this.inputRef = React.createRef();
        this.invokeInputMethod = (key) => {
            if (this.inputRef.current) {
                this.inputRef.current[key]();
            }
        };
        this.blur = () => this.invokeInputMethod("blur");
        this.focus = () => this.invokeInputMethod("focus");
    }
    get value() {
        if (this.inputRef.current) {
            return this.inputRef.current.value;
        }
        return "";
    }
    render() {
        const { className } = this.props;
        return (React.createElement("span", { className: cx(className) },
            React.createElement("span", { className: "gd-icon-calendar" }),
            React.createElement("input", Object.assign({}, this.props, { ref: this.inputRef, className: "input-text s-date-range-picker-input-field" }))));
    }
}
//# sourceMappingURL=DateRangePickerInputFieldBody.js.map