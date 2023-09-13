import React from "react";
interface ILegacyInsightMenuItemProps {
    bubbleId: string;
    bubbleMessage?: string;
    className?: string;
    isDisabled?: boolean;
    title: string;
    onClick?: (e: React.MouseEvent) => void;
}
export declare const LegacyInsightMenuItem: React.FC<ILegacyInsightMenuItemProps>;
export {};
