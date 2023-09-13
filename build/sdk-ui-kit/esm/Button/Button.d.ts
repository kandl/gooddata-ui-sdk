import React from "react";
import { IButtonProps } from "./typings.js";
/**
 * @internal
 */
export declare class Button extends React.Component<IButtonProps> {
    static defaultProps: {
        className: string;
        disabled: boolean;
        onClick: (...args: any[]) => void;
        tabIndex: number;
        tagName: string;
        title: string;
        type: string;
        value: string;
        iconLeft: string;
        iconRight: string;
    };
    buttonNode: HTMLElement;
    render(): JSX.Element;
    private getClassnames;
    private _onClick;
    private renderIcon;
}
//# sourceMappingURL=Button.d.ts.map