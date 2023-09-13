import React from "react";
import { OpenAction, IMenuPositionConfig, OnOpenedChange } from "../MenuSharedTypes.js";
export interface IMenuOpenerProps extends Partial<IMenuPositionConfig> {
    topLevelMenu: boolean;
    opened: boolean;
    onOpenedChange: OnOpenedChange;
    openAction?: OpenAction;
    portalTarget?: Element | null;
    toggler: React.ReactNode;
    togglerWrapperClassName?: string;
    children: React.ReactNode;
}
export declare class MenuOpener extends React.Component<IMenuOpenerProps> {
    static defaultProps: Pick<IMenuOpenerProps, "openAction" | "alignment" | "spacing" | "offset" | "portalTarget">;
    render(): JSX.Element;
    private getComponentByOpenAction;
}
//# sourceMappingURL=MenuOpener.d.ts.map