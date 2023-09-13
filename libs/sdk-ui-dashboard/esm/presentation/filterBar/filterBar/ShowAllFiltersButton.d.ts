import React from "react";
interface IShowAllFiltersButtonProps {
    isVisible: boolean;
    isFilterBarExpanded: boolean;
    onToggle: (isExpanded: boolean) => void;
}
export declare const ShowAllFiltersButton: React.FC<IShowAllFiltersButtonProps>;
export {};
