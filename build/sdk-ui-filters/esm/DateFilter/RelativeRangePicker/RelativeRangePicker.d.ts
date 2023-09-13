import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IUiRelativeDateFilterForm, DateFilterOption } from "../interfaces/index.js";
interface IRelativeRangePickerProps {
    selectedFilterOption: IUiRelativeDateFilterForm;
    onSelectedFilterOptionChange: (dateFilterOption: DateFilterOption) => void;
    isMobile: boolean;
}
export declare const RelativeRangePicker: React.FC<import("react-intl").WithIntlProps<IRelativeRangePickerProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IRelativeRangePickerProps & WrappedComponentProps>;
};
export {};
