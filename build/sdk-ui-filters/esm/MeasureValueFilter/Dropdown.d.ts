import React from "react";
import { WrappedComponentProps } from "react-intl";
import { ISeparators } from "@gooddata/sdk-ui";
import { MeasureValueFilterOperator, IMeasureValueFilterValue } from "./types.js";
import { WarningMessage } from "./typings.js";
interface IDropdownOwnProps {
    onApply: (operator: string, value: IMeasureValueFilterValue, treatNullValuesAsZero: boolean) => void;
    onCancel: () => void;
    operator?: MeasureValueFilterOperator;
    value?: IMeasureValueFilterValue;
    usePercentage?: boolean;
    warningMessage?: WarningMessage;
    locale?: string;
    anchorEl: HTMLElement | string;
    separators?: ISeparators;
    displayTreatNullAsZeroOption?: boolean;
    treatNullAsZeroValue?: boolean;
    enableOperatorSelection?: boolean;
}
type IDropdownProps = WrappedComponentProps & IDropdownOwnProps;
interface IDropdownState {
    displayDropdown: boolean;
}
export declare const DropdownWithIntl: React.FC<import("react-intl").WithIntlProps<IDropdownProps>> & {
    WrappedComponent: React.ComponentType<IDropdownProps>;
};
export declare class Dropdown extends React.PureComponent<IDropdownOwnProps, IDropdownState> {
    render(): JSX.Element;
}
export {};
