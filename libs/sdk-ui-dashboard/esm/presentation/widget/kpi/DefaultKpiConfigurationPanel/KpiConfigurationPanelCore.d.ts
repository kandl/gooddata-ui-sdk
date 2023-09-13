import React from "react";
import { IKpiWidget, ObjRef } from "@gooddata/sdk-model";
interface IKpiConfigurationPanelCoreProps {
    widget?: IKpiWidget;
    onMeasureChange: (item: ObjRef) => void;
    onClose: () => void;
}
export declare const KpiConfigurationPanelCore: React.FC<IKpiConfigurationPanelCoreProps>;
export {};
