import { IWidget, ObjRef } from "@gooddata/sdk-model";
export declare function useAttributeFilterConfigurationHandling(widget: IWidget, displayFormRef: ObjRef, onAppliedChanged: (applied: boolean) => void): {
    status: "error" | "loading" | "ok";
    handleIgnoreChanged: (ignored: boolean) => void;
};
