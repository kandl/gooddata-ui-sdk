import React from "react";
import { IMenuPositionConfig } from "../MenuSharedTypes.js";
export interface IMenuPositionProps extends IMenuPositionConfig {
    opened: boolean;
    topLevelMenu: boolean;
    portalTarget: Element;
    contentWrapper?: (props: {
        children: React.ReactNode;
    }) => JSX.Element;
    toggler: React.ReactNode;
    togglerWrapperClassName?: string;
    children: React.ReactNode;
    className?: string;
}
export interface IMenuPositionState {
    togglerElInitialized: boolean;
}
export declare class MenuPosition extends React.Component<IMenuPositionProps, IMenuPositionState> {
    static defaultProps: {
        contentWrapper: React.ExoticComponent<{
            children?: React.ReactNode;
        }>;
    };
    state: {
        togglerElInitialized: boolean;
    };
    private togglerEl;
    render(): JSX.Element;
    private setTogglerEl;
}
//# sourceMappingURL=MenuPosition.d.ts.map