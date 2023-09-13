import { IAvailableDrillTargetMeasure } from "@gooddata/sdk-ui";
import React from "react";
export interface IDrillMeasureSelectorListProps {
    supportedItems: IAvailableDrillTargetMeasure[];
    onSelect: (item: IAvailableDrillTargetMeasure) => void;
    onCloseDropdown: () => void;
}
declare const DrillMeasureSelectorList: React.FunctionComponent<IDrillMeasureSelectorListProps>;
export default DrillMeasureSelectorList;
