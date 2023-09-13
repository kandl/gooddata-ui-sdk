// (C) 2019-2023 GoodData Corporation
import * as React from "react";
import { Datepicker, Timepicker } from "@gooddata/sdk-ui-kit";
import { DEFAULT_DROPDOWN_ZINDEX } from "../constants.js";
const MAX_VISIBLE_ITEMS_COUNT = 5;
export class DateTime extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.timeChange = (selectedTime) => {
            this.props.onTimeChange({
                hour: selectedTime.getHours(),
                minute: selectedTime.getMinutes(),
                second: selectedTime.getSeconds(),
            });
        };
    }
    render() {
        const { date, dateFormat, label, locale, timezone, onDateChange, weekStart } = this.props;
        return (React.createElement("div", { className: "gd-input-component gd-schedule-email-dialog-datetime s-gd-schedule-email-dialog-datetime" },
            React.createElement("label", { className: "gd-label" }, label),
            React.createElement("div", null,
                React.createElement(Datepicker, { date: date, dateFormat: dateFormat, locale: locale, placeholder: dateFormat, resetOnInvalidValue: true, onChange: onDateChange, weekStart: weekStart }),
                React.createElement(Timepicker, { className: "gd-schedule-email-dialog-datetime-time", maxVisibleItemsCount: MAX_VISIBLE_ITEMS_COUNT, skipNormalizeTime: true, time: date, onChange: this.timeChange, overlayPositionType: "sameAsTarget", overlayZIndex: DEFAULT_DROPDOWN_ZINDEX }),
                React.createElement("span", { className: "gd-schedule-email-dialog-datetime-timezone s-gd-schedule-email-dialog-datetime-timezone" }, timezone))));
    }
}
//# sourceMappingURL=DateTime.js.map