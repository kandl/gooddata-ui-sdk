import React from "react";
import { DRILL_TARGET_TYPE } from "../../../drill/types.js";
import { IDrillTargetType } from "./useDrillTargetTypeItems.js";
export interface IDrillTargetProps {
    onSelect: (target: DRILL_TARGET_TYPE) => void;
    selection?: DRILL_TARGET_TYPE;
    enabledDrillTargetTypeItems: IDrillTargetType[];
}
export declare const DrillTargetType: React.FunctionComponent<IDrillTargetProps>;
