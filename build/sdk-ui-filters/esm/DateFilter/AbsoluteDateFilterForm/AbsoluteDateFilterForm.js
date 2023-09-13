// (C) 2007-2022 GoodData Corporation
import React from "react";
import { DateRangePicker } from "../DateRangePicker/DateRangePicker.js";
import { dateFilterValueToDateRange, dateRangeToDateFilterValue } from "./conversions.js";
const dayPickerProps = {
    mode: "range",
    weekStartsOn: 0, // Sunday, regardless of locale
};
/**
 * @internal
 */
export class AbsoluteDateFilterForm extends React.Component {
    constructor() {
        super(...arguments);
        this.handleRangeChange = (range) => {
            const { selectedFilterOption, isTimeEnabled } = this.props;
            this.props.onSelectedFilterOptionChange(dateRangeToDateFilterValue(range, selectedFilterOption.localIdentifier, isTimeEnabled));
        };
    }
    render() {
        const { dateFormat, isMobile, selectedFilterOption, errors, isTimeEnabled, weekStart, shouldOverlayDatePicker, } = this.props;
        return (React.createElement(DateRangePicker, { dateFormat: dateFormat, onRangeChange: this.handleRangeChange, range: dateFilterValueToDateRange(selectedFilterOption, isTimeEnabled), errors: errors, isMobile: isMobile, dayPickerProps: dayPickerProps, isTimeEnabled: isTimeEnabled, weekStart: weekStart, shouldOverlayDatePicker: shouldOverlayDatePicker }));
    }
}
//# sourceMappingURL=AbsoluteDateFilterForm.js.map