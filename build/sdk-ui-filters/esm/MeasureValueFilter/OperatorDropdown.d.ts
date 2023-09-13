import React from "react";
import { WrappedComponentProps } from "react-intl";
import { MeasureValueFilterOperator } from "./types.js";
interface IOperatorDropdownOwnProps {
    onSelect: (operator: MeasureValueFilterOperator) => void;
    operator: MeasureValueFilterOperator;
    isDisabled?: boolean;
}
type IOperatorDropdownProps = IOperatorDropdownOwnProps & WrappedComponentProps;
interface IOperatorDropdownState {
    opened: boolean;
}
export declare class OperatorDropdown extends React.PureComponent<IOperatorDropdownProps, IOperatorDropdownState> {
    state: IOperatorDropdownState;
    render(): JSX.Element;
    private renderDropdownButton;
    private handleOperatorSelected;
    private closeOperatorDropdown;
    private handleOperatorDropdownButtonClick;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IOperatorDropdownProps>> & {
    WrappedComponent: React.ComponentType<IOperatorDropdownProps>;
};
export default _default;
