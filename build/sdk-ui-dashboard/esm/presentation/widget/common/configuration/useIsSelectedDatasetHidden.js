// (C) 2022 GoodData Corporation
import { useMemo } from "react";
import { areObjRefsEqual, idRef } from "@gooddata/sdk-model";
import { useDashboardSelector, selectObjectAvailabilityConfig, selectCatalogDateDatasets, } from "../../../../model/index.js";
import { useBackendStrict, useCancelablePromise, useWorkspaceStrict } from "@gooddata/sdk-ui";
import { safeSerializeObjRef } from "../../../../_staging/metadata/safeSerializeObjRef.js";
export function useIsSelectedDatasetHidden(selectedDateDatasetRef) {
    var _a, _b;
    const backend = useBackendStrict();
    const workspace = useWorkspaceStrict();
    const allDateDatasets = useDashboardSelector(selectCatalogDateDatasets);
    const objectAvailability = useDashboardSelector(selectObjectAvailabilityConfig);
    const hasObjectAvailability = !!(((_a = objectAvailability.excludeObjectsWithTags) === null || _a === void 0 ? void 0 : _a.length) || ((_b = objectAvailability.includeObjectsWithTags) === null || _b === void 0 ? void 0 : _b.length));
    const { result: visibleDateDatasets, status } = useCancelablePromise({
        promise: hasObjectAvailability
            ? async () => {
                var _a, _b;
                const catalog = await backend
                    .workspace(workspace)
                    .catalog()
                    .withGroups(false)
                    .forTypes(["dateDataset"])
                    .excludeTags(((_a = objectAvailability.excludeObjectsWithTags) !== null && _a !== void 0 ? _a : []).map((tag) => idRef(tag)))
                    .includeTags(((_b = objectAvailability.includeObjectsWithTags) !== null && _b !== void 0 ? _b : []).map((tag) => idRef(tag)))
                    .load();
                return catalog.dateDatasets();
            }
            : () => Promise.resolve(allDateDatasets),
    }, [backend, workspace, objectAvailability]);
    const selectedDateDatasetHiddenByObjectAvailability = useMemo(() => {
        if (!visibleDateDatasets || !selectedDateDatasetRef) {
            return false;
        }
        return !visibleDateDatasets.some((ds) => areObjRefsEqual(selectedDateDatasetRef, ds.dataSet.ref));
    }, [safeSerializeObjRef(selectedDateDatasetRef), visibleDateDatasets]);
    return {
        selectedDateDatasetHiddenByObjectAvailability,
        status,
    };
}
//# sourceMappingURL=useIsSelectedDatasetHidden.js.map