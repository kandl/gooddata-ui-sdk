import React from "react";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IMeasure, IPoPMeasureDefinition, IPreviousPeriodMeasureDefinition, ObjRef, FilterContextItem, IWidgetAlert, IKpiWidget, ISeparators } from "@gooddata/sdk-model";
import { ILoadingProps, OnError } from "@gooddata/sdk-ui";
import { IDashboardFilter, OnFiredDashboardDrillEvent } from "../../../../types.js";
interface IKpiExecutorProps {
    dashboardRef?: ObjRef;
    kpiWidget: IKpiWidget;
    primaryMeasure: IMeasure;
    secondaryMeasure?: IMeasure<IPoPMeasureDefinition> | IMeasure<IPreviousPeriodMeasureDefinition>;
    alert?: IWidgetAlert;
    /**
     * Filters that should be used for the execution
     */
    effectiveFilters?: IDashboardFilter[];
    /**
     * All filters that are currently set (this is useful for broken alert filters, where we need even
     * the filters ignored for execution)
     */
    allFilters?: IDashboardFilter[];
    onFiltersChange?: (filters: (IDashboardFilter | FilterContextItem)[], resetOthers?: boolean) => void;
    onDrill?: OnFiredDashboardDrillEvent;
    onError?: OnError;
    backend: IAnalyticalBackend;
    workspace: string;
    separators: ISeparators;
    disableDrillUnderline?: boolean;
    isReadOnly?: boolean;
    LoadingComponent?: React.ComponentType<ILoadingProps>;
}
/**
 * Executes the given measures and displays them as KPI
 * @internal
 */
export declare const KpiExecutor: React.NamedExoticComponent<IKpiExecutorProps>;
export {};
