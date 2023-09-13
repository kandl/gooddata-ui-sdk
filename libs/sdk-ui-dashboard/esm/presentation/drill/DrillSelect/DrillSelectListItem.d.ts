/// <reference types="react" />
import { ITheme } from "@gooddata/sdk-model";
import { DashboardDrillDefinition } from "../../../types.js";
import { DrillSelectItem } from "./types.js";
export interface DrillSelectListItemProps {
    item: DrillSelectItem;
    onClick: (item: DashboardDrillDefinition) => void;
    theme?: ITheme;
}
export declare const DrillSelectListItem: (props: DrillSelectListItemProps) => JSX.Element;
