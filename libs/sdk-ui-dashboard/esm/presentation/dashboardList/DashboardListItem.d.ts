import React from "react";
import { IntlShape } from "react-intl";
import { DashboardAccessibilityLimitation } from "./types.js";
export interface DashboardsListItemProps {
    title: string;
    accessibilityLimitation?: DashboardAccessibilityLimitation;
    onClick: () => void;
    isSelected?: boolean;
}
export declare const getTooltip: (intl: IntlShape, accessibilityLimitation?: DashboardAccessibilityLimitation) => string | undefined;
export declare const DashboardListItem: React.FC<DashboardsListItemProps>;
