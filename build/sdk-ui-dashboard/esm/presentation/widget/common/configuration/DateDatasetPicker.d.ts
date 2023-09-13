import React from "react";
import { ICatalogDateDataset, IWidget } from "@gooddata/sdk-model";
export interface IDateDatasetPickerProps {
    autoOpen?: boolean;
    widget: IWidget;
    relatedDateDatasets: readonly ICatalogDateDataset[] | undefined;
    selectedDateDataset?: ICatalogDateDataset;
    selectedDateDatasetHidden?: boolean;
    unrelatedDateDataset?: ICatalogDateDataset;
    dateFromVisualization?: ICatalogDateDataset;
    onDateDatasetChange: (id: string) => void;
    className?: string;
    isLoading?: boolean;
}
export declare const DateDatasetPicker: React.FC<IDateDatasetPickerProps>;
