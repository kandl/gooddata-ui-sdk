import { IKpiWidget } from "@gooddata/sdk-model";
import { OnFiredDashboardDrillEvent } from "../../../../types.js";
/**
 * Returns a drill handler for a given KPI.
 *
 * @param kpiWidget - widget the drills of which to handle
 * @internal
 */
export declare function useKpiDrill(kpiWidget: IKpiWidget): OnFiredDashboardDrillEvent;
