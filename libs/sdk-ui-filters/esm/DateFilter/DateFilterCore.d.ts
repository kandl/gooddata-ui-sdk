import React from "react";
import { DateFilterGranularity, WeekStart } from "@gooddata/sdk-model";
import { IExtendedDateFilterErrors, IDateFilterOptionsByType, DateFilterOption } from "./interfaces/index.js";
export interface IDateFilterCoreProps {
    dateFormat: string;
    filterOptions: IDateFilterOptionsByType;
    /**
     * Filter option currently selected, it would be applied on Apply click.
     */
    selectedFilterOption: DateFilterOption;
    onSelectedFilterOptionChange: (option: DateFilterOption) => void;
    /**
     * Filter option selected before the filter dialog was opened.
     */
    originalSelectedFilterOption: DateFilterOption;
    excludeCurrentPeriod: boolean;
    originalExcludeCurrentPeriod: boolean;
    isExcludeCurrentPeriodEnabled: boolean;
    onExcludeCurrentPeriodChange: (isExcluded: boolean) => void;
    isTimeForAbsoluteRangeEnabled: boolean;
    availableGranularities: DateFilterGranularity[];
    isEditMode: boolean;
    locale?: string;
    customFilterName?: string;
    disabled?: boolean;
    onApplyClick: () => void;
    onCancelClick: () => void;
    onDropdownOpenChanged: (isOpen: boolean) => void;
    errors?: IExtendedDateFilterErrors;
    weekStart?: WeekStart;
}
export declare const verifyDateFormat: (dateFormat: string) => string;
export declare const DateFilterCore: React.FC<IDateFilterCoreProps>;
