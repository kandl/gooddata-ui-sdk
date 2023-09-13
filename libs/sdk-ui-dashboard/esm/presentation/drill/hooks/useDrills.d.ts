import { OnDashboardDrill, OnDashboardDrillSuccess, OnDrillDown, OnDrillToAttributeUrl, OnDrillToCustomUrl, OnDrillToDashboard, OnDrillToInsight, OnDashboardDrillError, OnDrillDownSuccess, OnDrillToInsightSuccess, OnDrillToDashboardSuccess, OnDrillToAttributeUrlSuccess, OnDrillToCustomUrlSuccess, OnDrillToLegacyDashboard, OnDrillToLegacyDashboardSuccess } from "../types.js";
/**
 * @internal
 */
export interface UseDrillsProps {
    onDrill?: OnDashboardDrill;
    onDrillSuccess?: OnDashboardDrillSuccess;
    onDrillError?: OnDashboardDrillError;
    onDrillDown?: OnDrillDown;
    onDrillDownSuccess?: OnDrillDownSuccess;
    onDrillDownError?: OnDashboardDrillError;
    onDrillToInsight?: OnDrillToInsight;
    onDrillToInsightSuccess?: OnDrillToInsightSuccess;
    onDrillToInsightError?: OnDashboardDrillError;
    onDrillToDashboard?: OnDrillToDashboard;
    onDrillToDashboardSuccess?: OnDrillToDashboardSuccess;
    onDrillToDashboardError?: OnDashboardDrillError;
    onDrillToAttributeUrl?: OnDrillToAttributeUrl;
    onDrillToAttributeUrlSuccess?: OnDrillToAttributeUrlSuccess;
    onDrillToAttributeUrlError?: OnDashboardDrillError;
    onDrillToCustomUrl?: OnDrillToCustomUrl;
    onDrillToCustomUrlSuccess?: OnDrillToCustomUrlSuccess;
    onDrillToCustomUrlError?: OnDashboardDrillError;
    onDrillToLegacyDashboard?: OnDrillToLegacyDashboard;
    onDrillToLegacyDashboardSuccess?: OnDrillToLegacyDashboardSuccess;
    onDrillToLegacyDashboardError?: OnDashboardDrillError;
    onError?: OnDashboardDrillError;
}
/**
 * @internal
 */
export declare function useDrills({ onDrill, onDrillSuccess, onDrillError, onDrillDown, onDrillDownSuccess, onDrillDownError, onDrillToInsight, onDrillToInsightSuccess, onDrillToInsightError, onDrillToDashboard, onDrillToDashboardSuccess, onDrillToDashboardError, onDrillToAttributeUrl, onDrillToAttributeUrlSuccess, onDrillToAttributeUrlError, onDrillToCustomUrl, onDrillToCustomUrlSuccess, onDrillToCustomUrlError, onDrillToLegacyDashboard, onDrillToLegacyDashboardSuccess, onDrillToLegacyDashboardError, onError, }: UseDrillsProps): {
    drill: {
        run: (drillEvent: import("../../../types.js").IDashboardDrillEvent, drillContext: import("../../../types.js").DashboardDrillContext, correlationId?: string | undefined) => void;
        status?: import("../../../index.js").CommandProcessingStatus | undefined;
    };
    drillDown: {
        run: (insight: import("@gooddata/sdk-model").IInsight, drillDefinition: import("../../../types.js").IDrillDownDefinition, drillEvent: import("../../../types.js").IDashboardDrillEvent, correlationId?: string | undefined) => void;
        status?: import("../../../index.js").CommandProcessingStatus | undefined;
    };
    drillToInsight: {
        run: (drillDefinition: import("@gooddata/sdk-model").IDrillToInsight, drillEvent: import("../../../types.js").IDashboardDrillEvent, correlationId?: string | undefined) => void;
        status?: import("../../../index.js").CommandProcessingStatus | undefined;
    };
    drillToDashboard: {
        run: (drillDefinition: import("@gooddata/sdk-model").IDrillToDashboard, drillEvent: import("../../../types.js").IDashboardDrillEvent, correlationId?: string | undefined) => void;
        status?: import("../../../index.js").CommandProcessingStatus | undefined;
    };
    drillToAttributeUrl: {
        run: (drillDefinition: import("@gooddata/sdk-model").IDrillToAttributeUrl, drillEvent: import("../../../types.js").IDashboardDrillEvent, correlationId?: string | undefined) => void;
        status?: import("../../../index.js").CommandProcessingStatus | undefined;
    };
    drillToCustomUrl: {
        run: (drillDefinition: import("@gooddata/sdk-model").IDrillToCustomUrl, drillEvent: import("../../../types.js").IDashboardDrillEvent, correlationId?: string | undefined) => void;
        status?: import("../../../index.js").CommandProcessingStatus | undefined;
    };
    drillToLegacyDashboard: {
        run: (drillDefinition: import("@gooddata/sdk-model").IDrillToLegacyDashboard, drillEvent: import("../../../types.js").IDashboardDrillEvent, correlationId?: string | undefined) => void;
        status?: import("../../../index.js").CommandProcessingStatus | undefined;
    };
};
