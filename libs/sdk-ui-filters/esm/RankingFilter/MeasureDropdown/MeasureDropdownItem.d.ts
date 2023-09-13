import React from "react";
import { ObjRefInScope } from "@gooddata/sdk-model";
import { IMeasureDropdownItem } from "../types.js";
interface IMeasureDropdownItemProps {
    item: IMeasureDropdownItem;
    isSelected: boolean;
    onSelect: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOver?: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOut?: () => void;
    enableRenamingMeasureToMetric?: boolean;
}
export declare const MeasureDropdownItem: React.FC<IMeasureDropdownItemProps>;
export {};
