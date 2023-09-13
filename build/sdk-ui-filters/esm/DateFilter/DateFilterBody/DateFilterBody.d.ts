import React from "react";
import { IExtendedDateFilterErrors, IDateFilterOptionsByType, DateFilterOption } from "../interfaces/index.js";
import { DateFilterRoute } from "./types.js";
import { DateFilterGranularity, WeekStart } from "@gooddata/sdk-model";
export interface IDateFilterBodyProps {
    dateFormat: string;
    filterOptions: IDateFilterOptionsByType;
    selectedFilterOption: DateFilterOption;
    onSelectedFilterOptionChange: (option: DateFilterOption) => void;
    excludeCurrentPeriod: boolean;
    isExcludeCurrentPeriodEnabled: boolean;
    onExcludeCurrentPeriodChange: (isExcluded: boolean) => void;
    isTimeForAbsoluteRangeEnabled: boolean;
    availableGranularities: DateFilterGranularity[];
    isEditMode: boolean;
    isMobile: boolean;
    onApplyClick: () => void;
    onCancelClick: () => void;
    closeDropdown: () => void;
    errors?: IExtendedDateFilterErrors;
    dateFilterButton: JSX.Element;
    weekStart?: WeekStart;
}
interface IDateFilterBodyState {
    route: DateFilterRoute;
}
export declare class DateFilterBody extends React.Component<IDateFilterBodyProps, IDateFilterBodyState> {
    state: IDateFilterBodyState;
    changeRoute: (route?: IDateFilterBodyState["route"]) => void;
    componentDidMount(): void;
    render(): JSX.Element;
    private renderAllTime;
    private renderAbsoluteForm;
    private renderRelativeForm;
    private renderAbsolutePreset;
    private renderRelativePreset;
    private renderExcludeCurrent;
    private renderMobileContent;
    private renderDefaultContent;
    private calculateHeight;
}
export {};
