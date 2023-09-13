import React from "react";
import { DashboardDrillDefinition } from "../../../types.js";
import { DrillSelectItem } from "./types.js";
export interface DrillSelectListProps {
    items: DrillSelectItem[];
    onSelect: (item: DashboardDrillDefinition) => void;
}
export declare const DrillSelectList: React.FunctionComponent<DrillSelectListProps>;
