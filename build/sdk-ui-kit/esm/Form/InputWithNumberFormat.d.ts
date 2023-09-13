import React from "react";
import { InputPureProps } from "./InputPure.js";
import { Separators } from "./typings.js";
export declare const MAX_NUMBER: number;
export declare const DEFAULT_SEPARATORS: {
    thousand: string;
    decimal: string;
};
/**
 * @internal
 */
export interface InputWithNumberFormatOwnProps {
    separators: Separators;
}
/**
 * @internal
 */
export interface InputWithNumberFormatState {
    value: number;
    isFocused: boolean;
}
/**
 * @internal
 */
export type InputWithNumberFormatProps = InputWithNumberFormatOwnProps & InputPureProps;
/**
 * @internal
 */
export declare class InputWithNumberFormat extends React.PureComponent<InputWithNumberFormatProps, InputWithNumberFormatState> {
    private input;
    static defaultProps: {
        separators: {
            thousand: string;
            decimal: string;
        };
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
    constructor(props: InputWithNumberFormatProps);
    UNSAFE_componentWillReceiveProps({ value: newValue }: InputWithNumberFormatProps): void;
    onChange: (value: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleCaretShift(e: React.ChangeEvent<HTMLInputElement>): void;
    render(): JSX.Element;
}
//# sourceMappingURL=InputWithNumberFormat.d.ts.map