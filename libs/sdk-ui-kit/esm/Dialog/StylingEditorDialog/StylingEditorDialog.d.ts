/// <reference types="react" />
import { IColorPalette, ITheme, ObjRef } from "@gooddata/sdk-model";
import { IStylingEditorDialogFooterProps } from "./StylingEditorDialogFooter.js";
/**
 * @internal
 */
export type StylingPickerItemContent = ITheme | IColorPalette;
/**
 * @internal
 */
export interface IStylingPickerItem<T extends StylingPickerItemContent> {
    name?: string;
    ref?: ObjRef;
    content: T;
}
/**
 * @internal
 */
export interface IStylingEditorDialogProps<T extends StylingPickerItemContent> extends IStylingEditorDialogFooterProps {
    title: string;
    tooltip?: string;
    stylingItem?: IStylingPickerItem<T>;
    examples?: IStylingPickerItem<T>[];
    exampleToColorPreview?: (example: T) => string[];
    locale?: string;
    onExit?: (name: string, definition: string) => void;
    onInvalidDefinition?: (ref: ObjRef) => void;
    showBackButton?: boolean;
}
/**
 * @internal
 */
export declare const StylingEditorDialog: <T extends StylingPickerItemContent>(props: IStylingEditorDialogProps<T>) => JSX.Element;
//# sourceMappingURL=StylingEditorDialog.d.ts.map