import { invalidArgumentsProvided } from "../../events/general.js";
import { selectLayout, selectStash } from "../../store/layout/layoutSelectors.js";
import { call, put, select } from "redux-saga/effects";
import { validateItemPlacement, validateSectionExists } from "./validation/layoutValidation.js";
import { validateAndResolveStashedItems } from "./validation/stashValidation.js";
import isEmpty from "lodash/isEmpty.js";
import { layoutActions } from "../../store/layout/index.js";
import { layoutSectionItemsAdded } from "../../events/layout.js";
import { resolveIndexOfNewItem } from "../../utils/arrayOps.js";
import { selectInsightsMap } from "../../store/insights/insightsSelectors.js";
import { batchActions } from "redux-batched-actions";
import { insightsActions } from "../../store/insights/index.js";
import { validateAndNormalizeWidgetItems, validateAndResolveItemFilterSettings, } from "./validation/itemValidation.js";
import { addTemporaryIdentityToWidgets } from "../../utils/dashboardItemUtils.js";
function validateAndResolveItems(commandCtx) {
    const { ctx, layout, stash, items, cmd: { payload: { sectionIndex, itemIndex }, }, } = commandCtx;
    if (!validateSectionExists(layout, sectionIndex)) {
        throw invalidArgumentsProvided(ctx, commandCtx.cmd, `Attempting to add items to non-existing layout section at index ${sectionIndex}.`);
    }
    const section = layout.sections[sectionIndex];
    if (!validateItemPlacement(section, itemIndex)) {
        throw invalidArgumentsProvided(ctx, commandCtx.cmd, `Attempting to insert new item at wrong index ${itemIndex}. There are currently ${section.items.length} items.`);
    }
    const stashValidationResult = validateAndResolveStashedItems(stash, items);
    if (!isEmpty(stashValidationResult.missing)) {
        throw invalidArgumentsProvided(ctx, commandCtx.cmd, `Attempting to use non-existing stashes. Identifiers of missing stashes: ${stashValidationResult.missing.join(", ")}`);
    }
    return {
        stashValidationResult,
        section,
    };
}
export function* addSectionItemsHandler(ctx, cmd) {
    const { payload: { items }, } = cmd;
    const commandCtx = {
        ctx,
        cmd,
        items: addTemporaryIdentityToWidgets(items),
        layout: yield select(selectLayout),
        stash: yield select(selectStash),
        availableInsights: yield select(selectInsightsMap),
    };
    const { stashValidationResult, section } = validateAndResolveItems(commandCtx);
    const { payload: { itemIndex, sectionIndex, autoResolveDateFilterDataset }, } = cmd;
    const normalizationResult = yield call(validateAndNormalizeWidgetItems, ctx, stashValidationResult, cmd);
    const itemsToAdd = yield call(validateAndResolveItemFilterSettings, ctx, cmd, normalizationResult, autoResolveDateFilterDataset);
    yield put(batchActions([
        insightsActions.addInsights(normalizationResult.resolvedInsights.loaded),
        layoutActions.addSectionItems({
            sectionIndex,
            itemIndex,
            items: itemsToAdd,
            usedStashes: stashValidationResult.existing,
            undo: {
                cmd,
            },
        }),
    ]));
    return layoutSectionItemsAdded(ctx, sectionIndex, resolveIndexOfNewItem(section.items, itemIndex), stashValidationResult.resolved, stashValidationResult.existing, cmd.correlationId);
}
//# sourceMappingURL=addSectionItemsHandler.js.map