// (C) 2022 GoodData Corporation
import { useEffect, useMemo } from "react";
import { queryConnectingAttributes, useDashboardQueryProcessing, selectSupportsElementsQueryParentFiltering, useDashboardSelector, } from "../../../../../../model/index.js";
/**
 * @internal
 */
export function useConnectingAttributes(currentFilterDisplayForm, neighborFiltersDisplayForms) {
    const isDependentFiltersEnabled = useDashboardSelector(selectSupportsElementsQueryParentFiltering);
    const pairs = useMemo(() => neighborFiltersDisplayForms.map((neighborDisplayForm) => [
        currentFilterDisplayForm,
        neighborDisplayForm,
    ]), [neighborFiltersDisplayForms, currentFilterDisplayForm]);
    const { run: getConnectingAttributes, result: connectingAttributes, status: connectingAttributesStatus, error: connectingAttributesError, } = useDashboardQueryProcessing({
        queryCreator: queryConnectingAttributes,
    });
    useEffect(() => {
        // if the backend does not support the parent attributes, we must not run the query, it will end in an error
        if (isDependentFiltersEnabled) {
            getConnectingAttributes(pairs);
        }
    }, [pairs, getConnectingAttributes, isDependentFiltersEnabled]);
    const connectingAttributesLoading = useMemo(() => {
        return connectingAttributesStatus === "pending" || connectingAttributesStatus === "running";
    }, [connectingAttributesStatus]);
    if (!isDependentFiltersEnabled) {
        // if the backend does not support the parent attributes, return en empty response
        return {
            connectingAttributes: [],
            connectingAttributesError: undefined,
            connectingAttributesLoading: false,
        };
    }
    return {
        connectingAttributes,
        connectingAttributesLoading,
        connectingAttributesError,
    };
}
//# sourceMappingURL=useConnectingAttributes.js.map