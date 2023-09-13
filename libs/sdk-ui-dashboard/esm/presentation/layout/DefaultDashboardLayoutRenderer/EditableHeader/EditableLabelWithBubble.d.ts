import React from "react";
export interface IEditableLabelWithBubbleProps {
    className: string;
    alignTo: string;
    maxRows: number;
    value: string;
    maxLength: number;
    placeholderMessage: string;
    warningLimit: number;
    onSubmit: (value: string) => void;
    onEditingStart?: () => void;
    onCancel?: () => void;
    children?: React.ReactNode;
}
export declare function EditableLabelWithBubble({ onEditingStart, maxLength, value, warningLimit, onCancel, alignTo, className, maxRows, placeholderMessage, children, onSubmit, }: IEditableLabelWithBubbleProps): JSX.Element;
