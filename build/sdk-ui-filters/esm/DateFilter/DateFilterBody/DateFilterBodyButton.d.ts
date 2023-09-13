import React from "react";
import { WrappedComponentProps } from "react-intl";
interface IDateFilterBodyButtonProps {
    onClick: () => void;
    messageId: string;
    className: string;
    disabled?: boolean;
}
export declare const DateFilterBodyButton: React.FC<import("react-intl").WithIntlProps<IDateFilterBodyButtonProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IDateFilterBodyButtonProps & WrappedComponentProps>;
};
export {};
