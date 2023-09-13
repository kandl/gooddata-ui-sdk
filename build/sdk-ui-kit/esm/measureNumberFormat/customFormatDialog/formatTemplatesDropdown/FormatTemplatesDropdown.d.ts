import React from "react";
import { ISeparators } from "@gooddata/sdk-ui";
import { IFormatTemplate } from "../../typings.js";
interface ICustomFormatTemplatesState {
    isOpened: boolean;
}
export type OnChange = (formatString: string) => void;
export interface ICustomFormatTemplatesProps {
    onChange: OnChange;
    separators?: ISeparators;
    templates: ReadonlyArray<IFormatTemplate>;
}
export declare class FormatTemplatesDropdown extends React.Component<ICustomFormatTemplatesProps, ICustomFormatTemplatesState> {
    state: {
        isOpened: boolean;
    };
    render(): JSX.Element;
    private closeDropdown;
    private onSelect;
    private toggleDropdown;
}
export {};
//# sourceMappingURL=FormatTemplatesDropdown.d.ts.map