import { useState, useMemo, useCallback } from "react";
import { invariant } from "ts-invariant";
import isEqual from "lodash/isEqual.js";
import { setAttributeFilterParents, useDispatchDashboardCommand, } from "../../../../../../model/index.js";
import { useOriginalConfigurationState } from "./useOriginalConfigurationState.js";
export function useParentsConfiguration(neighborFilters, currentFilter) {
    const { filterElementsBy, localIdentifier: currentFilterLocalId } = currentFilter.attributeFilter;
    invariant(currentFilterLocalId, "Cannot initialize the attribute filter configuration panel, filter has missing 'localIdentifier' property");
    const saveParentFilterCommand = useDispatchDashboardCommand(setAttributeFilterParents);
    const originalState = useOriginalConfigurationState(neighborFilters, filterElementsBy);
    const [parents, setParents] = useState(originalState);
    function onParentSelect(localIdentifier, isSelected, overAttributes) {
        const changedParentIndex = parents.findIndex((parent) => parent.localIdentifier === localIdentifier);
        const changedItem = Object.assign({}, parents[changedParentIndex]);
        changedItem.isSelected = isSelected;
        changedItem.overAttributes = overAttributes;
        if (isSelected) {
            changedItem.selectedConnectingAttribute = overAttributes[0];
        }
        else {
            // set connecting attributes to undefined to properly check for
            // state updates
            changedItem.selectedConnectingAttribute = undefined;
            changedItem.overAttributes = undefined;
        }
        const changedParentItems = [...parents];
        changedParentItems[changedParentIndex] = changedItem;
        setParents(changedParentItems);
    }
    function onConnectingAttributeChanged(localIdentifier, selectedAttribute) {
        const changedParentIndex = parents.findIndex((parent) => parent.localIdentifier === localIdentifier);
        const changedItem = Object.assign({}, parents[changedParentIndex]);
        changedItem.selectedConnectingAttribute = selectedAttribute;
        const changedParentItems = [...parents];
        changedParentItems[changedParentIndex] = changedItem;
        setParents(changedParentItems);
    }
    const configurationChanged = useMemo(() => {
        return !isEqual(parents, originalState);
    }, [parents, originalState]);
    const onParentFiltersChange = useCallback(() => {
        // dispatch the command only if the configuration changed
        if (configurationChanged) {
            const parentFilters = [];
            parents.forEach((parentItem) => {
                var _a;
                if (parentItem.isSelected && ((_a = parentItem.overAttributes) === null || _a === void 0 ? void 0 : _a.length)) {
                    const overAttribute = parentItem.selectedConnectingAttribute || parentItem.overAttributes[0];
                    parentFilters.push({
                        filterLocalIdentifier: parentItem.localIdentifier,
                        over: {
                            attributes: [overAttribute],
                        },
                    });
                }
            });
            saveParentFilterCommand(currentFilter.attributeFilter.localIdentifier, parentFilters);
        }
    }, [parents, configurationChanged, currentFilter, saveParentFilterCommand]);
    const onConfigurationClose = useCallback(() => {
        setParents(originalState);
    }, [originalState]);
    return {
        parents,
        configurationChanged,
        onParentSelect,
        onConnectingAttributeChanged,
        onParentFiltersChange,
        onConfigurationClose,
    };
}
//# sourceMappingURL=useParentsConfiguration.js.map