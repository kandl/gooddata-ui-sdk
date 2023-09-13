import React from "react";
import { WrappedComponentProps } from "react-intl";
import { ISeparators } from "@gooddata/sdk-ui";
import { IFormatPreset, IFormatTemplate, IToggleButtonProps } from "./typings.js";
import { IPositioning } from "../typings/positioning.js";
export declare const CUSTOM_FORMAT_PRESET_LOCAL_IDENTIFIER = "customFormat";
/**
 * @internal
 */
export interface IMeasureNumberFormatOwnProps {
    toggleButton: React.ComponentType<IToggleButtonProps>;
    presets: ReadonlyArray<IFormatPreset>;
    separators: ISeparators;
    selectedFormat: string | null;
    setFormat: (format: string | null) => void;
    anchorElementSelector?: string;
    presetsDropdownPositioning?: IPositioning[];
    customFormatDialogPositioning?: IPositioning[];
    defaultCustomFormat?: string;
    documentationLink?: string;
    templates?: ReadonlyArray<IFormatTemplate>;
    locale?: string;
    disabled?: boolean;
}
export type MeasureNumberFormatProps = IMeasureNumberFormatOwnProps & WrappedComponentProps;
/**
 * @internal
 */
export declare class MeasureNumberFormat extends React.PureComponent<IMeasureNumberFormatOwnProps> {
    render(): JSX.Element;
}
//# sourceMappingURL=MeasureNumberFormat.d.ts.map