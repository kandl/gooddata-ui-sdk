import React, { MouseEvent } from "react";
interface IDashboardItemContentProps {
    className?: string;
    children?: React.ReactNode;
    isSelectable?: boolean;
    isSelected?: boolean;
    onSelected?: (e?: MouseEvent) => void;
}
export declare const DashboardItemContent: React.ForwardRefExoticComponent<IDashboardItemContentProps & React.RefAttributes<HTMLDivElement>>;
export {};
