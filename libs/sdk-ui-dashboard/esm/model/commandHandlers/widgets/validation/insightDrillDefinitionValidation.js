// (C) 2021-2023 GoodData Corporation
import { call, select } from "redux-saga/effects";
import { invalidArgumentsProvided } from "../../../events/general.js";
import { extractDisplayFormIdentifiers, extractInsightRefs, validateDrillDefinitionOrigin, validateInsightDrillDefinition, } from "./insightDrillDefinitionUtils.js";
import { resolveInsights } from "../../../utils/insightResolver.js";
import { resolveDisplayFormMetadata, } from "../../../utils/displayFormResolver.js";
import { selectDrillTargetsByWidgetRef } from "../../../store/drillTargets/drillTargetsSelectors.js";
import { selectAccessibleDashboardsMap } from "../../../store/accessibleDashboards/accessibleDashboardsSelectors.js";
import { selectInaccessibleDashboardsMap } from "../../../store/inaccessibleDashboards/inaccessibleDashboardsSelectors.js";
export function validateDrillDefinition(drillDefinition, validationData, ctx, cmd) {
    var _a;
    let item = drillDefinition;
    // validate drill targets
    if (!((_a = validationData.drillTargets) === null || _a === void 0 ? void 0 : _a.availableDrillTargets)) {
        throw invalidArgumentsProvided(ctx, cmd, `Drill targets not set`);
    }
    // validate drills origin
    try {
        item = validateDrillDefinitionOrigin(item, validationData.drillTargets.availableDrillTargets);
    }
    catch (ex) {
        const messageDetail = ex.message;
        throw invalidArgumentsProvided(ctx, cmd, `Invalid drill origin for InsightDrillDefinition. Error: ${messageDetail}`);
    }
    // validate drill
    const validationContext = {
        dashboardsMap: validationData.accessibleDashboardMap,
        insightsMap: validationData.resolvedInsights.resolved,
        displayFormsMap: validationData.resolvedDisplayForms.resolved,
        availableDrillTargets: validationData.drillTargets.availableDrillTargets,
        inaccessibleDashboardsMap: validationData.inaccessibleDashboardsMap,
    };
    try {
        item = validateInsightDrillDefinition(item, validationContext);
    }
    catch (ex) {
        const messageDetail = ex.message;
        throw invalidArgumentsProvided(ctx, cmd, `Invalid InsightDrillDefinition. Error: ${messageDetail}`);
    }
    return item;
}
export function* getValidationData(widgetRef, drillsToModify, ctx) {
    const selectDrillTargetsByWidgetRefSelector = selectDrillTargetsByWidgetRef(widgetRef);
    const drillTargets = yield select(selectDrillTargetsByWidgetRefSelector);
    const accessibleDashboardMap = yield select(selectAccessibleDashboardsMap);
    const inaccessibleDashboardsMap = yield select(selectInaccessibleDashboardsMap);
    const insightRefs = extractInsightRefs(drillsToModify);
    const resolvedInsights = yield call(resolveInsights, ctx, insightRefs);
    const displayFormIds = extractDisplayFormIdentifiers(drillsToModify);
    const resolvedDisplayForms = yield call(resolveDisplayFormMetadata, ctx, displayFormIds);
    return {
        drillTargets,
        accessibleDashboardMap,
        resolvedInsights,
        resolvedDisplayForms,
        inaccessibleDashboardsMap,
    };
}
//# sourceMappingURL=insightDrillDefinitionValidation.js.map