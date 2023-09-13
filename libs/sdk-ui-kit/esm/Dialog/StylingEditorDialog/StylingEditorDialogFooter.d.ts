/// <reference types="react" />
import { IDialogBaseProps } from "../typings.js";
/**
 * @internal
 */
export interface IStylingEditorDialogFooterProps extends IDialogBaseProps {
    link: {
        text: string;
        url: string;
    };
    disableSubmit?: boolean;
    showProgressIndicator?: boolean;
    errorMessage?: string;
    onHelpClick?: () => void;
}
/**
 * @internal
 */
export declare const StylingEditorDialogFooter: (props: IStylingEditorDialogFooterProps) => JSX.Element;
//# sourceMappingURL=StylingEditorDialogFooter.d.ts.map