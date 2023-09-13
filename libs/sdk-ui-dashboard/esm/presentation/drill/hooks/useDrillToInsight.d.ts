import { DashboardDrillToInsightResolved, DashboardCommandFailed, DrillToInsight } from "../../../model/index.js";
/**
 * @internal
 */
export interface UseDrillToInsightProps {
    onSuccess?: (event: DashboardDrillToInsightResolved) => void;
    onError?: (event: DashboardCommandFailed<DrillToInsight>) => void;
    onBeforeRun?: (cmd: DrillToInsight) => void;
}
/**
 * @internal
 */
export declare const useDrillToInsight: ({ onSuccess, onError, onBeforeRun }?: UseDrillToInsightProps) => {
    run: (drillDefinition: import("@gooddata/sdk-model").IDrillToInsight, drillEvent: import("../../../types.js").IDashboardDrillEvent, correlationId?: string | undefined) => void;
    status?: import("../../../model/index.js").CommandProcessingStatus | undefined;
};
