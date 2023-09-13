// (C) 2022-2023 GoodData Corporation
import { useEffect, useMemo } from "react";
import { queryAttributeDataSet, useDashboardQueryProcessing, } from "../../../../../../model/index.js";
/**
 * @internal
 */
export function useAttributeDataSet(displayForm, loadQuery = true) {
    const { run: getAttributeDataSet, result: attributeDataSet, status: attributesDataSetLoadingStatus, error: attributesDataSetLoadingError, } = useDashboardQueryProcessing({
        queryCreator: queryAttributeDataSet,
    });
    useEffect(() => {
        if (loadQuery) {
            getAttributeDataSet(displayForm);
        }
    }, [displayForm, loadQuery, getAttributeDataSet]);
    const attributesDataSetLoading = useMemo(() => {
        return attributesDataSetLoadingStatus === "pending" || attributesDataSetLoadingStatus === "running";
    }, [attributesDataSetLoadingStatus]);
    return {
        attributeDataSet,
        attributesDataSetLoading,
        attributesDataSetLoadingError,
    };
}
//# sourceMappingURL=useAttributeDataSet.js.map