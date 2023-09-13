import React from "react";
import { IExportDialogBaseProps } from "@gooddata/sdk-ui-kit";
export interface ExportDialogConfig extends Omit<IExportDialogBaseProps, "children"> {
    onSubmit?: (params: {
        includeFilterContext: boolean;
        mergeHeaders: boolean;
    }) => void;
}
/**
 * @internal
 */
export interface IExportDialogContext {
    isOpen: boolean;
    dialogConfig: ExportDialogConfig;
    openDialog: (config?: ExportDialogConfig) => void;
    closeDialog: () => void;
}
/**
 * @internal
 */
export declare const useExportDialogContext: () => IExportDialogContext;
/**
 * @internal
 */
export declare const ExportDialogContextProvider: React.FC<{
    children?: React.ReactNode;
}>;
