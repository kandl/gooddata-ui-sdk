import React from "react";
interface ISelectionModeButtonProps {
    isOpen: boolean;
    title: string;
    toggleDropdown: () => void;
}
export declare const SelectionModeButton: React.FC<ISelectionModeButtonProps>;
export {};
