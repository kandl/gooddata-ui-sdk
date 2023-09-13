import React, { Component, ReactNode } from "react";
import { IEditableLabelProps, IEditableLabelState } from "./typings.js";
/**
 * @internal
 */
export interface IEditableLabelInnerProps extends IEditableLabelProps {
    innerRef: React.ForwardedRef<HTMLDivElement>;
}
/**
 * @internal
 */
export declare class EditableLabelInner extends Component<IEditableLabelInnerProps, IEditableLabelState> {
    static defaultProps: {
        children: boolean;
        className: string;
        maxLength: number;
        maxRows: number;
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
        textareaInOverlay: boolean;
        autofocus: boolean;
        isEditableLabelWidthBasedOnText: boolean;
    };
    private readonly root;
    private readonly textarea;
    private focusTimeout;
    constructor(props: IEditableLabelInnerProps);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(newProps: IEditableLabelProps): void;
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
    measureRootDimensions(): void;
    selectAndFocus: () => void;
    renderTextAreaInOverlay(): ReactNode;
    renderTextarea(style?: {}): ReactNode;
    renderEditableLabelEdit(): ReactNode;
    render(): ReactNode;
}
/**
 * @internal
 */
export declare const EditableLabel: React.ForwardRefExoticComponent<IEditableLabelProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EditableLabel.d.ts.map