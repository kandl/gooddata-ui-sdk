import { DashboardSelector, DashboardState } from "../types.js";
import { IInsight, ObjRef } from "@gooddata/sdk-model";
import { ObjRefMap } from "../../../_staging/metadata/objRefMap.js";
/**
 * Selects all insights used on the dashboard.
 *
 * @remarks
 * Note: if you are aiming to lookup insights using an ObjRef, then you should instead use the map returned
 * by {@link selectInsightsMap}. If you are aiming to lookup a single insight by its ref, use {@link selectInsightByRef}.
 * Using these selectors is both faster and safer as they take ObjRef type into account and look up the insight
 * depending on the type of the ref.
 *
 * See {@link selectInsightsMap} or {@link selectInsightByRef} for a faster and safer ways to get
 * an insight by its ObjRef.
 * @public
 */
export declare const selectInsights: (state: DashboardState) => IInsight[];
/**
 * Selects refs of all insights used on the dashboard.
 *
 * @alpha
 */
export declare const selectInsightRefs: DashboardSelector<ObjRef[]>;
/**
 * Selects all insights and returns them in a mapping of obj ref to the insight object.
 *
 * @alpha
 */
export declare const selectInsightsMap: DashboardSelector<ObjRefMap<IInsight>>;
/**
 * Selects insight used on a dashboard by its ref.
 *
 * @alpha
 */
export declare const selectInsightByRef: (ref: ObjRef | undefined) => DashboardSelector<IInsight | undefined>;
