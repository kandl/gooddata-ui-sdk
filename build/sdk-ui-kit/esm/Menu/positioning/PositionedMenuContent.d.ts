import React from "react";
import { IMenuPositionConfig } from "../MenuSharedTypes.js";
export interface IPositionedMenuContentProps extends IMenuPositionConfig {
    topLevelMenu: boolean;
    togglerEl: HTMLElement | null;
    children: React.ReactNode;
}
export interface IPositionedMenuContentState {
    left: number;
    top: number;
}
export declare class PositionedMenuContent extends React.Component<IPositionedMenuContentProps, IPositionedMenuContentState> {
    state: IPositionedMenuContentState;
    private menuElRef;
    componentDidUpdate(prevProps: IPositionedMenuContentProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private addEventListeners;
    private removeEventListeners;
    private positionMenu;
}
//# sourceMappingURL=PositionedMenuContent.d.ts.map