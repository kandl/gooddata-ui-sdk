import { DrillToLegacyDashboard, DashboardDrillToLegacyDashboardResolved, DashboardCommandFailed } from "../../../model/index.js";
/**
 * @internal
 */
export interface UseDrillToLegacyDashboardProps {
    onSuccess?: (event: DashboardDrillToLegacyDashboardResolved) => void;
    onError?: (event: DashboardCommandFailed<DrillToLegacyDashboard>) => void;
    onBeforeRun?: (cmd: DrillToLegacyDashboard) => void;
}
/**
 * @internal
 */
export declare const useDrillToLegacyDashboard: ({ onSuccess, onError, onBeforeRun, }?: UseDrillToLegacyDashboardProps) => {
    run: (drillDefinition: import("@gooddata/sdk-model").IDrillToLegacyDashboard, drillEvent: import("../../../types.js").IDashboardDrillEvent, correlationId?: string | undefined) => void;
    status?: import("../../../model/index.js").CommandProcessingStatus | undefined;
};
