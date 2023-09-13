// (C) 2021-2022 GoodData Corporation
import { invalidArgumentsProvided } from "../../events/general.js";
import { selectLayout, selectStash } from "../../store/layout/layoutSelectors.js";
import { call, put, select } from "redux-saga/effects";
import isEmpty from "lodash/isEmpty.js";
import { layoutActions } from "../../store/layout/index.js";
import { layoutSectionAdded } from "../../events/layout.js";
import { validateSectionPlacement } from "./validation/layoutValidation.js";
import { validateAndResolveStashedItems } from "./validation/stashValidation.js";
import { resolveIndexOfNewItem } from "../../utils/arrayOps.js";
import { selectInsightsMap } from "../../store/insights/insightsSelectors.js";
import { batchActions } from "redux-batched-actions";
import { insightsActions } from "../../store/insights/index.js";
import { validateAndNormalizeWidgetItems, validateAndResolveItemFilterSettings, } from "./validation/itemValidation.js";
import { addTemporaryIdentityToWidgets } from "../../utils/dashboardItemUtils.js";
import { sanitizeHeader } from "./utils.js";
function validateAndResolveItems(commandCtx) {
    const { ctx, layout, stash, initialItems, cmd: { payload: { index }, }, } = commandCtx;
    if (!validateSectionPlacement(layout, index)) {
        throw invalidArgumentsProvided(ctx, commandCtx.cmd, `Attempting to insert new section at wrong index ${index}. There are currently ${layout.sections.length} sections.`);
    }
    const stashValidationResult = validateAndResolveStashedItems(stash, initialItems);
    if (!isEmpty(stashValidationResult.missing)) {
        throw invalidArgumentsProvided(ctx, commandCtx.cmd, `Attempting to use non-existing stashes. Identifiers of missing stashes: ${stashValidationResult.missing.join(", ")}`);
    }
    return stashValidationResult;
}
export function* addLayoutSectionHandler(ctx, cmd) {
    const { payload: { initialItems = [] }, } = cmd;
    const commandCtx = {
        ctx,
        cmd,
        initialItems: addTemporaryIdentityToWidgets(initialItems),
        layout: yield select(selectLayout),
        stash: yield select(selectStash),
        availableInsights: yield select(selectInsightsMap),
    };
    const stashValidationResult = validateAndResolveItems(commandCtx);
    const { payload: { index, initialHeader, autoResolveDateFilterDataset }, } = cmd;
    const normalizationResult = yield call(validateAndNormalizeWidgetItems, ctx, stashValidationResult, cmd);
    const itemsToAdd = yield call(validateAndResolveItemFilterSettings, ctx, cmd, normalizationResult, autoResolveDateFilterDataset);
    const section = {
        type: "IDashboardLayoutSection",
        header: sanitizeHeader(initialHeader),
        items: itemsToAdd,
    };
    yield put(batchActions([
        insightsActions.addInsights(normalizationResult.resolvedInsights.loaded),
        layoutActions.addSection({
            section,
            usedStashes: stashValidationResult.existing,
            index,
            undo: {
                cmd,
            },
        }),
    ]));
    return layoutSectionAdded(ctx, section, resolveIndexOfNewItem(commandCtx.layout.sections, index), cmd.correlationId);
}
//# sourceMappingURL=addLayoutSectionHandler.js.map