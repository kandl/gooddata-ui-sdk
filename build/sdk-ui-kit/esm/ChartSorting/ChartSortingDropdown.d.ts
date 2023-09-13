import React from "react";
import { IntlShape } from "react-intl";
import { ISortItem } from "@gooddata/sdk-model";
import { IAvailableSortsGroup, IBucketItemDescriptors } from "./types.js";
interface ChartSortingProps {
    currentSort: ISortItem[];
    availableSorts: IAvailableSortsGroup[];
    bucketItems: IBucketItemDescriptors;
    intl: IntlShape;
    onSelect: (item: ISortItem[]) => void;
    enableRenamingMeasureToMetric?: boolean;
}
export declare const ChartSortingDropdown: React.FC<ChartSortingProps>;
export {};
//# sourceMappingURL=ChartSortingDropdown.d.ts.map