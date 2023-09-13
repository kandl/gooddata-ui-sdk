import React from "react";
import { WrappedComponentProps } from "react-intl";
import { ISeparators } from "@gooddata/sdk-ui";
import { IFormatPreset } from "../typings.js";
import { IPositioning } from "../../typings/positioning.js";
interface IMeasureNumberFormatDropdownOwnProps {
    presets: ReadonlyArray<IFormatPreset>;
    customPreset: IFormatPreset;
    selectedPreset: IFormatPreset;
    separators: ISeparators;
    onSelect: (selectedPreset: IFormatPreset) => void;
    onClose: () => void;
    anchorEl?: string | HTMLElement;
    positioning?: IPositioning[];
}
type IMeasureNumberFormatDropdownProps = IMeasureNumberFormatDropdownOwnProps & WrappedComponentProps;
export declare class PresetsDropdown extends React.PureComponent<IMeasureNumberFormatDropdownProps> {
    static defaultProps: Pick<IMeasureNumberFormatDropdownProps, "positioning">;
    render(): JSX.Element;
    private renderPresetOption;
    private renderCustomFormatItem;
}
export {};
//# sourceMappingURL=PresetsDropdown.d.ts.map