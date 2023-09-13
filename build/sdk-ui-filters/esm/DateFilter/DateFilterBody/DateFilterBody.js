// (C) 2007-2022 GoodData Corporation
import React from "react";
import isEmpty from "lodash/isEmpty.js";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
import { ListItem } from "../ListItem/ListItem.js";
import { ExcludeCurrentPeriodToggle } from "../ExcludeCurrentPeriodToggle/ExcludeCurrentPeriodToggle.js";
import { VisibleScrollbar } from "../VisibleScrollbar/VisibleScrollbar.js";
import { getDateFilterOptionGranularity } from "../utils/OptionUtils.js";
import { AllTimeFilterItem } from "./AllTimeFilterItem.js";
import { DateFilterFormWrapper } from "../DateFilterFormWrapper/DateFilterFormWrapper.js";
import { AbsoluteDateFilterForm } from "../AbsoluteDateFilterForm/AbsoluteDateFilterForm.js";
import { ListItemTooltip } from "../ListItemTooltip/ListItemTooltip.js";
import { RelativeDateFilterForm } from "../RelativeDateFilterForm/RelativeDateFilterForm.js";
import { RelativePresetFilterItems } from "./RelativePresetFilterItems.js";
import { EditModeMessage } from "./EditModeMessage.js";
import { DateFilterHeader } from "./DateFilterHeader.js";
import { DateFilterBodyButton } from "./DateFilterBodyButton.js";
import { AbsolutePresetFilterItems } from "./AbsolutePresetFilterItems.js";
import { isAbsoluteDateFilterForm, isRelativeDateFilterForm, } from "@gooddata/sdk-model";
const ACTIONS_BUTTONS_HEIGHT = 53;
const EXCLUDE_OPEN_PERIOD_HEIGHT = 30; // height of 'Exclude open period' checkbox component
const MARGIN_BOTTOM = 8;
const MOBILE_WIDTH = 414; // iPhone 11 Pro Max
const ITEM_CLASS_MOBILE = "gd-date-filter-item-mobile";
export class DateFilterBody extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            route: null,
        };
        this.changeRoute = (route = null) => {
            this.setState({ route });
        };
        this.renderAllTime = () => {
            const { filterOptions, isMobile, selectedFilterOption, onSelectedFilterOptionChange } = this.props;
            return filterOptions.allTime ? (React.createElement(AllTimeFilterItem, { filterOption: filterOptions.allTime, selectedFilterOption: selectedFilterOption, onSelectedFilterOptionChange: onSelectedFilterOptionChange, className: isMobile ? ITEM_CLASS_MOBILE : undefined })) : null;
        };
        this.renderAbsoluteForm = () => {
            const { dateFormat, filterOptions, selectedFilterOption, onSelectedFilterOptionChange, isTimeForAbsoluteRangeEnabled, isMobile, errors, weekStart, } = this.props;
            if (!filterOptions.absoluteForm) {
                return null;
            }
            const { route } = this.state;
            const isSelected = filterOptions.absoluteForm.localIdentifier === selectedFilterOption.localIdentifier;
            const isOnRoute = route === "absoluteForm";
            return (React.createElement(React.Fragment, null,
                !isMobile || !isOnRoute ? (React.createElement(ListItem, { isSelected: isSelected, onClick: () => {
                        this.changeRoute("absoluteForm");
                        if (!isAbsoluteDateFilterForm(selectedFilterOption)) {
                            onSelectedFilterOptionChange(filterOptions.absoluteForm);
                        }
                    }, className: cx("s-absolute-form", "s-do-not-close-dropdown-on-click", isMobile && ITEM_CLASS_MOBILE) }, filterOptions.absoluteForm.name ? (filterOptions.absoluteForm.name) : (React.createElement(FormattedMessage, { id: "filters.staticPeriod" })))) : null,
                isSelected && (!isMobile || isOnRoute) ? (React.createElement(DateFilterFormWrapper, { isMobile: isMobile },
                    React.createElement(AbsoluteDateFilterForm, { dateFormat: dateFormat, errors: (errors === null || errors === void 0 ? void 0 : errors.absoluteForm) || undefined, onSelectedFilterOptionChange: onSelectedFilterOptionChange, selectedFilterOption: selectedFilterOption, isMobile: isMobile, isTimeEnabled: isTimeForAbsoluteRangeEnabled, weekStart: weekStart }))) : null));
        };
        this.renderRelativeForm = () => {
            const { filterOptions, selectedFilterOption, onSelectedFilterOptionChange, availableGranularities, isMobile, } = this.props;
            if (!filterOptions.relativeForm) {
                return null;
            }
            const { route } = this.state;
            const isSelected = filterOptions.relativeForm.localIdentifier === selectedFilterOption.localIdentifier;
            const isOnRoute = route === "relativeForm";
            return (React.createElement(React.Fragment, null,
                !isMobile || !isOnRoute ? (React.createElement(ListItem, { isSelected: isSelected, onClick: () => {
                        this.changeRoute("relativeForm");
                        if (!isRelativeDateFilterForm(selectedFilterOption)) {
                            onSelectedFilterOptionChange(filterOptions.relativeForm);
                        }
                    }, className: cx("s-relative-form", "s-do-not-close-dropdown-on-click", isMobile && ITEM_CLASS_MOBILE) },
                    filterOptions.relativeForm.name ? (filterOptions.relativeForm.name) : (React.createElement(FormattedMessage, { id: "filters.floatingRange" })),
                    !isMobile ? (React.createElement(ListItemTooltip, { bubbleAlignPoints: [{ align: "cr cl" }] },
                        React.createElement(FormattedMessage, { id: "filters.floatingRange.tooltip" }))) : null)) : null,
                isSelected && (!isMobile || isOnRoute) ? (React.createElement(DateFilterFormWrapper, { isMobile: isMobile },
                    React.createElement(RelativeDateFilterForm, { onSelectedFilterOptionChange: (option) => {
                            onSelectedFilterOptionChange(option);
                        }, selectedFilterOption: selectedFilterOption, availableGranularities: availableGranularities, isMobile: isMobile }))) : null));
        };
        this.renderAbsolutePreset = () => {
            const { dateFormat, filterOptions, selectedFilterOption, onSelectedFilterOptionChange, isMobile } = this.props;
            return filterOptions.absolutePreset && filterOptions.absolutePreset.length > 0 ? (React.createElement(AbsolutePresetFilterItems, { dateFormat: dateFormat, filterOptions: filterOptions.absolutePreset, selectedFilterOption: selectedFilterOption, onSelectedFilterOptionChange: onSelectedFilterOptionChange, className: isMobile ? ITEM_CLASS_MOBILE : undefined })) : null;
        };
        this.renderRelativePreset = () => {
            const { dateFormat, filterOptions, selectedFilterOption, onSelectedFilterOptionChange, isMobile } = this.props;
            return filterOptions.relativePreset ? (React.createElement(RelativePresetFilterItems, { dateFormat: dateFormat, filterOption: filterOptions.relativePreset, selectedFilterOption: selectedFilterOption, onSelectedFilterOptionChange: onSelectedFilterOptionChange, className: isMobile ? ITEM_CLASS_MOBILE : undefined })) : null;
        };
        this.renderExcludeCurrent = () => {
            const { selectedFilterOption, onExcludeCurrentPeriodChange, excludeCurrentPeriod, isExcludeCurrentPeriodEnabled, } = this.props;
            return (React.createElement(ExcludeCurrentPeriodToggle, { value: excludeCurrentPeriod, onChange: onExcludeCurrentPeriodChange, disabled: !isExcludeCurrentPeriodEnabled, granularity: getDateFilterOptionGranularity(selectedFilterOption) }));
        };
        this.calculateHeight = (showExcludeCurrent) => {
            // Mobile in Horizontal Layout
            if (window.innerHeight <= MOBILE_WIDTH) {
                const excludeOpenPeriodHeight = showExcludeCurrent ? EXCLUDE_OPEN_PERIOD_HEIGHT : 0;
                return window.innerHeight - excludeOpenPeriodHeight - ACTIONS_BUTTONS_HEIGHT - MARGIN_BOTTOM;
            }
            return undefined;
        };
    }
    componentDidMount() {
        // Dropdown component does not expose isOpened prop but it mounts
        // this component every time it is opened and un-mounts when closed
        if (this.props.isMobile) {
            if (isAbsoluteDateFilterForm(this.props.selectedFilterOption)) {
                this.changeRoute("absoluteForm");
            }
            else if (isRelativeDateFilterForm(this.props.selectedFilterOption)) {
                this.changeRoute("relativeForm");
            }
        }
    }
    render() {
        const { isExcludeCurrentPeriodEnabled, isMobile, isEditMode, onApplyClick, onCancelClick, closeDropdown, selectedFilterOption, dateFilterButton, errors, } = this.props;
        const { route } = this.state;
        const showExcludeCurrent = !isMobile || isExcludeCurrentPeriodEnabled;
        const bodyHeight = this.calculateHeight(showExcludeCurrent);
        let wrapperStyle = {};
        let scrollerStyle = {};
        if (bodyHeight) {
            // display: flex causes the scroller is cut off when scrolling
            wrapperStyle = { display: "block", height: `${bodyHeight}px` };
            scrollerStyle = { minHeight: `${bodyHeight}px` };
        }
        return (React.createElement("div", { className: "gd-extended-date-filter-container" },
            React.createElement("div", { className: cx("gd-extended-date-filter-body", "s-extended-date-filters-body", isMobile && "gd-extended-date-filter-body-mobile") },
                route === null && isMobile ? (React.createElement("div", { onClick: () => {
                        onCancelClick();
                        closeDropdown();
                    } }, dateFilterButton)) : null,
                React.createElement("div", { className: cx("gd-extended-date-filter-body-wrapper", {
                        "gd-extended-date-filter-body-wrapper-wide": isRelativeDateFilterForm(selectedFilterOption),
                    }), style: wrapperStyle },
                    isEditMode && !isMobile ? React.createElement(EditModeMessage, null) : null,
                    isMobile ? (this.renderMobileContent()) : (React.createElement(VisibleScrollbar, { className: "gd-extended-date-filter-body-scrollable", style: scrollerStyle }, this.renderDefaultContent()))),
                showExcludeCurrent ? this.renderExcludeCurrent() : null,
                React.createElement("div", { className: cx("gd-extended-date-filter-actions") },
                    React.createElement("div", { className: "gd-extended-date-filter-actions-buttons" },
                        React.createElement(DateFilterBodyButton, { messageId: "cancel", className: "gd-button-secondary gd-button-small s-date-filter-cancel", onClick: () => {
                                onCancelClick();
                                closeDropdown();
                            } }),
                        React.createElement(DateFilterBodyButton, { messageId: "apply", className: "gd-button-action gd-button-small s-date-filter-apply", disabled: !isEmpty(errors), onClick: () => {
                                onApplyClick();
                                closeDropdown();
                            } }))))));
    }
    renderMobileContent() {
        const { route } = this.state;
        if (route === "absoluteForm") {
            return (React.createElement(React.Fragment, null,
                React.createElement(DateFilterHeader, { changeRoute: this.changeRoute },
                    React.createElement(FormattedMessage, { id: "filters.staticPeriod" })),
                this.renderAbsoluteForm()));
        }
        if (route === "relativeForm") {
            return isEmpty(this.props.availableGranularities) ? null : (React.createElement(React.Fragment, null,
                React.createElement(DateFilterHeader, { changeRoute: this.changeRoute },
                    React.createElement(FormattedMessage, { id: "filters.floatingRange" })),
                this.renderRelativeForm()));
        }
        return this.renderDefaultContent();
    }
    renderDefaultContent() {
        return (React.createElement(React.Fragment, null,
            this.renderAllTime(),
            this.renderAbsoluteForm(),
            !isEmpty(this.props.availableGranularities) ? this.renderRelativeForm() : null,
            this.renderAbsolutePreset(),
            this.renderRelativePreset()));
    }
}
//# sourceMappingURL=DateFilterBody.js.map