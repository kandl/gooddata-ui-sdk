import React from "react";
import { RankingFilterOperator } from "@gooddata/sdk-model";
interface IOperatorDropdownItemProps {
    title: string;
    value: RankingFilterOperator;
    isSelected: boolean;
    onSelect: (value: RankingFilterOperator) => void;
}
export declare const OperatorDropdownItem: React.FC<IOperatorDropdownItemProps>;
export {};
