import React from "react";
import { ICatalogDateDataset, IWidget, ObjRef } from "@gooddata/sdk-model";
interface IDateFilterCheckboxProps {
    widget: IWidget;
    relatedDateDatasets: readonly ICatalogDateDataset[] | undefined;
    isDropdownLoading?: boolean;
    isFilterLoading?: boolean;
    selectedDateDataset?: ICatalogDateDataset;
    dateFilterEnabled?: boolean;
    selectedDateDatasetHidden?: boolean;
    dateFilterCheckboxDisabled?: boolean;
    onDateDatasetFilterEnabled: (enabled: boolean, dateDatasetRef: ObjRef | undefined) => void;
}
export declare const DateFilterCheckbox: React.FC<IDateFilterCheckboxProps>;
export {};
