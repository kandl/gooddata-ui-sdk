// (C) 2023 GoodData Corporation
import { useCallback, useState } from "react";
import { useDashboardCommandProcessing, setAttributeFilterSelectionMode, changeAttributeFilterSelection, } from "../../../../../../model/index.js";
export const useSelectionModeConfiguration = (attributeFilter) => {
    var _a;
    const { run: changeSelectionMode } = useDashboardCommandProcessing({
        commandCreator: setAttributeFilterSelectionMode,
        successEvent: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_MODE_CHANGED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
    });
    const { run: changeSelection } = useDashboardCommandProcessing({
        commandCreator: changeAttributeFilterSelection,
        successEvent: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_CHANGED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
    });
    const originalSelectionMode = (_a = attributeFilter.attributeFilter.selectionMode) !== null && _a !== void 0 ? _a : "multi";
    const [selectionMode, setSelectionMode] = useState(originalSelectionMode);
    const selectionModeChanged = originalSelectionMode !== selectionMode;
    const onSelectionModeUpdate = useCallback((value) => {
        setSelectionMode(value);
    }, []);
    const onConfigurationClose = useCallback(() => {
        setSelectionMode(originalSelectionMode);
    }, [originalSelectionMode]);
    const onSelectionModeChange = useCallback(() => {
        if (selectionMode === originalSelectionMode) {
            return;
        }
        const { localIdentifier } = attributeFilter.attributeFilter;
        if (selectionMode === "single") {
            // the order is important to keep Dashboard in valid state
            changeSelection(localIdentifier, { uris: [] }, "IN");
            changeSelectionMode(localIdentifier, selectionMode);
        }
        else {
            // the order is important to keep Dashboard in valid state
            changeSelectionMode(localIdentifier, selectionMode);
            changeSelection(localIdentifier, { uris: [] }, "NOT_IN");
        }
    }, [originalSelectionMode, selectionMode, attributeFilter, changeSelectionMode, changeSelection]);
    return {
        selectionMode,
        selectionModeChanged,
        onSelectionModeChange,
        onSelectionModeUpdate,
        onConfigurationClose,
    };
};
//# sourceMappingURL=useSelectionModeConfiguration.js.map