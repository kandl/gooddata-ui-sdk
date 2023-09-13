import React from "react";
import { IInsight } from "@gooddata/sdk-model";
import { IDrillConfigItem } from "../../../../drill/types.js";
export interface IDrillMeasureItemProps {
    insight: IDrillConfigItem;
    onSelect: (targetItem: IInsight) => void;
}
export declare const DrillTargetInsightItem: React.FunctionComponent<IDrillMeasureItemProps>;
