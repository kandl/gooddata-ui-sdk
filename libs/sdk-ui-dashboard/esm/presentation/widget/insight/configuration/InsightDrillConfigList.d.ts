import React from "react";
import { IDrillConfigItem } from "../../../drill/types.js";
import { InsightDrillDefinition } from "@gooddata/sdk-model";
export interface IDrillConfigListProps {
    drillConfigItems?: IDrillConfigItem[];
    onDelete: (item: IDrillConfigItem) => void;
    onSetup: (drill: InsightDrillDefinition, changedItem: IDrillConfigItem) => void;
    onIncompleteChange: (changedItem: IDrillConfigItem) => void;
}
export declare const InsightDrillConfigList: React.FunctionComponent<IDrillConfigListProps>;
