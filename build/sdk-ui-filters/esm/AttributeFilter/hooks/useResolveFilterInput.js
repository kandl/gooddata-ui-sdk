// (C) 2021-2023 GoodData Corporation
import { useCallback } from "react";
import { usePlaceholder } from "@gooddata/sdk-ui";
/**
 * @internal
 */
export const useResolveFilterInput = (filter, connectToPlaceholder) => {
    const [resolvedPlaceholder, setPlaceholderValue] = usePlaceholder(connectToPlaceholder);
    const currentFilter = resolvedPlaceholder !== null && resolvedPlaceholder !== void 0 ? resolvedPlaceholder : filter;
    const setConnectedPlaceholderValue = useCallback((filter) => {
        if (connectToPlaceholder) {
            setPlaceholderValue(filter);
        }
    }, [connectToPlaceholder, setPlaceholderValue]);
    return {
        filter: currentFilter,
        setConnectedPlaceholderValue,
    };
};
//# sourceMappingURL=useResolveFilterInput.js.map