import React from "react";
interface IEditableHeadlineProps {
    text: string;
    maxLength: number;
    originalTitle: string;
    onTitleEditingStart?: () => void;
    onTitleEditingCancel?: () => void;
    onTitleChange: (title: string) => void;
}
export declare const EditableHeadline: React.FC<IEditableHeadlineProps>;
export {};
