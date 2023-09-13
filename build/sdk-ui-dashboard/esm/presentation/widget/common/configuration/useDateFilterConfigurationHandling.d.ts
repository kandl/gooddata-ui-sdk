import { ICatalogDateDataset, IWidget, ObjRef } from "@gooddata/sdk-model";
export declare function useDateFilterConfigurationHandling(widget: IWidget, relatedDateDatasets: readonly ICatalogDateDataset[] | undefined, onAppliedChanged: (applied: boolean) => void): {
    status: "error" | "loading" | "ok";
    handleDateDatasetChanged: (id: string) => void;
    handleDateFilterEnabled: (enabled: boolean, dateDatasetRef: ObjRef | undefined) => void;
};
