import React from "react";
import { ISeparators } from "@gooddata/sdk-ui";
import { IFormatPreset } from "../typings.js";
interface IMeasureNumberFormatDropdownItemProps {
    preset: IFormatPreset;
    separators: ISeparators;
    onClick: (selectedPreset: IFormatPreset) => void;
    isSelected?: boolean;
}
export declare class PresetsDropdownItem extends React.PureComponent<IMeasureNumberFormatDropdownItemProps> {
    static defaultProps: Pick<IMeasureNumberFormatDropdownItemProps, "isSelected">;
    render(): JSX.Element;
    private handleOnClick;
}
export {};
//# sourceMappingURL=PresetsDropdownItem.d.ts.map