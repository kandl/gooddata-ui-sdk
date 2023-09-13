import { IAvailableDrillTargetMeasure } from "@gooddata/sdk-ui";
import React from "react";
export interface IDrillMeasureSelectorItemProps {
    item: IAvailableDrillTargetMeasure;
    onClick: (item: IAvailableDrillTargetMeasure) => void;
    onCloseDropdown: () => void;
}
declare const DrillMeasureSelectorItem: React.FunctionComponent<IDrillMeasureSelectorItemProps>;
export default DrillMeasureSelectorItem;
