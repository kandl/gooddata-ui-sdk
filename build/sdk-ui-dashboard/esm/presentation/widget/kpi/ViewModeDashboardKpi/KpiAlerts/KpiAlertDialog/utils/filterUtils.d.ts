import { IFilter, IWidgetAlertDefinition } from "@gooddata/sdk-model";
export declare function isKpiAlertDateFilterSameAsDashboard(alert: IWidgetAlertDefinition, appliedFilters: IFilter[]): boolean;
export declare function areKpiAlertFiltersSameAsDashboard(alert: IWidgetAlertDefinition | undefined, appliedFilters: IFilter[]): boolean;
