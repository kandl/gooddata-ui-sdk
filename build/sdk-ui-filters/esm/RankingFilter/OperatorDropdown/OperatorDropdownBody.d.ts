import React from "react";
import { WrappedComponentProps } from "react-intl";
import { RankingFilterOperator } from "@gooddata/sdk-model";
import { IOperatorDropdownItem } from "../types.js";
interface IOperatorDropdownBodyComponentOwnProps {
    items: IOperatorDropdownItem[];
    selectedValue: RankingFilterOperator;
    onSelect: (value: RankingFilterOperator) => void;
    onClose: () => void;
}
type OperatorDropdownBodyComponentProps = IOperatorDropdownBodyComponentOwnProps & WrappedComponentProps;
export declare const OperatorDropdownBody: React.FC<import("react-intl").WithIntlProps<OperatorDropdownBodyComponentProps>> & {
    WrappedComponent: React.ComponentType<OperatorDropdownBodyComponentProps>;
};
export {};
