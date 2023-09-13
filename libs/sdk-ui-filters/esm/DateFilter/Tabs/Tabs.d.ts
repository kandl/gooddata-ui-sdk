import React from "react";
interface ITabsWrapperProps {
    className?: string;
    children: React.ReactNode;
}
export declare const TabsWrapper: React.FC<ITabsWrapperProps>;
interface ITabProps {
    selected?: boolean;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
}
export declare const Tab: React.FC<ITabProps>;
export {};
