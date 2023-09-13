import React from "react";
import { RankingFilterOperator } from "@gooddata/sdk-model";
import { WrappedComponentProps } from "react-intl";
interface IOperatorDropdownComponentOwnProps {
    selectedValue: RankingFilterOperator;
    onSelect: (value: RankingFilterOperator) => void;
}
type OperatorDropdownComponentProps = IOperatorDropdownComponentOwnProps & WrappedComponentProps;
export declare const OperatorDropdown: React.FC<import("react-intl").WithIntlProps<OperatorDropdownComponentProps>> & {
    WrappedComponent: React.ComponentType<OperatorDropdownComponentProps>;
};
export {};
