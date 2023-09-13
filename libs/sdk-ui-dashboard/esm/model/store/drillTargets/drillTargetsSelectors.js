// (C) 2021-2023 GoodData Corporation
import { drillTargetsAdapter } from "./drillTargetsEntityAdapter.js";
import memoize from "lodash/memoize.js";
import { createSelector } from "@reduxjs/toolkit";
import { serializeObjRef } from "@gooddata/sdk-model";
import { newMapForObjectWithIdentity } from "../../../_staging/metadata/objRefMap.js";
const entitySelectors = drillTargetsAdapter.getSelectors((state) => state.drillTargets);
const selectDrillTargetsInternal = entitySelectors.selectAll;
/**
 * Return all widgets drill targets
 * @alpha
 */
export const selectDrillTargets = createSelector(selectDrillTargetsInternal, (drillTargets) => {
    return newMapForObjectWithIdentity(drillTargets);
});
/**
 * Selects drill targets by widget ref.
 *
 * @alpha
 */
export const selectDrillTargetsByWidgetRef = memoize((ref) => {
    return createSelector(selectDrillTargets, (drillTargets) => {
        return drillTargets.get(ref);
    });
}, serializeObjRef);
//# sourceMappingURL=drillTargetsSelectors.js.map