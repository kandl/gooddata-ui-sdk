import React from "react";
import { IInsight } from "@gooddata/sdk-model";
import { IDrillConfigItem } from "../../../../drill/types.js";
export interface IInsightDropdownProps {
    insightConfig: IDrillConfigItem;
    onSelect: (targetItem: IInsight) => void;
}
export declare const InsightDropdown: React.FC<IInsightDropdownProps>;
