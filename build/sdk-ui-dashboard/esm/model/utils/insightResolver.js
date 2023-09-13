// (C) 2021-2022 GoodData Corporation
import { isInsight, isObjRef } from "@gooddata/sdk-model";
import { call, select } from "redux-saga/effects";
import { selectInsightsMap } from "../store/insights/insightsSelectors.js";
import { newInsightMap } from "../../_staging/metadata/objRefMap.js";
async function loadInsightsFromBackend(ctx, insightRefs) {
    const { backend, workspace } = ctx;
    const result = await Promise.all(insightRefs.map((ref) => backend
        .workspace(workspace)
        .insights()
        .getInsight(ref)
        .catch((_) => ref)));
    return {
        loaded: result.filter(isInsight),
        missing: result.filter(isObjRef),
    };
}
/**
 * Given a list of insight ObjRefs, this generator will resolve those refs to actual IInsight objects. The resolution
 * is done from two sources: first the insights already stored in the lazily-populated insight slice, second, as a fallback
 * the actual analytical backend.
 *
 * @param ctx - dashboard context in which the resolution is done
 * @param insightRefs - refs of insights to resolve to IInsight
 */
export function* resolveInsights(ctx, insightRefs) {
    const alreadyLoadedInsights = yield select(selectInsightsMap);
    const foundInsights = [];
    const missingInsightRefs = [];
    insightRefs.forEach((ref) => {
        const insight = alreadyLoadedInsights.get(ref);
        if (insight) {
            foundInsights.push(insight);
        }
        else {
            missingInsightRefs.push(ref);
        }
    });
    const loadResult = yield call(loadInsightsFromBackend, ctx, missingInsightRefs);
    return {
        resolved: newInsightMap([...foundInsights, ...loadResult.loaded]),
        loaded: loadResult.loaded,
        missing: loadResult.missing,
    };
}
//# sourceMappingURL=insightResolver.js.map