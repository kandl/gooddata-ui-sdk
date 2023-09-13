import React from "react";
import { IAvailableDrillTargets } from "@gooddata/sdk-ui";
import { IAvailableDrillTargetItem } from "../../../../drill/DrillSelect/types.js";
export interface IDrillOriginSelectorBodyProps {
    supportedItems: IAvailableDrillTargets;
    onSelect: (item: IAvailableDrillTargetItem) => void;
    onCloseDropdown: () => void;
}
declare const DrillOriginSelectorBody: React.FunctionComponent<IDrillOriginSelectorBodyProps>;
export default DrillOriginSelectorBody;
