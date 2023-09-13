import React from "react";
import { InputPure, InputPureProps } from "./InputPure.js";
/**
 * @internal
 */
export interface InputState {
    value: string | number;
}
/**
 * @internal
 */
export declare class Input extends React.PureComponent<InputPureProps, InputState> {
    static defaultProps: {
        autofocus: boolean;
        className: string;
        clearOnEsc: boolean;
        disabled: boolean;
        hasError: boolean;
        hasWarning: boolean;
        isSearch: boolean;
        isSmall: boolean;
        maxlength: number;
        onChange: (...args: any[]) => void;
        onEscKeyPress: (...args: any[]) => void;
        onEnterKeyPress: (...args: any[]) => void;
        onBlur: (...args: any[]) => void;
        onFocus: (...args: any[]) => void;
        placeholder: string;
        prefix: string;
        readonly: boolean;
        suffix: string;
        label: string;
        labelPositionTop: boolean;
        value: string;
    };
    inputNodeRef: InputPure;
    constructor(props: InputPureProps);
    UNSAFE_componentWillReceiveProps(nextProps: InputPureProps): void;
    onChange: (value: string | number) => void;
    valueChanged(value: string | number): void;
    render(): JSX.Element;
}
//# sourceMappingURL=Input.d.ts.map