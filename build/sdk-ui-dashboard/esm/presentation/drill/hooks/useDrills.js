import { useDrill } from "./useDrill.js";
import { useDrillDown } from "./useDrillDown.js";
import { useDrillToInsight } from "./useDrillToInsight.js";
import { useDrillToDashboard } from "./useDrillToDashboard.js";
import { useDrillToAttributeUrl } from "./useDrillToAttributeUrl.js";
import { useDrillToCustomUrl } from "./useDrillToCustomUrl.js";
import { useDrillToLegacyDashboard } from "./useDrillToLegacyDashboard.js";
/**
 * @internal
 */
export function useDrills({ onDrill, onDrillSuccess, onDrillError, 
//
onDrillDown, onDrillDownSuccess, onDrillDownError, 
//
onDrillToInsight, onDrillToInsightSuccess, onDrillToInsightError, 
//
onDrillToDashboard, onDrillToDashboardSuccess, onDrillToDashboardError, 
//
onDrillToAttributeUrl, onDrillToAttributeUrlSuccess, onDrillToAttributeUrlError, 
//
onDrillToCustomUrl, onDrillToCustomUrlSuccess, onDrillToCustomUrlError, 
//
onDrillToLegacyDashboard, onDrillToLegacyDashboardSuccess, onDrillToLegacyDashboardError, 
//
onError, }) {
    const drill = useDrill({
        onBeforeRun: onDrill,
        onSuccess: onDrillSuccess,
        onError: onDrillError !== null && onDrillError !== void 0 ? onDrillError : onError,
    });
    const drillDown = useDrillDown({
        onBeforeRun: onDrillDown,
        onSuccess: onDrillDownSuccess,
        onError: onDrillDownError !== null && onDrillDownError !== void 0 ? onDrillDownError : onError,
    });
    const drillToInsight = useDrillToInsight({
        onBeforeRun: onDrillToInsight,
        onSuccess: onDrillToInsightSuccess,
        onError: onDrillToInsightError !== null && onDrillToInsightError !== void 0 ? onDrillToInsightError : onError,
    });
    const drillToDashboard = useDrillToDashboard({
        onBeforeRun: onDrillToDashboard,
        onSuccess: onDrillToDashboardSuccess,
        onError: onDrillToDashboardError !== null && onDrillToDashboardError !== void 0 ? onDrillToDashboardError : onError,
    });
    const drillToAttributeUrl = useDrillToAttributeUrl({
        onBeforeRun: onDrillToAttributeUrl,
        onSuccess: onDrillToAttributeUrlSuccess,
        onError: onDrillToAttributeUrlError !== null && onDrillToAttributeUrlError !== void 0 ? onDrillToAttributeUrlError : onError,
    });
    const drillToCustomUrl = useDrillToCustomUrl({
        onBeforeRun: onDrillToCustomUrl,
        onSuccess: onDrillToCustomUrlSuccess,
        onError: onDrillToCustomUrlError !== null && onDrillToCustomUrlError !== void 0 ? onDrillToCustomUrlError : onError,
    });
    const drillToLegacyDashboard = useDrillToLegacyDashboard({
        onBeforeRun: onDrillToLegacyDashboard,
        onSuccess: onDrillToLegacyDashboardSuccess,
        onError: onDrillToLegacyDashboardError !== null && onDrillToLegacyDashboardError !== void 0 ? onDrillToLegacyDashboardError : onError,
    });
    return {
        drill,
        drillDown,
        drillToInsight,
        drillToDashboard,
        drillToAttributeUrl,
        drillToCustomUrl,
        drillToLegacyDashboard,
    };
}
//# sourceMappingURL=useDrills.js.map