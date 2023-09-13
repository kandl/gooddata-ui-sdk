import React from "react";
import { ICancelEditDialogProps } from "./types.js";
/**
 * @internal
 */
export declare const useCancelEditDialog: () => {
    onCancel: () => {
        payload: undefined;
        type: "uiSlice/closeCancelEditModeDialog";
    };
    onSubmit: () => void;
};
/**
 * @internal
 */
export declare const DefaultCancelEditDialog: React.FC<ICancelEditDialogProps>;
