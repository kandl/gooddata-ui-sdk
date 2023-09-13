import React from "react";
import { IntlShape } from "react-intl";
import { ISortItem } from "@gooddata/sdk-model";
import { IAvailableSortsGroup, IBucketItemDescriptors } from "../types.js";
interface AttributeDropdownProps {
    currentSortItem: ISortItem;
    availableSorts: IAvailableSortsGroup;
    bucketItems: IBucketItemDescriptors;
    intl: IntlShape;
    index: number;
    onSelect: (item: ISortItem) => void;
    enableRenamingMeasureToMetric?: boolean;
}
export declare const AttributeDropdown: React.FC<AttributeDropdownProps>;
export {};
//# sourceMappingURL=AttributeDropdown.d.ts.map