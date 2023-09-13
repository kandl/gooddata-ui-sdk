import React from "react";
import { WrappedComponentProps } from "react-intl";
import { ISeparators } from "@gooddata/sdk-ui";
import { IPositioning } from "../../typings/positioning.js";
import { IFormatTemplate } from "../typings.js";
interface ICustomFormatDialogOwnProps {
    onApply: (formatString: string) => void;
    onCancel: () => void;
    formatString: string;
    documentationLink?: string;
    anchorEl?: string | HTMLElement;
    positioning?: IPositioning[];
    separators?: ISeparators;
    locale?: string;
    templates?: ReadonlyArray<IFormatTemplate>;
}
interface ICustomFormatDialogState {
    format: string;
}
type ICustomFormatDialogProps = ICustomFormatDialogOwnProps & WrappedComponentProps;
export declare class CustomFormatDialog extends React.PureComponent<ICustomFormatDialogProps, ICustomFormatDialogState> {
    static defaultProps: Pick<ICustomFormatDialogProps, "positioning">;
    readonly state: Readonly<ICustomFormatDialogState>;
    render(): JSX.Element;
    private onApply;
    private isApplyButtonDisabled;
    private onFormatChange;
}
export {};
//# sourceMappingURL=CustomFormatDialog.d.ts.map