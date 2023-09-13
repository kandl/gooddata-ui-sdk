/**
 * @internal
 */
export interface ITextAreaWithSubmitProps {
    className?: string;
    maxLength?: number;
    rows?: number;
    onCancel?: (value: string) => void;
    onEditingStart?: () => void;
    onChange?: (value: string) => void;
    onSubmit: (value: string) => void;
    placeholder?: string;
    scrollToEndOnEditingStart?: boolean;
    defaultValue: string;
    autofocus?: boolean;
    disabled?: boolean;
}
/**
 * @internal
 */
export interface ITextAreaWithSubmitState {
    value: string;
    isEditing: boolean;
}
//# sourceMappingURL=typings.d.ts.map