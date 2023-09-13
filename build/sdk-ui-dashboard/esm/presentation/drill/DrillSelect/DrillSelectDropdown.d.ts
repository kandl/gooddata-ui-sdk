import React from "react";
import { IntlShape } from "react-intl";
import { IDrillEvent } from "@gooddata/sdk-ui";
import { DashboardDrillDefinition } from "../../../types.js";
import { IInsight, IListedDashboard } from "@gooddata/sdk-model";
import { DrillSelectContext, DrillSelectItem } from "./types.js";
import { ObjRefMap } from "../../../_staging/metadata/objRefMap.js";
export interface DrillSelectDropdownProps extends DrillSelectContext {
    dropDownAnchorClass: string;
    isOpen: boolean;
    onClose: () => void;
    onSelect: (item: DashboardDrillDefinition) => void;
}
export declare const DrillSelectDropdown: React.FC<DrillSelectDropdownProps>;
export declare const createDrillSelectItems: (drillDefinitions: DashboardDrillDefinition[], drillEvent: IDrillEvent, insights: ObjRefMap<IInsight>, dashboardList: IListedDashboard[], dashboardTitle: string, intl: IntlShape) => DrillSelectItem[];
