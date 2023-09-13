import React from "react";
import { WrappedComponentProps } from "react-intl";
import { ISeparators } from "@gooddata/sdk-ui";
import { IMeasureValueFilterValue, MeasureValueFilterOperator } from "./types.js";
import { WarningMessage } from "./typings.js";
interface IDropdownBodyOwnProps {
    operator: MeasureValueFilterOperator;
    value: IMeasureValueFilterValue;
    usePercentage?: boolean;
    warningMessage?: WarningMessage;
    locale?: string;
    disableAutofocus?: boolean;
    onCancel?: () => void;
    onApply: (operator: MeasureValueFilterOperator | null, value: IMeasureValueFilterValue, treatNullValuesAsZero: boolean) => void;
    separators?: ISeparators;
    displayTreatNullAsZeroOption?: boolean;
    treatNullAsZeroValue?: boolean;
    valuePrecision?: number;
    enableOperatorSelection?: boolean;
}
type IDropdownBodyProps = IDropdownBodyOwnProps & WrappedComponentProps;
export declare const DropdownBodyWithIntl: React.FC<import("react-intl").WithIntlProps<IDropdownBodyProps>> & {
    WrappedComponent: React.ComponentType<IDropdownBodyProps>;
};
export declare class DropdownBody extends React.PureComponent<IDropdownBodyOwnProps> {
    render(): JSX.Element;
}
export {};
