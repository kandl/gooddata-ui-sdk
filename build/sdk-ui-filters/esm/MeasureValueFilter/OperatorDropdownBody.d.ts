import React from "react";
import { MeasureValueFilterOperator } from "./types.js";
import { WrappedComponentProps } from "react-intl";
interface IOperatorDropdownBodyOwnProps {
    selectedOperator: MeasureValueFilterOperator;
    onSelect: (operator: MeasureValueFilterOperator) => void;
    onClose: () => void;
    alignTo: string;
}
type IOperatorDropdownBodyProps = IOperatorDropdownBodyOwnProps & WrappedComponentProps;
declare const _default: React.FC<import("react-intl").WithIntlProps<IOperatorDropdownBodyProps>> & {
    WrappedComponent: React.ComponentType<IOperatorDropdownBodyProps>;
};
export default _default;
