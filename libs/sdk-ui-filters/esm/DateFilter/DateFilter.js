// (C) 2007-2022 GoodData Corporation
import React from "react";
import isEqual from "lodash/isEqual.js";
import isNil from "lodash/isNil.js";
import noop from "lodash/noop.js";
import { isAbsoluteDateFilterForm, } from "@gooddata/sdk-model";
import { canExcludeCurrentPeriod } from "./utils/PeriodExclusion.js";
import { DateFilterCore } from "./DateFilterCore.js";
import { validateFilterOption } from "./validation/OptionValidation.js";
import { isUiRelativeDateFilterForm, } from "./interfaces/index.js";
import { DEFAULT_DATE_FORMAT } from "./constants/Platform.js";
import { normalizeSelectedFilterOption } from "./utils/FilterOptionNormalization.js";
/**
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/date_filter_component.html | DateFilter} is a component for configuring a date filter value.
 *
 * @public
 */
class DateFilter extends React.PureComponent {
    static getDerivedStateFromProps(nextProps, prevState) {
        if (!isEqual(nextProps.selectedFilterOption, prevState.initSelectedFilterOption) ||
            nextProps.excludeCurrentPeriod !== prevState.initExcludeCurrentPeriod) {
            return DateFilter.getStateFromProps(nextProps);
        }
        return null;
    }
    static getStateFromProps(props) {
        const canExcludeCurrent = canExcludeCurrentPeriod(props.selectedFilterOption);
        return {
            initSelectedFilterOption: props.selectedFilterOption,
            selectedFilterOption: props.selectedFilterOption,
            initExcludeCurrentPeriod: props.excludeCurrentPeriod,
            excludeCurrentPeriod: canExcludeCurrent ? props.excludeCurrentPeriod : false,
            isTimeForAbsoluteRangeEnabled: props.isTimeForAbsoluteRangeEnabled,
            isExcludeCurrentPeriodEnabled: canExcludeCurrent,
        };
    }
    constructor(props) {
        super(props);
        this.handleApplyClick = () => {
            const normalizedSelectedFilterOption = normalizeSelectedFilterOption(this.state.selectedFilterOption);
            this.props.onApply(normalizedSelectedFilterOption, this.state.excludeCurrentPeriod);
        };
        this.onChangesDiscarded = () => {
            this.setState(() => DateFilter.getStateFromProps(this.props));
        };
        this.onCancelClicked = () => {
            this.props.onCancel();
            this.onChangesDiscarded();
        };
        this.onDropdownOpenChanged = (isOpen) => {
            if (isOpen) {
                this.props.onOpen();
            }
            else {
                this.props.onClose();
                this.onChangesDiscarded();
            }
        };
        this.handleExcludeCurrentPeriodChange = (excludeCurrentPeriod) => {
            this.setState({ excludeCurrentPeriod });
        };
        this.handleSelectedFilterOptionChange = (selectedFilterOption) => {
            this.setState((state) => DateFilter.getStateFromSelectedOption(selectedFilterOption, state.excludeCurrentPeriod));
        };
        this.state = DateFilter.getStateFromProps(props);
    }
    componentDidMount() {
        DateFilter.checkInitialFilterOption(this.props.selectedFilterOption);
    }
    render() {
        const { customFilterName, dateFilterMode, dateFormat, filterOptions, selectedFilterOption: originalSelectedFilterOption, excludeCurrentPeriod: originalExcludeCurrentPeriod, availableGranularities, isEditMode, locale, isTimeForAbsoluteRangeEnabled, weekStart, } = this.props;
        const { excludeCurrentPeriod, selectedFilterOption, isExcludeCurrentPeriodEnabled } = this.state;
        return dateFilterMode === "hidden" ? null : (React.createElement(DateFilterCore, { availableGranularities: availableGranularities, customFilterName: customFilterName, dateFormat: dateFormat, disabled: dateFilterMode === "readonly", excludeCurrentPeriod: excludeCurrentPeriod, originalExcludeCurrentPeriod: originalExcludeCurrentPeriod, isExcludeCurrentPeriodEnabled: isExcludeCurrentPeriodEnabled, isTimeForAbsoluteRangeEnabled: isTimeForAbsoluteRangeEnabled, isEditMode: isEditMode, filterOptions: filterOptions, selectedFilterOption: selectedFilterOption, originalSelectedFilterOption: originalSelectedFilterOption, locale: locale, onApplyClick: this.handleApplyClick, onCancelClick: this.onCancelClicked, onDropdownOpenChanged: this.onDropdownOpenChanged, onExcludeCurrentPeriodChange: this.handleExcludeCurrentPeriodChange, onSelectedFilterOptionChange: this.handleSelectedFilterOptionChange, errors: validateFilterOption(selectedFilterOption), weekStart: weekStart }));
    }
}
DateFilter.defaultProps = {
    dateFormat: DEFAULT_DATE_FORMAT,
    isEditMode: false,
    isTimeForAbsoluteRangeEnabled: false,
    locale: "en-US",
    onCancel: noop,
    onOpen: noop,
    onClose: noop,
    weekStart: "Sunday",
};
DateFilter.getStateFromSelectedOption = (selectedFilterOption, excludeCurrentPeriod) => {
    const canExcludeCurrent = canExcludeCurrentPeriod(selectedFilterOption);
    return {
        selectedFilterOption,
        excludeCurrentPeriod: canExcludeCurrent ? excludeCurrentPeriod : false,
        isExcludeCurrentPeriodEnabled: canExcludeCurrent,
    };
};
DateFilter.checkInitialFilterOption = (filterOption) => {
    if (isAbsoluteDateFilterForm(filterOption) && (isNil(filterOption.from) || isNil(filterOption.to))) {
        console.warn("The default filter option is not valid. Values 'from' and 'to' from absoluteForm filter option must be specified.");
    }
    if (isUiRelativeDateFilterForm(filterOption) &&
        (isNil(filterOption.from) || isNil(filterOption.to))) {
        console.warn("The default filter option is not valid. Values 'from' and 'to' from relativeForm filter option must be specified.");
    }
};
export { DateFilter };
//# sourceMappingURL=DateFilter.js.map