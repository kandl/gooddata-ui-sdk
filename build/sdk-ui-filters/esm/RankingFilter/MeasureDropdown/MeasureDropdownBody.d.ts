import React from "react";
import { ObjRefInScope } from "@gooddata/sdk-model";
import { IMeasureDropdownItem } from "../types.js";
interface IMeasureDropdownBodyProps {
    items: IMeasureDropdownItem[];
    selectedItemRef: ObjRefInScope;
    onSelect: (ref: ObjRefInScope) => void;
    onClose: () => void;
    onDropDownItemMouseOver?: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOut?: () => void;
    enableRenamingMeasureToMetric?: boolean;
}
export declare const MeasureDropdownBody: React.FC<IMeasureDropdownBodyProps>;
export {};
