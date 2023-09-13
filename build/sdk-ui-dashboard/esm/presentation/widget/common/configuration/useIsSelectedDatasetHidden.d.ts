import { ObjRef } from "@gooddata/sdk-model";
export declare function useIsSelectedDatasetHidden(selectedDateDatasetRef: ObjRef | undefined): {
    selectedDateDatasetHiddenByObjectAvailability: boolean;
    status: "error" | "loading" | "pending" | "success";
};
