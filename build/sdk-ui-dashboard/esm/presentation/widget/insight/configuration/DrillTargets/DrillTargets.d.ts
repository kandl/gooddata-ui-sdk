import React from "react";
import { InsightDrillDefinition } from "@gooddata/sdk-model";
import { IDrillConfigItem } from "../../../../drill/types.js";
export interface IDrillTargetsProps {
    item: IDrillConfigItem;
    onSetup: (drill: InsightDrillDefinition, changedItem: IDrillConfigItem) => void;
}
export declare const DrillTargets: React.FunctionComponent<IDrillTargetsProps>;
