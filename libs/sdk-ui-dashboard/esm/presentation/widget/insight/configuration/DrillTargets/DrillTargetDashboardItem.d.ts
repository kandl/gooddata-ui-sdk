import React from "react";
import { ObjRef } from "@gooddata/sdk-model";
import { IDrillableDashboardListItem } from "../../../../dashboardList/index.js";
interface IDrillTargetDashboardItemProps {
    selected?: ObjRef;
    onSelect: (targetItem: IDrillableDashboardListItem) => void;
}
export declare const DrillTargetDashboardItem: React.FunctionComponent<IDrillTargetDashboardItemProps>;
export {};
