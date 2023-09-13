// (C) 2007-2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import { DayPicker, } from "react-day-picker";
import { injectIntl } from "react-intl";
import { Overlay } from "@gooddata/sdk-ui-kit";
import { mergeDayPickerProps } from "./utils.js";
import { DateRangePickerError } from "./DateRangePickerError.js";
import { DateTimePickerWithInt } from "./DateTimePicker.js";
import { DAY_END_TIME } from "../constants/Platform.js";
import enUS from "date-fns/locale/en-US/index.js";
import de from "date-fns/locale/de/index.js";
import es from "date-fns/locale/es/index.js";
import fr from "date-fns/locale/fr/index.js";
import ja from "date-fns/locale/ja/index.js";
import nl from "date-fns/locale/nl/index.js";
import pt from "date-fns/locale/pt/index.js";
import ptBR from "date-fns/locale/pt-BR/index.js";
import zhCN from "date-fns/locale/zh-CN/index.js";
import ru from "date-fns/locale/ru/index.js";
const convertedLocales = {
    "en-US": enUS,
    "de-DE": de,
    "es-ES": es,
    "fr-FR": fr,
    "ja-JP": ja,
    "nl-NL": nl,
    "pt-BR": ptBR,
    "pt-PT": pt,
    "zh-Hans": zhCN,
    "ru-RU": ru,
};
const ALIGN_POINTS = [{ align: "bl tl", offset: { x: 0, y: 1 } }];
function convertLocale(locale) {
    return convertedLocales[locale];
}
function convertWeekStart(weekStart) {
    switch (weekStart) {
        case "Sunday":
            return 0;
        case "Monday":
            return 1;
        default:
            throw new Error(`Unknown week start ${weekStart}`);
    }
}
class DateRangePickerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.dateRangePickerInputFrom = React.createRef();
        this.dateRangePickerInputTo = React.createRef();
        this.dateRangePickerContainer = React.createRef();
        this.handleRangeSelect = (_range, selectedDate) => {
            let calculatedFrom;
            let calculatedTo;
            // it is better to use selectedDate property as _range is not working correctly in corner cases
            if (this.state.selectedInput == "from") {
                calculatedFrom = this.setTimeForDate(selectedDate, this.state.inputFromValue);
                calculatedTo = this.state.inputToValue;
            }
            else {
                calculatedFrom = this.state.inputFromValue;
                calculatedTo = this.setTimeForDate(selectedDate, this.state.inputToValue);
            }
            this.setState({
                inputFromValue: calculatedFrom,
                inputToValue: calculatedTo,
                selectedRange: { from: calculatedFrom, to: calculatedTo },
                isOpen: false,
            }, () => {
                this.updateRange(calculatedFrom, calculatedTo);
            });
        };
        this.updateRange = (from, to) => {
            this.props.onRangeChange({ from, to });
        };
        this.handleFromDayClick = () => {
            this.setState({
                selectedInput: "from",
                isOpen: true,
                monthDate: this.props.range.from,
            });
        };
        this.handleToDayClick = () => {
            this.setState({
                selectedInput: "to",
                isOpen: true,
                monthDate: this.props.range.to,
            });
        };
        this.handleFromChange = (date) => {
            if (date) {
                this.setState({ inputFromValue: date });
            }
            this.setState({
                selectedRange: { from: date, to: this.state.selectedRange.to },
                monthDate: date,
            }, () => {
                this.updateRange(date, this.state.selectedRange.to);
            });
        };
        this.handleToChange = (date) => {
            if (date) {
                this.setState({ inputToValue: date });
            }
            this.setState({
                selectedRange: { from: this.state.selectedRange.from, to: date },
                monthDate: date,
            }, () => {
                this.updateRange(this.state.selectedRange.from, date);
            });
        };
        this.state = {
            isOpen: false,
            inputFromValue: this.props.range.from,
            inputToValue: this.props.range.to,
            selectedRange: { from: this.props.range.from, to: this.props.range.to },
            monthDate: null,
            selectedInput: null,
        };
        this.handleMonthChanged = this.handleMonthChanged.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleMonthChanged = this.handleMonthChanged.bind(this);
        this.handleRangeSelect = this.handleRangeSelect.bind(this);
        this.handleFromDayClick = this.handleFromDayClick.bind(this);
        this.handleToDayClick = this.handleToDayClick.bind(this);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    render() {
        const { dateFormat, range: { from, to }, dayPickerProps, intl, isMobile, errors: { from: errorFrom, to: errorTo } = { from: undefined, to: undefined }, isTimeEnabled, weekStart = "Sunday", shouldOverlayDatePicker = false, } = this.props;
        const defaultDayPickerProps = {
            mode: "range",
            showOutsideDays: true,
            modifiers: { start: from, end: to },
            selected: { from, to },
            locale: convertLocale(intl.locale),
        };
        const dayPickerPropsWithDefaults = mergeDayPickerProps(defaultDayPickerProps, dayPickerProps);
        const classNameProps = {
            root: `gd-date-range-picker-picker s-date-range-calendar-${this.state.selectedInput}`,
        };
        const DatePicker = (React.createElement("div", { className: "gd-date-range-picker-wrapper", ref: this.dateRangePickerContainer },
            React.createElement(DayPicker, Object.assign({}, dayPickerPropsWithDefaults, { onSelect: this.handleRangeSelect, selected: this.state.selectedRange, month: this.state.monthDate, classNames: classNameProps, onMonthChange: this.handleMonthChanged, weekStartsOn: convertWeekStart(weekStart) }))));
        const OverlayDatePicker = (React.createElement(Overlay, { alignTo: `.gd-date-range-picker-${isTimeEnabled ? this.state.selectedInput : "from"}`, alignPoints: ALIGN_POINTS, closeOnOutsideClick: true, closeOnMouseDrag: true, closeOnParentScroll: true }, DatePicker));
        const FromField = (React.createElement(DateTimePickerWithInt, { onKeyDown: this.onKeyDown, ref: this.dateRangePickerInputFrom, placeholderDate: intl.formatMessage({ id: "filters.from" }), onChange: this.handleFromChange, value: this.state.inputFromValue, dateFormat: dateFormat, isMobile: isMobile, handleDayClick: this.handleFromDayClick, isTimeEnabled: isTimeEnabled, className: cx("s-date-range-picker-from", "gd-date-range-picker-from"), error: typeof errorFrom !== "undefined" }));
        const ToField = (React.createElement(DateTimePickerWithInt, { onKeyDown: this.onKeyDown, ref: this.dateRangePickerInputTo, placeholderDate: intl.formatMessage({ id: "filters.to" }), onChange: this.handleToChange, value: this.state.inputToValue, dateFormat: dateFormat, isMobile: isMobile, handleDayClick: this.handleToDayClick, isTimeEnabled: isTimeEnabled, className: cx("s-date-range-picker-to", "gd-date-range-picker-to"), defaultTime: DAY_END_TIME, error: typeof errorTo !== "undefined" }));
        const DatePickerComponent = shouldOverlayDatePicker ? OverlayDatePicker : DatePicker;
        const isFromInputDatePickerOpen = this.state.selectedInput === "from" && this.state.isOpen;
        const isToInputDatePickerOpen = this.state.selectedInput === "to" && this.state.isOpen;
        return (React.createElement(React.Fragment, null,
            isTimeEnabled ? (React.createElement("div", { className: "gd-date-range-picker datetime s-date-range-picker" },
                React.createElement("label", null, intl.formatMessage({ id: "filters.from" })),
                FromField,
                isFromInputDatePickerOpen ? DatePickerComponent : null,
                React.createElement("label", null, intl.formatMessage({ id: "filters.to" })),
                ToField,
                isToInputDatePickerOpen ? DatePickerComponent : null)) : (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "gd-date-range-picker gd-flex-row s-date-range-picker" },
                    FromField,
                    React.createElement("span", { className: "gd-date-range-picker-dash" }, "\u2013"),
                    ToField),
                this.state.isOpen ? DatePickerComponent : null)),
            errorFrom || errorTo ? (React.createElement(DateRangePickerError, { dateFormat: dateFormat, errorId: 
                // This means that when both inputs are invalid, error is shown only for "from"
                errorFrom || errorTo })) : null));
    }
    onKeyDown(e) {
        if (e.key === "Escape" || e.key === "Tab") {
            this.setState({ isOpen: false });
        }
    }
    handleMonthChanged(month) {
        this.setState({ monthDate: month });
    }
    // get new date object composed from the date of the first argument
    // and the time of the date provided as the second argument
    setTimeForDate(date, time) {
        const result = new Date(date);
        result.setHours(time.getHours());
        result.setMinutes(time.getMinutes());
        return result;
    }
    handleClickOutside(event) {
        if (this.dateRangePickerContainer.current &&
            !this.dateRangePickerContainer.current.contains(event.target) &&
            this.dateRangePickerInputFrom &&
            !this.dateRangePickerInputFrom.current.contains(event.target) &&
            this.dateRangePickerInputTo &&
            !this.dateRangePickerInputTo.current.contains(event.target)) {
            this.setState({ isOpen: false });
        }
    }
}
export const DateRangePicker = injectIntl(DateRangePickerComponent);
//# sourceMappingURL=DateRangePicker.js.map