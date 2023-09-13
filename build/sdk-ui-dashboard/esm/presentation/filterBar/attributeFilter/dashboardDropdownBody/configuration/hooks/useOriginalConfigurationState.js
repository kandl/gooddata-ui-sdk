// (C) 2022-2023 GoodData Corporation
import { useMemo } from "react";
import { invariant } from "ts-invariant";
/**
 * @internal
 */
export function useOriginalConfigurationState(neighborFilters, filterElementsBy) {
    return useMemo(() => {
        return neighborFilters.map((neighborFilter) => {
            var _a;
            const neighborFilterLocalId = neighborFilter.attributeFilter.localIdentifier;
            const neighborFilterDisplayForm = neighborFilter.attributeFilter.displayForm;
            const neighborFilterTitle = neighborFilter.attributeFilter.title;
            const isSelected = (filterElementsBy === null || filterElementsBy === void 0 ? void 0 : filterElementsBy.some((by) => by.filterLocalIdentifier === neighborFilterLocalId)) || false;
            const overAttributes = (_a = filterElementsBy === null || filterElementsBy === void 0 ? void 0 : filterElementsBy.find((by) => by.filterLocalIdentifier === neighborFilterLocalId)) === null || _a === void 0 ? void 0 : _a.over.attributes;
            invariant(neighborFilterLocalId, "Cannot initialize the attribute filter configuration panel, neighbor filter has missing 'localIdentifier' property.");
            return {
                localIdentifier: neighborFilterLocalId,
                displayForm: neighborFilterDisplayForm,
                isSelected,
                overAttributes: overAttributes,
                selectedConnectingAttribute: overAttributes === null || overAttributes === void 0 ? void 0 : overAttributes[0],
                title: neighborFilterTitle,
            };
        });
    }, [neighborFilters, filterElementsBy]);
}
//# sourceMappingURL=useOriginalConfigurationState.js.map