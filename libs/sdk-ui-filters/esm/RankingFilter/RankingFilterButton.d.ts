import React from "react";
interface IRankingFilterButtonProps {
    isActive: boolean;
    onClick: () => void;
    title: string;
    className?: string;
}
export declare const RankingFilterButton: React.FC<IRankingFilterButtonProps>;
export {};
