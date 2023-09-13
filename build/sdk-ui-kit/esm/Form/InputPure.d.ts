import React from "react";
import { IDomNative, IDomNativeProps } from "../typings/domNative.js";
/**
 * @internal
 */
export interface InputPureProps extends IDomNativeProps {
    className: string;
    clearOnEsc: boolean;
    disabled: boolean;
    hasError: boolean;
    hasWarning: boolean;
    isSearch: boolean;
    isSmall: boolean;
    maxlength: number;
    onChange: (value: string | number, e?: React.ChangeEvent<HTMLInputElement>) => void;
    onEscKeyPress: () => void;
    onEnterKeyPress: () => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder: string;
    prefix: string;
    readonly: boolean;
    suffix: string;
    label: string;
    labelPositionTop: boolean;
    value: string | number;
}
/**
 * @internal
 */
export declare class InputPure extends React.PureComponent<InputPureProps> implements IDomNative {
    inputNodeRef: HTMLInputElement;
    private autofocusDispatcher;
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
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Readonly<InputPureProps>): void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent) => void;
    onClear: (e?: React.ChangeEvent<HTMLInputElement>) => void;
    getLabelClassNames(className: string): string;
    getInputClassNames(): string;
    renderPrefix(prefix: string): React.ReactNode;
    renderSuffix(suffix: string): React.ReactNode;
    renderLabel(label: string): React.ReactNode;
    renderSearch(isSearch: boolean): React.ReactNode;
    renderClearIcon(clearOnEsc: boolean): React.ReactNode;
    render(): JSX.Element;
    focus(options?: {
        preventScroll?: boolean;
    }): void;
}
//# sourceMappingURL=InputPure.d.ts.map