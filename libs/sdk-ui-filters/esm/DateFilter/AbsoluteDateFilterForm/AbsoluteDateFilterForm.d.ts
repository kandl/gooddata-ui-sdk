import React from "react";
import { IAbsoluteDateFilterForm, WeekStart } from "@gooddata/sdk-model";
import { IExtendedDateFilterErrors, DateFilterOption } from "../interfaces/index.js";
/**
 * @internal
 */
export interface IAbsoluteDateFilterFormProps {
    dateFormat: string;
    selectedFilterOption: IAbsoluteDateFilterForm;
    isMobile: boolean;
    errors: IExtendedDateFilterErrors["absoluteForm"];
    onSelectedFilterOptionChange: (option: DateFilterOption) => void;
    isTimeEnabled: boolean;
    weekStart?: WeekStart;
    shouldOverlayDatePicker?: boolean;
}
/**
 * @internal
 */
export declare class AbsoluteDateFilterForm extends React.Component<IAbsoluteDateFilterFormProps> {
    render(): JSX.Element;
    private handleRangeChange;
}
