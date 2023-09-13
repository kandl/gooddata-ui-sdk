import React from "react";
import { ISeparators } from "@gooddata/sdk-ui";
interface IExtendedPreviewState {
    expanded: boolean;
}
interface IExtendedPreviewProps {
    format: string;
    separators?: ISeparators;
}
export declare class ExtendedPreview extends React.Component<IExtendedPreviewProps, IExtendedPreviewState> {
    state: IExtendedPreviewState;
    render(): JSX.Element;
    private openExtendedPreview;
}
export {};
//# sourceMappingURL=ExtendedPreview.d.ts.map