import React from "react";
export interface IDateFilterButtonProps {
    title: React.ReactNode;
    isOpen?: boolean;
    isMobile: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
}
export declare const DateFilterButton: React.FC<IDateFilterButtonProps>;
