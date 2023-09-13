import { DashboardDrillToDashboardResolved, DashboardCommandFailed, DrillToDashboard } from "../../../model/index.js";
/**
 * @internal
 */
export interface UseDrillToDashboardProps {
    onSuccess?: (event: DashboardDrillToDashboardResolved) => void;
    onError?: (event: DashboardCommandFailed<DrillToDashboard>) => void;
    onBeforeRun?: (cmd: DrillToDashboard) => void;
}
/**
 * @internal
 */
export declare const useDrillToDashboard: ({ onSuccess, onError, onBeforeRun }?: UseDrillToDashboardProps) => {
    run: (drillDefinition: import("@gooddata/sdk-model").IDrillToDashboard, drillEvent: import("../../../types.js").IDashboardDrillEvent, correlationId?: string | undefined) => void;
    status?: import("../../../model/index.js").CommandProcessingStatus | undefined;
};
