import React from "react";
import { DashboardDrillDefinition } from "../../../types.js";
import { DrillSelectItem } from "./types.js";
interface DrillSelectListBodyProps {
    items: DrillSelectItem[];
    onSelect: (item: DashboardDrillDefinition) => void;
}
export declare const DrillSelectListBody: React.FC<DrillSelectListBodyProps>;
export {};
