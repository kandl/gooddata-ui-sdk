import { DashboardDrillToAttributeUrlResolved, DashboardCommandFailed, DrillToAttributeUrl } from "../../../model/index.js";
/**
 * @internal
 */
export interface UseDrillToAttributeUrlProps {
    onSuccess?: (event: DashboardDrillToAttributeUrlResolved) => void;
    onError?: (event: DashboardCommandFailed<DrillToAttributeUrl>) => void;
    onBeforeRun?: (cmd: DrillToAttributeUrl) => void;
}
/**
 * @internal
 */
export declare const useDrillToAttributeUrl: ({ onSuccess, onError, onBeforeRun, }?: UseDrillToAttributeUrlProps) => {
    run: (drillDefinition: import("@gooddata/sdk-model").IDrillToAttributeUrl, drillEvent: import("../../../types.js").IDashboardDrillEvent, correlationId?: string | undefined) => void;
    status?: import("../../../model/index.js").CommandProcessingStatus | undefined;
};
