/// <reference types="lodash" resolution-mode="require"/>
import React from "react";
import { WeekStart } from "@gooddata/sdk-model";
import { WrappedComponentProps } from "react-intl";
import { IAlignPoint } from "../typings/positioning.js";
/**
 * @internal
 */
export interface IDatePickerOwnProps {
    date?: Date;
    className?: string;
    placeholder?: string;
    onChange?: (selectedData: Date) => void;
    resetOnInvalidValue?: boolean;
    size?: string;
    tabIndex?: number;
    alignPoints?: IAlignPoint[];
    onAlign?: (align: string) => void;
    locale?: string;
    dateFormat?: string;
    weekStart?: WeekStart;
}
export type DatePickerProps = IDatePickerOwnProps & WrappedComponentProps;
interface IDatePickerState {
    align: string;
    selectedDate: Date | undefined;
    monthDate: Date | undefined;
    isOpen: boolean;
    inputValue: string;
}
export declare class WrappedDatePicker extends React.PureComponent<DatePickerProps, IDatePickerState> {
    private rootRef;
    private datePickerContainerRef;
    private inputRef;
    static defaultProps: {
        className: string;
        date: Date;
        placeholder: string;
        onChange: (...args: any[]) => void;
        resetOnInvalidValue: boolean;
        size: string;
        tabIndex: number;
        alignPoints: {
            align: string;
        }[];
        onAlign: (...args: any[]) => void;
        dateFormat: string;
        weekStart: "Sunday";
    };
    constructor(props: DatePickerProps);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: DatePickerProps): void;
    componentWillUnmount(): void;
    private handleClickOutside;
    componentDidUpdate(_prevProps: DatePickerProps, prevState: IDatePickerState): void;
    private setComponentRef;
    private getInputClasses;
    private getComponentClasses;
    private getOverlayWrapperClasses;
    resizeHandler: import("lodash").DebouncedFunc<() => void>;
    private updateDate;
    private handleInputChanged;
    private handleDayChanged;
    private handleMonthChanged;
    private normalizeDate;
    private alignDatePicker;
    private onKeyDown;
    private handleWrapperClick;
    render(): React.ReactNode;
}
/**
 * @internal
 */
export declare class Datepicker extends React.PureComponent<IDatePickerOwnProps> {
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=Datepicker.d.ts.map