// (C) 2022 GoodData Corporation
import { useCallback } from "react";
import { insightVisualizationType, widgetRef } from "@gooddata/sdk-model";
import { useDashboardDispatch, useDashboardSelector, selectIsInEditMode, changeInsightWidgetVisProperties, } from "../../../../../model/index.js";
function isSupportedWidgetProperties(properties) {
    var _a;
    // currently we only support the columnWidths for pivot tables
    // this should be ideally driven by the PlugVis API, not hardcoded here
    return !!((_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.columnWidths);
}
export function useHandlePropertiesPushData(widget, insight) {
    const ref = widgetRef(widget);
    const dispatch = useDashboardDispatch();
    const isInEditMode = useDashboardSelector(selectIsInEditMode);
    const visType = insightVisualizationType(insight);
    return useCallback((data) => {
        // propagate properties from push data only for pivot tables (this is how gdc-dashboard does it)
        if (isInEditMode && isSupportedWidgetProperties(data.properties) && visType === "table") {
            dispatch(changeInsightWidgetVisProperties(ref, data.properties));
        }
    }, [dispatch, ref, visType, isInEditMode]);
}
//# sourceMappingURL=useHandlePropertiesPushData.js.map