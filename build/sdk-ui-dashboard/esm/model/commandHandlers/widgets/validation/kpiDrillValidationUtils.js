// (C) 2022 GoodData Corporation
import { areObjRefsEqual, objRefToString } from "@gooddata/sdk-model";
export function validateKpiDrillTarget(drill, availableLegacyDashboards) {
    const relevantDashboard = availableLegacyDashboards.find((dash) => areObjRefsEqual(dash.ref, drill.target));
    if (!relevantDashboard) {
        throw Error(`Dashboard with ref ${objRefToString(drill.target)} was not found.`);
    }
    if (!relevantDashboard.tabs.some((tab) => tab.identifier === drill.tab)) {
        throw Error(`Dashboard with ref ${objRefToString(drill.target)} does not contain tab with identifier ${drill.tab}.`);
    }
}
//# sourceMappingURL=kpiDrillValidationUtils.js.map