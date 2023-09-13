import React from "react";
import { WrappedComponentProps } from "react-intl";
import { MeasureValueFilterOperator } from "./types.js";
interface IOperatorDropdownItemOwnProps {
    selectedOperator: MeasureValueFilterOperator;
    operator: MeasureValueFilterOperator;
    bubbleText?: string;
    onClick: (identifier: MeasureValueFilterOperator) => void;
}
type IOperatorDropdownItemProps = IOperatorDropdownItemOwnProps & WrappedComponentProps;
export declare class OperatorDropdownItem extends React.PureComponent<IOperatorDropdownItemProps> {
    static defaultProps: any;
    render(): JSX.Element;
    handleOnClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    private renderBubble;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IOperatorDropdownItemProps>> & {
    WrappedComponent: React.ComponentType<IOperatorDropdownItemProps>;
};
export default _default;
