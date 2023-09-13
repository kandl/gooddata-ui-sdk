import React from "react";
import { OpenAction, IMenuPositionConfig, OnOpenedChange } from "./MenuSharedTypes.js";
export interface IControlledMenuProps extends Partial<IMenuPositionConfig> {
    opened: boolean;
    openAction?: OpenAction;
    closeOnScroll: boolean;
    portalTarget: Element | undefined;
    onOpenedChange: OnOpenedChange;
    toggler: React.ReactNode;
    togglerWrapperClassName?: string;
    children: React.ReactNode;
}
export declare class ControlledMenu extends React.Component<IControlledMenuProps> {
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: IControlledMenuProps): void;
    render(): JSX.Element;
    private closeMenu;
    private addScrollListeners;
    private removeScrollListeners;
}
//# sourceMappingURL=ControlledMenu.d.ts.map