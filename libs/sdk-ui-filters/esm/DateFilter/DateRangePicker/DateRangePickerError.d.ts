import React from "react";
import { WrappedComponentProps } from "react-intl";
interface IDateRangePickerErrorProps {
    dateFormat?: string;
    errorId: string;
}
export declare const DateRangePickerError: React.FC<import("react-intl").WithIntlProps<IDateRangePickerErrorProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IDateRangePickerErrorProps & WrappedComponentProps>;
};
export {};
