import React from "react";
import { IInsight } from "@gooddata/sdk-model";
import { IInsightListProps } from "./types.js";
interface IInsightListItem {
    insight: IInsight;
    insightType: string;
}
export declare function getInsightListSourceItem(insight: IInsight): IInsightListItem;
/**
 * @internal
 */
export declare const InsightList: React.FC<IInsightListProps>;
export {};
