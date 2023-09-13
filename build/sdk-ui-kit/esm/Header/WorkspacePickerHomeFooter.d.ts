import React from "react";
import { ITheme } from "@gooddata/sdk-model";
/**
 * @internal
 */
export interface IWorkspacePickerHomeFooterProps {
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    className?: string;
    theme?: ITheme;
    children?: React.ReactNode;
}
/**
 * @internal
 */
export declare const WorkspacePickerHomeFooter: React.ComponentType<Omit<IWorkspacePickerHomeFooterProps, "theme" | "themeIsLoading">>;
//# sourceMappingURL=WorkspacePickerHomeFooter.d.ts.map