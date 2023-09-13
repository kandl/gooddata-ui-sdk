import React from "react";
interface IAttributeTitleRenamingProps {
    categoryTitle: string;
    resetTitleText: string;
    showResetTitle: boolean;
    attributeTitle?: string;
    onClick: () => void;
    onChange: (value: string) => void;
}
export declare const AttributeTitleRenaming: React.FC<IAttributeTitleRenamingProps>;
export {};
