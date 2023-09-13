import React from "react";
interface ISelectOptionProps {
    isFocused: boolean;
    isSelected: boolean;
    className?: string;
    children: React.ReactNode;
}
export declare const SelectOption: React.FC<ISelectOptionProps>;
export {};
