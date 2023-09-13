import { Drill, DashboardDrillResolved, DashboardCommandFailed } from "../../../model/index.js";
/**
 * @internal
 */
export interface UseDrillProps {
    onSuccess?: (event: DashboardDrillResolved) => void;
    onError?: (event: DashboardCommandFailed<Drill>) => void;
    onBeforeRun?: (cmd: Drill) => void;
}
/**
 * @internal
 */
export declare const useDrill: ({ onSuccess, onError, onBeforeRun }?: UseDrillProps) => {
    run: (drillEvent: import("../../../types.js").IDashboardDrillEvent, drillContext: import("../../../types.js").DashboardDrillContext, correlationId?: string | undefined) => void;
    status?: import("../../../model/index.js").CommandProcessingStatus | undefined;
};
