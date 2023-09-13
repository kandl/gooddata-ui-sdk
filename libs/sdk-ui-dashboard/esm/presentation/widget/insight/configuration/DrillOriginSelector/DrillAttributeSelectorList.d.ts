import { IAvailableDrillTargetAttribute } from "@gooddata/sdk-ui";
import React from "react";
export interface IDrillAttributeSelectorListProps {
    supportedItems: IAvailableDrillTargetAttribute[];
    onSelect: (item: IAvailableDrillTargetAttribute) => void;
    onCloseDropdown: () => void;
}
declare const DrillAttributeSelectorList: React.FunctionComponent<IDrillAttributeSelectorListProps>;
export default DrillAttributeSelectorList;
