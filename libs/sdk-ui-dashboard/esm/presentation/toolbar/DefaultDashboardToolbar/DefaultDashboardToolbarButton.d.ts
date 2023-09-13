import React from "react";
/**
 * @internal
 */
export interface IDefaultDashboardToolbarButtonProps {
    icon: string;
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    tooltip?: string;
}
/**
 * @internal
 */
export declare const DefaultDashboardToolbarButton: React.FC<IDefaultDashboardToolbarButtonProps>;
