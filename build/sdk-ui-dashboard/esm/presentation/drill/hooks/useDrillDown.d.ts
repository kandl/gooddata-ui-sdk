import { DrillDown, DashboardDrillDownResolved, DashboardCommandFailed } from "../../../model/index.js";
/**
 * @internal
 */
export interface UseDrillDownProps {
    onSuccess?: (event: DashboardDrillDownResolved) => void;
    onError?: (event: DashboardCommandFailed<DrillDown>) => void;
    onBeforeRun?: (cmd: DrillDown) => void;
}
/**
 * @internal
 */
export declare const useDrillDown: ({ onSuccess, onError, onBeforeRun }?: UseDrillDownProps) => {
    run: (insight: import("@gooddata/sdk-model").IInsight, drillDefinition: import("../../../types.js").IDrillDownDefinition, drillEvent: import("../../../types.js").IDashboardDrillEvent, correlationId?: string | undefined) => void;
    status?: import("../../../model/index.js").CommandProcessingStatus | undefined;
};
