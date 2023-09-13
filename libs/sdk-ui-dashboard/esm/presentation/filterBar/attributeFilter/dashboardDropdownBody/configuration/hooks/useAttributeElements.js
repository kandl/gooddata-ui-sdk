// (C) 2023 GoodData Corporation
import { useEffect, useMemo } from "react";
import { queryAttributeElements, useDashboardQueryProcessing, } from "../../../../../../model/index.js";
/**
 * @internal
 */
export function useAttributeElements(displayForm, limit, loadQuery) {
    const { run: getAttributeElements, result: attributeElements, status: attributeElementsLoadingStatus, error: attributeElementsLoadingError, } = useDashboardQueryProcessing({
        queryCreator: queryAttributeElements,
    });
    useEffect(() => {
        if (loadQuery) {
            getAttributeElements(displayForm, limit);
        }
    }, [displayForm, loadQuery, limit, getAttributeElements]);
    const attributesElementsLoading = useMemo(() => {
        return attributeElementsLoadingStatus === "pending" || attributeElementsLoadingStatus === "running";
    }, [attributeElementsLoadingStatus]);
    return {
        attributeElements,
        attributesElementsLoading,
        attributeElementsLoadingError,
    };
}
//# sourceMappingURL=useAttributeElements.js.map