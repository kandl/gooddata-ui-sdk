// (C) 2022 GoodData Corporation
import { useEffect, useState } from "react";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import { useDashboardSelector, useDashboardEventsContext, isDashboardCommandStarted, isDashboardKpiWidgetMeasureChanged, isDashboardCommandFailed, selectAllCatalogMeasuresMap, } from "../../../../model/index.js";
export function useOptimisticMeasureUpdate(kpiWidget) {
    // ref of the measure the KPI is being updated to
    const [updatingMeasureRef, setUpdatingMeasureRef] = useState();
    const measures = useDashboardSelector(selectAllCatalogMeasuresMap);
    const currentMeasure = measures.get(kpiWidget.kpi.metric);
    const updatingMeasure = updatingMeasureRef && measures.get(updatingMeasureRef);
    const { registerHandler, unregisterHandler } = useDashboardEventsContext();
    useEffect(() => {
        const onMeasureChangingStarted = {
            eval: (evt) => {
                return (isDashboardCommandStarted(evt) &&
                    evt.payload.command.type === "GDC.DASH/CMD.KPI_WIDGET.CHANGE_MEASURE" &&
                    areObjRefsEqual(evt.payload.command.payload.ref, kpiWidget.ref));
            },
            handler: (e) => {
                setUpdatingMeasureRef(e.payload.command.payload.measureRef);
            },
        };
        const onMeasureChangingEnded = {
            eval: (evt) => {
                return ((isDashboardKpiWidgetMeasureChanged(evt) &&
                    areObjRefsEqual(evt.payload.ref, kpiWidget.ref)) ||
                    (isDashboardCommandFailed(evt) &&
                        evt.payload.command.type === "GDC.DASH/CMD.KPI_WIDGET.CHANGE_MEASURE" &&
                        areObjRefsEqual(evt.payload.command.payload.ref, kpiWidget.ref)));
            },
            handler: () => {
                setUpdatingMeasureRef(undefined);
            },
        };
        registerHandler(onMeasureChangingStarted);
        registerHandler(onMeasureChangingEnded);
        return () => {
            unregisterHandler(onMeasureChangingStarted);
            unregisterHandler(onMeasureChangingEnded);
        };
    }, [kpiWidget.ref, registerHandler, unregisterHandler]);
    const isChangingMeasure = !!updatingMeasureRef;
    // if the current title of the KPI is the same as the title of the current measure, after the update is done,
    // it will take on the title of the new measure, otherwise the title is untouched
    const titleToShow = isChangingMeasure && kpiWidget.title === (currentMeasure === null || currentMeasure === void 0 ? void 0 : currentMeasure.measure.title) && updatingMeasure
        ? updatingMeasure.measure.title
        : kpiWidget.title;
    return {
        isChangingMeasure,
        titleToShow,
    };
}
//# sourceMappingURL=useOptimisticMeasureUpdate.js.map