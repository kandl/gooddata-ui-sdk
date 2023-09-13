import { DashboardContext } from "../types/commonTypes.js";
import { IInsight, ObjRef } from "@gooddata/sdk-model";
import { SagaIterator } from "redux-saga";
import { ObjRefMap } from "../../_staging/metadata/objRefMap.js";
export interface InsightResolutionResult {
    /**
     * Map containing all resolved insights.
     */
    resolved: ObjRefMap<IInsight>;
    /**
     * List of those insights that had to be loaded from the server.
     */
    loaded: IInsight[];
    /**
     * List of ObjRefs that could not be resolved.
     */
    missing: ObjRef[];
}
/**
 * Given a list of insight ObjRefs, this generator will resolve those refs to actual IInsight objects. The resolution
 * is done from two sources: first the insights already stored in the lazily-populated insight slice, second, as a fallback
 * the actual analytical backend.
 *
 * @param ctx - dashboard context in which the resolution is done
 * @param insightRefs - refs of insights to resolve to IInsight
 */
export declare function resolveInsights(ctx: DashboardContext, insightRefs: ObjRef[]): SagaIterator<InsightResolutionResult>;
