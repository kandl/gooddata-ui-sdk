import React from "react";
import { DateFilterGranularity, DashboardDateFilterConfigMode, WeekStart } from "@gooddata/sdk-model";
import { DateFilterOption, IDateFilterOptionsByType } from "./interfaces/index.js";
/**
 * Props of the {@link DateFilter} component that are reflected in the state.
 *
 * @public
 */
export interface IDateFilterStatePropsIntersection {
    excludeCurrentPeriod: boolean;
    selectedFilterOption: DateFilterOption;
}
/**
 * Props of the {@link DateFilter} component.
 *
 * @public
 */
export interface IDateFilterOwnProps extends IDateFilterStatePropsIntersection {
    filterOptions: IDateFilterOptionsByType;
    availableGranularities: DateFilterGranularity[];
    isEditMode?: boolean;
    customFilterName?: string;
    dateFilterMode: DashboardDateFilterConfigMode;
    dateFormat?: string;
    locale?: string;
    isTimeForAbsoluteRangeEnabled?: boolean;
    weekStart?: WeekStart;
}
/**
 * Callback props of the {@link DateFilter} component.
 *
 * @public
 */
export interface IDateFilterCallbackProps {
    onApply: (dateFilterOption: DateFilterOption, excludeCurrentPeriod: boolean) => void;
    onCancel?: () => void;
    onOpen?: () => void;
    onClose?: () => void;
}
/**
 * All the props of the {@link DateFilter} component.
 *
 * @public
 */
export interface IDateFilterProps extends IDateFilterOwnProps, IDateFilterCallbackProps {
}
/**
 * State of the {@link DateFilter} component.
 *
 * @public
 */
export interface IDateFilterState extends IDateFilterStatePropsIntersection {
    initExcludeCurrentPeriod: boolean;
    initSelectedFilterOption: DateFilterOption;
    isExcludeCurrentPeriodEnabled: boolean;
}
/**
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/date_filter_component.html | DateFilter} is a component for configuring a date filter value.
 *
 * @public
 */
export declare class DateFilter extends React.PureComponent<IDateFilterProps, IDateFilterState> {
    static defaultProps: Partial<IDateFilterProps>;
    static getDerivedStateFromProps(nextProps: IDateFilterProps, prevState: IDateFilterState): IDateFilterState;
    private static getStateFromProps;
    private static getStateFromSelectedOption;
    private static checkInitialFilterOption;
    constructor(props: IDateFilterProps);
    componentDidMount(): void;
    render(): JSX.Element;
    private handleApplyClick;
    private onChangesDiscarded;
    private onCancelClicked;
    private onDropdownOpenChanged;
    private handleExcludeCurrentPeriodChange;
    private handleSelectedFilterOptionChange;
}
