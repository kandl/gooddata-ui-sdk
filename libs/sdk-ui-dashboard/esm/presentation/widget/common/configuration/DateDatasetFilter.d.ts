import React from "react";
import { ICatalogDateDataset, IWidget } from "@gooddata/sdk-model";
interface IDateDatasetFilterProps {
    widget: IWidget;
    relatedDateDatasets: readonly ICatalogDateDataset[] | undefined;
    isDatasetsLoading: boolean;
    dateFromVisualization?: ICatalogDateDataset;
    dateFilterCheckboxDisabled: boolean;
    shouldPickDateDataset?: boolean;
    shouldOpenDateDatasetPicker?: boolean;
    isLoadingAdditionalData?: boolean;
    onDateDatasetChanged?: (id: string) => void;
}
export declare const DateDatasetFilter: React.FC<IDateDatasetFilterProps>;
export {};
