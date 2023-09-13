import React from "react";
import { WrappedComponentProps } from "react-intl";
import { DateFilterOption } from "../interfaces/index.js";
interface IDateFilterTextLocalizedProps {
    dateFormat: string;
    filter: DateFilterOption;
}
export declare const DateFilterTextLocalized: React.FC<import("react-intl").WithIntlProps<IDateFilterTextLocalizedProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IDateFilterTextLocalizedProps & WrappedComponentProps>;
};
export {};
