import React from "react";
import { IAvailableDrillTargets } from "@gooddata/sdk-ui";
import { IAvailableDrillTargetItem } from "../../../../drill/DrillSelect/types.js";
export interface IDrillOriginSelectorProps {
    items: IAvailableDrillTargets;
    onSelect: (item: IAvailableDrillTargetItem) => void;
}
export declare const DrillOriginSelector: React.FunctionComponent<IDrillOriginSelectorProps>;
