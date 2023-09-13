import React from "react";
import { WrappedComponentProps } from "react-intl";
interface IDateTimePickerOwnProps {
    placeholderDate: string;
    dateFormat: string;
    onChange: (value: Date) => void;
    value: Date;
    handleDayClick: () => void;
    isMobile: boolean;
    isTimeEnabled: boolean;
    className: string;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    defaultTime?: string;
    error?: boolean;
}
type DateTimePickerComponentProps = IDateTimePickerOwnProps & WrappedComponentProps;
declare const DateTimePickerWithInt: React.ForwardRefExoticComponent<Omit<import("react-intl").WithIntlProps<React.PropsWithChildren<IDateTimePickerOwnProps & WrappedComponentProps & React.RefAttributes<HTMLInputElement>>>, "ref"> & React.RefAttributes<any>> & {
    WrappedComponent: React.ComponentType<IDateTimePickerOwnProps & WrappedComponentProps & React.RefAttributes<HTMLInputElement>>;
};
export { DateTimePickerWithInt, DateTimePickerComponentProps };
