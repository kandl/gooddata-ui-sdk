import React from "react";
import { IAvailableDrillTargetAttribute } from "@gooddata/sdk-ui";
export interface IDrillAttributeSelectorItemStateProps {
    isDateAttribute: boolean;
}
export interface IFilterDrillAttributeSelectorItemProps {
    item: IAvailableDrillTargetAttribute;
    onClick: (item: IAvailableDrillTargetAttribute) => void;
    onCloseDropdown: () => void;
}
export declare const DrillAttributeSelectorItem: React.FunctionComponent<IFilterDrillAttributeSelectorItemProps>;
