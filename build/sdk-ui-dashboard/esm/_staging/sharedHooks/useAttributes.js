// (C) 2022 GoodData Corporation
import { useEffect, useMemo } from "react";
import { queryAttributeByDisplayForm, useDashboardQueryProcessing, } from "../../model/index.js";
/**
 * @internal
 */
export function useAttributes(displayForms) {
    const { run: getAttributes, result: attributes, status: attributesLoadingStatus, error: attributesLoadingError, } = useDashboardQueryProcessing({
        queryCreator: queryAttributeByDisplayForm,
    });
    useEffect(() => {
        getAttributes(displayForms);
    }, [displayForms, getAttributes]);
    const attributesLoading = useMemo(() => {
        return attributesLoadingStatus === "pending" || attributesLoadingStatus === "running";
    }, [attributesLoadingStatus]);
    return {
        attributes,
        attributesLoading,
        attributesLoadingError,
    };
}
//# sourceMappingURL=useAttributes.js.map