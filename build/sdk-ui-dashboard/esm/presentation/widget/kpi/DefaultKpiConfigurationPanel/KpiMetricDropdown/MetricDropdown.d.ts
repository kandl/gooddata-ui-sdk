import React from "react";
import { IMeasureMetadataObject, ObjRef } from "@gooddata/sdk-model";
interface IMetricDropdownProps {
    workspace: string;
    openOnInit?: boolean;
    selectedItems: ObjRef[];
    bodyClassName: string;
    onSelect: (item: IMeasureMetadataObject) => void;
}
export declare const MetricDropdown: React.FC<IMetricDropdownProps>;
export {};
