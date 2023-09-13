import { invalidArgumentsProvided } from "../../events/general.js";
import { selectLayout, selectStash } from "../../store/layout/layoutSelectors.js";
import { call, put, select } from "redux-saga/effects";
import { validateItemExists, validateSectionExists } from "./validation/layoutValidation.js";
import { layoutActions } from "../../store/layout/index.js";
import { validateAndResolveStashedItems } from "./validation/stashValidation.js";
import isEmpty from "lodash/isEmpty.js";
import { layoutSectionItemReplaced } from "../../events/layout.js";
import { validateAndNormalizeWidgetItems, validateAndResolveItemFilterSettings, } from "./validation/itemValidation.js";
import { batchActions } from "redux-batched-actions";
import { insightsActions } from "../../store/insights/index.js";
import { addTemporaryIdentityToWidgets } from "../../utils/dashboardItemUtils.js";
function validateAndResolve(commandCtx) {
    const { ctx, cmd: { payload: { sectionIndex, itemIndex }, }, items, layout, stash, } = commandCtx;
    if (!validateSectionExists(layout, sectionIndex)) {
        throw invalidArgumentsProvided(ctx, commandCtx.cmd, `Attempting to replace item from non-existent section at ${sectionIndex}. There are only ${layout.sections.length} sections.`);
    }
    const fromSection = layout.sections[sectionIndex];
    if (!validateItemExists(fromSection, itemIndex)) {
        throw invalidArgumentsProvided(ctx, commandCtx.cmd, `Attempting to replace non-existent item from index ${itemIndex} in section ${sectionIndex}. There are only ${fromSection.items.length} items in this section.`);
    }
    const stashValidationResult = validateAndResolveStashedItems(stash, items);
    if (!isEmpty(stashValidationResult.missing)) {
        throw invalidArgumentsProvided(ctx, commandCtx.cmd, `Attempting to use non-existing stashes. Identifiers of missing stashes: ${stashValidationResult.missing.join(", ")}`);
    }
    return {
        itemToReplace: fromSection.items[itemIndex],
        stashValidationResult,
    };
}
export function* replaceSectionItemHandler(ctx, cmd) {
    const { payload: { item }, } = cmd;
    const commandCtx = {
        ctx,
        cmd,
        items: addTemporaryIdentityToWidgets([item]),
        layout: yield select(selectLayout),
        stash: yield select(selectStash),
    };
    const { itemToReplace, stashValidationResult } = validateAndResolve(commandCtx);
    const { sectionIndex, itemIndex, stashIdentifier, autoResolveDateFilterDataset } = cmd.payload;
    const normalizationResult = yield call(validateAndNormalizeWidgetItems, ctx, stashValidationResult, cmd);
    const itemsToAdd = yield call(validateAndResolveItemFilterSettings, ctx, cmd, normalizationResult, autoResolveDateFilterDataset);
    yield put(batchActions([
        insightsActions.addInsights(normalizationResult.resolvedInsights.loaded),
        layoutActions.replaceSectionItem({
            sectionIndex,
            itemIndex,
            newItems: itemsToAdd,
            stashIdentifier,
            usedStashes: stashValidationResult.existing,
            undo: {
                cmd,
            },
        }),
    ]));
    return layoutSectionItemReplaced(ctx, sectionIndex, itemIndex, stashValidationResult.resolved, itemToReplace, stashIdentifier, cmd.correlationId);
}
//# sourceMappingURL=replaceSectionItemHandler.js.map