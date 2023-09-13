import React from "react";
import { OnOpenedChange } from "./MenuSharedTypes.js";
/**
 * @internal
 */
export interface IMenuStateConfig {
    opened?: boolean;
    defaultOpened?: boolean;
    onOpenedChange?: OnOpenedChange;
}
/**
 * @internal
 */
export interface IMenuStateProps extends IMenuStateConfig {
    children: (props: {
        opened: boolean;
        onOpenedChange: OnOpenedChange;
    }) => React.ReactNode;
}
export interface IMenuStateState {
    opened?: boolean;
}
export declare class MenuState extends React.Component<IMenuStateProps, IMenuStateState> {
    static defaultProps: {
        defaultOpened: boolean;
    };
    constructor(props: IMenuStateProps);
    render(): React.ReactNode;
    private isControlled;
    private onOpenedChange;
}
//# sourceMappingURL=MenuState.d.ts.map