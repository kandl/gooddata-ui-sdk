import React from "react";
import { WrappedComponentProps } from "react-intl";
import { ISeparators } from "@gooddata/sdk-ui";
interface ICustomFormatPreviewOwnProps {
    format: string;
    separators?: ISeparators;
}
interface ICustomFormatPreviewState {
    preview: number;
}
type ICustomFormatPreviewProps = ICustomFormatPreviewOwnProps & WrappedComponentProps;
export declare class Preview extends React.PureComponent<ICustomFormatPreviewProps, ICustomFormatPreviewState> {
    readonly state: Readonly<ICustomFormatPreviewState>;
    render(): JSX.Element;
    private onPreviewChange;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<ICustomFormatPreviewProps>> & {
    WrappedComponent: React.ComponentType<ICustomFormatPreviewProps>;
};
export default _default;
//# sourceMappingURL=Preview.d.ts.map