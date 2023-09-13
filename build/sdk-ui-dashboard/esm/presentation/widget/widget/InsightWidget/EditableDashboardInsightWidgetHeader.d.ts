import React from "react";
import { IInsight, IInsightWidget } from "@gooddata/sdk-model";
interface IEditableDashboardInsightWidgetHeaderProps {
    clientHeight: number | undefined;
    widget: IInsightWidget;
    insight: IInsight;
}
export declare const EditableDashboardInsightWidgetHeader: React.FC<IEditableDashboardInsightWidgetHeaderProps>;
export {};
