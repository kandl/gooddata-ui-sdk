import { DashboardDrillToCustomUrlResolved, DashboardCommandFailed, DrillToCustomUrl } from "../../../model/index.js";
/**
 * @internal
 */
export interface UseDrillToCustomUrlProps {
    onSuccess?: (event: DashboardDrillToCustomUrlResolved) => void;
    onError?: (event: DashboardCommandFailed<DrillToCustomUrl>) => void;
    onBeforeRun?: (cmd: DrillToCustomUrl) => void;
}
/**
 * @internal
 */
export declare const useDrillToCustomUrl: ({ onSuccess, onError, onBeforeRun }?: UseDrillToCustomUrlProps) => {
    run: (drillDefinition: import("@gooddata/sdk-model").IDrillToCustomUrl, drillEvent: import("../../../types.js").IDashboardDrillEvent, correlationId?: string | undefined) => void;
    status?: import("../../../model/index.js").CommandProcessingStatus | undefined;
};
