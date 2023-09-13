import { ExtendedDashboardWidget } from "../../model/index.js";
import { IDashboardWidgetProps } from "../widget/index.js";
import { IDashboardLayoutWidgetRenderer } from "./DefaultDashboardLayoutRenderer/index.js";
/**
 * @internal
 */
export declare const DashboardLayoutWidget: IDashboardLayoutWidgetRenderer<ExtendedDashboardWidget, Pick<IDashboardWidgetProps, "onError" | "onDrill" | "onFiltersChange">>;
