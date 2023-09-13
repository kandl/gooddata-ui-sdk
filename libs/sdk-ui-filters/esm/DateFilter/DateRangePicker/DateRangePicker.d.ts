import React from "react";
import { DayPickerRangeProps } from "react-day-picker";
import { WrappedComponentProps } from "react-intl";
import { WeekStart } from "@gooddata/sdk-model";
import { IExtendedDateFilterErrors } from "../interfaces/index.js";
export interface IDateRange {
    from: Date;
    to: Date;
}
export interface IDateRangePickerProps {
    range: IDateRange;
    onRangeChange: (newRange: IDateRange) => void;
    errors?: IExtendedDateFilterErrors["absoluteForm"];
    dateFormat?: string;
    dayPickerProps?: DayPickerRangeProps;
    isMobile: boolean;
    isTimeEnabled: boolean;
    weekStart?: WeekStart;
    shouldOverlayDatePicker?: boolean;
}
type DateRangePickerProps = IDateRangePickerProps & WrappedComponentProps;
export declare const DateRangePicker: React.FC<import("react-intl").WithIntlProps<DateRangePickerProps>> & {
    WrappedComponent: React.ComponentType<DateRangePickerProps>;
};
export {};
