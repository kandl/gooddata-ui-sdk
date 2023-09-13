import { IdentifierRef, UriRef } from "@gooddata/sdk-model";
import { IDashboardProps } from "../types.js";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { AttributeFilterComponentProvider, WidgetComponentProvider, InsightComponentProvider, InsightBodyComponentProvider, InsightMenuButtonComponentProvider, InsightMenuComponentProvider, KpiComponentProvider, DateFilterComponentProvider, InsightMenuTitleComponentProvider } from "../../dashboardContexts/index.js";
import { AttributeFilterComponentSet, InsightWidgetComponentSet, KpiWidgetComponentSet } from "../../componentDefinition/index.js";
interface IUseDashboardResult {
    backend: IAnalyticalBackend;
    workspace: string;
    dashboardOrRef: UriRef | IdentifierRef | undefined;
    hasThemeProvider: boolean;
    attributeFilterProvider: AttributeFilterComponentProvider;
    dateFilterProvider: DateFilterComponentProvider;
    widgetProvider: WidgetComponentProvider;
    insightProvider: InsightComponentProvider;
    insightBodyProvider: InsightBodyComponentProvider;
    insightMenuButtonProvider: InsightMenuButtonComponentProvider;
    insightMenuProvider: InsightMenuComponentProvider;
    insightMenuTitleProvider: InsightMenuTitleComponentProvider;
    kpiProvider: KpiComponentProvider;
    insightWidgetComponentSet: InsightWidgetComponentSet;
    kpiWidgetComponentSet: KpiWidgetComponentSet;
    attributeFilterComponentSet: AttributeFilterComponentSet;
}
export declare const useDashboard: (props: IDashboardProps) => IUseDashboardResult;
export {};
