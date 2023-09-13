import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IAlignPoint } from "@gooddata/sdk-ui-kit";
export interface IBubbleMessageOwnProps {
    showDisabledMessage: boolean;
    alignPoints?: IAlignPoint[];
    messageId?: string;
    className?: string;
    children?: React.ReactNode;
}
export type IBubbleMessageProps = IBubbleMessageOwnProps & WrappedComponentProps;
export declare class DisabledBubbleMessage extends React.PureComponent<IBubbleMessageProps> {
    static defaultProps: {
        alignPoints: {
            align: string;
        }[];
    };
    render(): JSX.Element;
    private getBubbleClassNames;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IBubbleMessageProps>> & {
    WrappedComponent: React.ComponentType<IBubbleMessageProps>;
};
export default _default;
//# sourceMappingURL=DisabledBubbleMessage.d.ts.map