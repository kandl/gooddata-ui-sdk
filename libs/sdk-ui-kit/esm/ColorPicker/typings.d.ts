import { ColorFormats } from "tinycolor2";
/**
 * @internal
 */
export interface IColorPickerProps {
    initialRgbColor: ColorFormats.RGB;
    onSubmit: (color: ColorFormats.RGB) => void;
    onCancel: () => void;
}
/**
 * @internal
 */
export interface IColorPickerState {
    draftHslColor: ColorFormats.HSL;
}
//# sourceMappingURL=typings.d.ts.map