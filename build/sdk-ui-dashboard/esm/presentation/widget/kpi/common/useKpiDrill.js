// (C) 2022 GoodData Corporation
import { useCallback } from "react";
import { useDrill, useDrillToLegacyDashboard } from "../../../drill/index.js";
import { useDashboardSelector, selectDisableDefaultDrills } from "../../../../model/index.js";
/**
 * Returns a drill handler for a given KPI.
 *
 * @param kpiWidget - widget the drills of which to handle
 * @internal
 */
export function useKpiDrill(kpiWidget) {
    const disableDefaultDrills = useDashboardSelector(selectDisableDefaultDrills);
    const { run: handleDrillToLegacyDashboard } = useDrillToLegacyDashboard();
    const { run: handleDrill } = useDrill({
        onSuccess: (event) => {
            if (disableDefaultDrills || !event.payload.drillEvent.drillDefinitions[0]) {
                return;
            }
            handleDrillToLegacyDashboard(event.payload.drillEvent.drillDefinitions[0], event.payload.drillEvent, event.correlationId);
        },
    });
    return useCallback((event) => {
        handleDrill(event, { widget: kpiWidget });
    }, [handleDrill, kpiWidget]);
}
//# sourceMappingURL=useKpiDrill.js.map