import React from "react";
import { IInsight, IInsightWidget } from "@gooddata/sdk-model";
import { RenderMode } from "../../../../../types.js";
interface IDashboardInsightMenuContainerProps {
    children: React.ReactNode;
    widget: IInsightWidget;
    insight: IInsight;
    onClose: () => void;
    renderMode: RenderMode;
}
export declare const DashboardInsightMenuContainer: React.FC<IDashboardInsightMenuContainerProps>;
export {};
