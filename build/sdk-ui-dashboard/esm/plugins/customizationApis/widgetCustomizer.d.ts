import { IDashboardWidgetCustomizer } from "../customizer.js";
import { IDashboardCustomizationLogger } from "./customizationLogging.js";
import { CustomDashboardWidgetComponent, OptionalWidgetComponentProvider } from "../../presentation/index.js";
export declare class DefaultWidgetCustomizer implements IDashboardWidgetCustomizer {
    private readonly logger;
    private state;
    constructor(logger: IDashboardCustomizationLogger);
    addCustomWidget: (widgetType: string, Component: CustomDashboardWidgetComponent) => IDashboardWidgetCustomizer;
    sealCustomizer: () => IDashboardWidgetCustomizer;
    getWidgetComponentProvider: () => OptionalWidgetComponentProvider;
}
