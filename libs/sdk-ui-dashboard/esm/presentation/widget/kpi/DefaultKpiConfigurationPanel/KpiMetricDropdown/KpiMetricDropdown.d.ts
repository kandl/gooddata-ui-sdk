import React from "react";
import { IKpiWidget, ObjRef } from "@gooddata/sdk-model";
interface IKpiMetricDropdownProps {
    widget?: IKpiWidget;
    onMeasureChange: (item: ObjRef) => void;
}
export declare const KpiMetricDropdown: React.FC<IKpiMetricDropdownProps>;
export {};
