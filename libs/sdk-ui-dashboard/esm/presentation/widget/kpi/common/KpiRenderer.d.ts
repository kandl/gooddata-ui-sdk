import React from "react";
import { GoodDataSdkError, IDrillEventContext } from "@gooddata/sdk-ui";
import { IFilter, IKpiWidget, IKpiWidgetDefinition, ISeparators } from "@gooddata/sdk-model";
import { OnFiredDashboardDrillEvent } from "../../../../types.js";
import { IKpiResult } from "./types.js";
interface IKpiRendererProps {
    kpi: IKpiWidget | IKpiWidgetDefinition;
    kpiResult: IKpiResult | undefined;
    filters: IFilter[];
    separators: ISeparators;
    disableDrillUnderline?: boolean;
    isDrillable?: boolean;
    onDrill?: (drillContext: IDrillEventContext) => ReturnType<OnFiredDashboardDrillEvent>;
    isKpiValueClickDisabled?: boolean;
    enableCompactSize?: boolean;
    error?: GoodDataSdkError;
    errorHelp?: string;
    isLoading?: boolean;
}
/**
 * @internal
 */
export declare const KpiRenderer: React.FC<IKpiRendererProps>;
export {};
