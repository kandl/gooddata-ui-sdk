import { select } from "redux-saga/effects";
import { invalidArgumentsProvided } from "../../../events/general.js";
import { selectLegacyDashboards } from "../../../store/legacyDashboards/legacyDashboardsSelectors.js";
import { validateKpiDrillTarget } from "./kpiDrillValidationUtils.js";
export function* validateKpiDrill(drill, ctx, cmd) {
    const legacyDashboards = yield select(selectLegacyDashboards);
    try {
        validateKpiDrillTarget(drill, legacyDashboards);
    }
    catch (ex) {
        const messageDetail = ex.message;
        throw invalidArgumentsProvided(ctx, cmd, `Invalid KPI drill target. Error: ${messageDetail}`);
    }
}
//# sourceMappingURL=kpiDrillValidation.js.map