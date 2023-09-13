import React from "react";
import { WrappedComponentProps } from "react-intl";
export interface IBubbleMessageOwnProps {
    showDisabledMessage: boolean;
    className?: string;
}
export type IBubbleMessageProps = IBubbleMessageOwnProps & WrappedComponentProps;
export declare class DisabledBubbleMessage extends React.PureComponent<IBubbleMessageProps> {
    render(): JSX.Element;
    private getBubbleClassNames;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IBubbleMessageProps>> & {
    WrappedComponent: React.ComponentType<IBubbleMessageProps>;
};
export default _default;
//# sourceMappingURL=DisabledBubbleMessage.d.ts.map