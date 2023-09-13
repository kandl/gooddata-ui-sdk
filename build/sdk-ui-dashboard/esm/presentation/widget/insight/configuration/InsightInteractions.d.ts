import React from "react";
import { IInsightWidget } from "@gooddata/sdk-model";
interface IInsightConfigurationProps {
    widget: IInsightWidget;
}
export declare const InsightInteractions: React.FC<IInsightConfigurationProps>;
export declare function createInsightInteractionsScreen(widget: IInsightWidget): JSX.Element;
export {};
