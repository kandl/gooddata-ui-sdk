import React from "react";
import { LabelSize } from "./typings.js";
/**
 * @internal
 */
export interface CheckboxProps {
    disabled: boolean;
    name: string;
    text: string;
    title: string;
    value: boolean;
    labelSize: LabelSize;
    onChange: (e: boolean) => void;
}
/**
 * @internal
 */
export declare class Checkbox extends React.PureComponent<CheckboxProps> {
    static defaultProps: {
        disabled: boolean;
        name: string;
        text: string;
        title: string;
        value: boolean;
        labelSize: string;
        onChange: (...args: any[]) => void;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=Checkbox.d.ts.map