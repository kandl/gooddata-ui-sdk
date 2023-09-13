import React from "react";
import { IWidget } from "@gooddata/sdk-model";
interface IDashboardInsightMenuBubbleProps {
    widget: IWidget;
    onClose: () => void;
    isSubmenu?: boolean;
    children?: React.ReactNode;
}
export declare const DashboardInsightMenuBubble: React.FC<IDashboardInsightMenuBubbleProps>;
export {};
