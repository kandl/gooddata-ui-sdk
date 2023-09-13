import React from "react";
import { ObjRefInScope } from "@gooddata/sdk-model";
import { IMeasureDropdownItem } from "../types.js";
interface IMeasureDropdownProps {
    items: IMeasureDropdownItem[];
    selectedItemRef: ObjRefInScope;
    onSelect: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOver?: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOut?: () => void;
    enableRenamingMeasureToMetric?: boolean;
}
export declare const MeasureDropdown: React.FC<IMeasureDropdownProps>;
export {};
