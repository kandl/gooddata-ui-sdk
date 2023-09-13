import React from "react";
import { ObjRef } from "@gooddata/sdk-model";
interface IAttributeFilterConfigurationProps {
    closeHandler: () => void;
    filterRef?: ObjRef;
    filterByText: string;
    displayValuesAsText: string;
    titleText: string;
    resetTitleText: string;
    selectionTitleText: string;
    multiSelectionOptionText: string;
    singleSelectionOptionText: string;
    singleSelectionDisabledTooltip: string;
    parentFiltersDisabledTooltip: string;
}
export declare const AttributeFilterConfiguration: React.FC<IAttributeFilterConfigurationProps>;
export {};
