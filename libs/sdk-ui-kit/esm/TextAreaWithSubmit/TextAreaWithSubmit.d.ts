import React, { Component, ReactNode } from "react";
import { ITextAreaWithSubmitProps, ITextAreaWithSubmitState } from "./typings.js";
/**
 * @internal
 */
export declare class TextAreaWithSubmit extends Component<ITextAreaWithSubmitProps, ITextAreaWithSubmitState> {
    static defaultProps: {
        className: string;
        maxLength: number;
        rows: number;
        onCancel: {
            <T>(value: T): T;
            (): undefined;
        };
        onEditingStart: {
            <T>(value: T): T;
            (): undefined;
        };
        onChange: {
            <T>(value: T): T;
            (): undefined;
        };
        placeholder: string;
        scrollToEndOnEditingStart: boolean;
        autofocus: boolean;
        disabled: boolean;
    };
    private readonly root;
    private readonly textarea;
    private focusTimeout;
    constructor(props: ITextAreaWithSubmitProps);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(newProps: ITextAreaWithSubmitProps): void;
    componentWillUnmount(): void;
    onDocumentClick: (e: MouseEvent) => void;
    onSelectStart(e: React.MouseEvent): void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    onCancel: () => void;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    edit: (_e?: React.MouseEvent<HTMLDivElement>) => void;
    isClickOutsideTextarea(clickedTarget: EventTarget): boolean;
    isMultiLine(): boolean;
    removeListeners(): void;
    selectAndFocus: () => void;
    renderTextarea(style?: {}): ReactNode;
    renderTextAreaWithSubmitEdit(): ReactNode;
    render(): ReactNode;
}
//# sourceMappingURL=TextAreaWithSubmit.d.ts.map