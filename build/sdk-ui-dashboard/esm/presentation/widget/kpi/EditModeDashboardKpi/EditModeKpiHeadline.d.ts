import React from "react";
interface IEditableKpiHeadlineProps {
    title: string;
    onTitleChange: (title: string) => void;
    onTitleEditingEnd?: () => void;
    onTitleEditingStart?: () => void;
    clientHeight?: number;
}
export declare const EditableKpiHeadline: React.FC<IEditableKpiHeadlineProps>;
export {};
