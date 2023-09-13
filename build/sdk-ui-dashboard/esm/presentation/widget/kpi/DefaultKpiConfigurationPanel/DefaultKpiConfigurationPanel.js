// (C) 2022 GoodData Corporation
import React, { useCallback } from "react";
import { widgetRef, widgetTitle } from "@gooddata/sdk-model";
import { changeKpiWidgetMeasure, selectAllCatalogMeasuresMap, uiActions, useDashboardDispatch, useDashboardSelector, } from "../../../../model/index.js";
import { KpiConfigurationPanelCore } from "./KpiConfigurationPanelCore.js";
/**
 * @internal
 */
export const DefaultKpiConfigurationPanel = (props) => {
    var _a;
    const { widget } = props;
    const dispatch = useDashboardDispatch();
    const measureRef = widget.kpi.metric;
    const measuresMap = useDashboardSelector(selectAllCatalogMeasuresMap);
    const measureTitle = (_a = measuresMap.get(measureRef)) === null || _a === void 0 ? void 0 : _a.measure.title;
    const handleMeasureChanged = useCallback((item) => {
        dispatch(changeKpiWidgetMeasure(widgetRef(widget), item, 
        // if the title of the widget was the same as the title of the measure
        // update the widget title to be the title of the newly selected measure
        measureTitle === widgetTitle(widget) ? "from-measure" : undefined));
    }, [dispatch, widget, measureTitle]);
    const handlePanelClosed = useCallback(() => dispatch(uiActions.setConfigurationPanelOpened(false)), [dispatch]);
    return (React.createElement(KpiConfigurationPanelCore, { widget: widget, onMeasureChange: handleMeasureChanged, onClose: handlePanelClosed }));
};
//# sourceMappingURL=DefaultKpiConfigurationPanel.js.map