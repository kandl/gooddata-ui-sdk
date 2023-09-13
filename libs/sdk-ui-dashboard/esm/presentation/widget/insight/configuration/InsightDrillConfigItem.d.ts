import React from "react";
import { IDrillConfigItem } from "../../../drill/types.js";
import { IDrillTargetType } from "./useDrillTargetTypeItems.js";
import { InsightDrillDefinition } from "@gooddata/sdk-model";
export interface IDrillConfigItemProps {
    item: IDrillConfigItem;
    enabledDrillTargetTypeItems: IDrillTargetType[];
    onDelete: (item: IDrillConfigItem) => void;
    onSetup: (drill: InsightDrillDefinition, changedItem: IDrillConfigItem) => void;
    onIncompleteChange: (changedItem: IDrillConfigItem) => void;
}
declare const DrillConfigItem: React.FunctionComponent<IDrillConfigItemProps>;
export default DrillConfigItem;
