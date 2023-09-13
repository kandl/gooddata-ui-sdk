// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import moment from "moment";
import { translationUtils } from "@gooddata/util";
import { IntlWrapper } from "@gooddata/sdk-ui";
import noop from "lodash/noop.js";
import { Dropdown, DropdownButton, DropdownList } from "../Dropdown/index.js";
import { formatTime, normalizeTime, updateTime, HOURS_IN_DAY, TIME_ANCHOR } from "./utils/timeUtilities.js";
import { SingleSelectListItem } from "../List/index.js";
const DEFAULT_WIDTH = 199;
const MINUTES_IN_HOUR = 60;
const MAX_VISIBLE_ITEMS_COUNT = 10;
export { normalizeTime, formatTime };
class WrappedTimepicker extends React.PureComponent {
    constructor(props) {
        super(props);
        this.dropdownRef = React.createRef();
        this.getTimeItems = (selectedTime) => {
            let currentItem;
            const items = [];
            const { h: hours, m: minutes } = selectedTime;
            for (let h = 0; h < HOURS_IN_DAY; h += 1) {
                for (let m = 0; m < MINUTES_IN_HOUR; m += TIME_ANCHOR) {
                    const item = {
                        h,
                        m,
                        title: formatTime(h, m),
                    };
                    items.push(item);
                    if (h === hours && m === minutes) {
                        currentItem = item;
                    }
                }
            }
            return { items, currentItem };
        };
        this.updateDropdownWidth = () => {
            const { width } = this.dropdownRef.current.getBoundingClientRect();
            this.setState({ dropdownWidth: width });
        };
        this.handleTimeChanged = (newlySelectedTime) => {
            if (!newlySelectedTime) {
                return;
            }
            const { h, m } = newlySelectedTime;
            const selectedTime = updateTime(h, m);
            this.setState({ selectedTime }, () => this.props.onChange(selectedTime));
        };
        this.updateLocaleForMoment();
        const time = props.time || new Date();
        this.state = {
            dropdownWidth: DEFAULT_WIDTH,
            selectedTime: props.skipNormalizeTime ? time : normalizeTime(time),
        };
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.time !== this.props.time) {
            const updatedTime = newProps.time || new Date();
            this.setState({
                selectedTime: this.props.skipNormalizeTime ? updatedTime : normalizeTime(updatedTime),
            });
        }
    }
    componentDidMount() {
        this.updateDropdownWidth();
    }
    getComponentClasses() {
        return `gd-datepicker ${this.props.className} gd-datepicker-input gd-timepicker`;
    }
    updateLocaleForMoment() {
        moment.locale(translationUtils.sanitizeLocaleForMoment(this.props.intl.locale));
    }
    render() {
        const { overlayPositionType, maxVisibleItemsCount, overlayZIndex } = this.props;
        const { dropdownWidth, selectedTime } = this.state;
        const time = {
            h: selectedTime.getHours(),
            m: selectedTime.getMinutes(),
        };
        const { items, currentItem } = this.getTimeItems(time);
        return (React.createElement("div", { className: this.getComponentClasses(), ref: this.dropdownRef },
            React.createElement(Dropdown, { overlayPositionType: overlayPositionType, alignPoints: [
                    {
                        align: "bl tl",
                    },
                    {
                        align: "tl bl",
                    },
                ], renderButton: ({ openDropdown, isOpen }) => (React.createElement(DropdownButton, { value: formatTime(time.h, time.m), isOpen: isOpen, onClick: openDropdown, iconLeft: "gd-icon-timer" })), renderBody: ({ closeDropdown, isMobile }) => (React.createElement(DropdownList, { isMobile: isMobile, width: dropdownWidth, items: items, renderItem: ({ item }) => (React.createElement(SingleSelectListItem, { title: item.title, isSelected: item === currentItem, onClick: () => {
                            this.handleTimeChanged(item);
                            closeDropdown();
                        } })), maxVisibleItemsCount: maxVisibleItemsCount })), overlayZIndex: overlayZIndex })));
    }
}
WrappedTimepicker.defaultProps = {
    className: "",
    maxVisibleItemsCount: MAX_VISIBLE_ITEMS_COUNT,
    time: new Date(),
    onChange: noop,
    overlayZIndex: 0,
    skipNormalizeTime: false,
};
export { WrappedTimepicker };
const TimePickerWithIntl = injectIntl(WrappedTimepicker);
/**
 * @internal
 */
export class Timepicker extends React.PureComponent {
    render() {
        return (React.createElement(IntlWrapper, { locale: this.props.locale },
            React.createElement(TimePickerWithIntl, Object.assign({}, this.props))));
    }
}
//# sourceMappingURL=Timepicker.js.map