import { ICatalogDateDataset } from "@gooddata/sdk-model";
export declare function useDateDatasetFilter(dateDatasets: Readonly<ICatalogDateDataset[]> | undefined): {
    handleDateDatasetChanged: () => void;
    shouldOpenDateDatasetPicker: boolean | undefined;
};
