import React from "react";
import { IntlShape } from "react-intl";
import { ISortItem } from "@gooddata/sdk-model";
import { IBucketItemDescriptors, IAvailableSortsGroup } from "../types.js";
interface MeasureDropdownProps {
    currentItem: ISortItem;
    bucketItems: IBucketItemDescriptors;
    availableSorts: IAvailableSortsGroup;
    intl: IntlShape;
    onSelect: (newSortItem: ISortItem) => void;
    index: number;
    disabledExplanationTooltip?: string;
    enableRenamingMeasureToMetric?: boolean;
}
export declare const MeasureDropdown: React.FC<MeasureDropdownProps>;
export {};
//# sourceMappingURL=MeasureDropdown.d.ts.map