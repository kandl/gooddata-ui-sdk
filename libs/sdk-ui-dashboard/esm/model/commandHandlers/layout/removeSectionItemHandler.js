import { dispatchDashboardEvent } from "../../store/_infra/eventDispatcher.js";
import { invalidArgumentsProvided } from "../../events/general.js";
import { selectLayout } from "../../store/layout/layoutSelectors.js";
import { call, put, select } from "redux-saga/effects";
import { validateItemExists, validateSectionExists } from "./validation/layoutValidation.js";
import { layoutSectionItemRemoved, layoutSectionRemoved } from "../../events/layout.js";
import { layoutActions } from "../../store/layout/index.js";
function validateAndResolve(commandCtx) {
    const { ctx, cmd: { payload: { sectionIndex, itemIndex }, }, layout, } = commandCtx;
    if (!validateSectionExists(layout, sectionIndex)) {
        throw invalidArgumentsProvided(ctx, commandCtx.originalCmd, `Attempting to remove item from non-existent section at ${sectionIndex}. There are only ${layout.sections.length} sections.`);
    }
    const fromSection = layout.sections[sectionIndex];
    if (!validateItemExists(fromSection, itemIndex)) {
        throw invalidArgumentsProvided(ctx, commandCtx.originalCmd, `Attempting to remove non-existent item from index ${itemIndex} in section ${sectionIndex}. There are only ${fromSection.items.length} items in this section.`);
    }
    const itemToRemove = fromSection.items[itemIndex];
    return {
        fromSection,
        itemToRemove,
    };
}
export function* removeSectionItemHandler(ctx, cmd) {
    return yield call(removeSectionItemSaga, ctx, cmd);
}
export function* removeSectionItemSaga(ctx, cmd, originalCmd = cmd) {
    const commandCtx = {
        ctx,
        cmd,
        originalCmd,
        layout: yield select(selectLayout),
    };
    const { fromSection, itemToRemove } = validateAndResolve(commandCtx);
    const { sectionIndex, itemIndex, eager, stashIdentifier } = cmd.payload;
    if (eager && fromSection.items.length === 1) {
        yield put(layoutActions.removeSection({
            index: sectionIndex,
            stashIdentifier,
            undo: {
                cmd: originalCmd,
            },
        }));
        // normally should do select to get state after the update, however this update is straightforward
        // and can be reconstructed no-problem here.
        const sectionWithEmptyItems = Object.assign(Object.assign({}, fromSection), { items: [] });
        yield dispatchDashboardEvent(layoutSectionItemRemoved(ctx, itemToRemove, itemIndex, sectionWithEmptyItems, stashIdentifier, cmd.correlationId));
        yield dispatchDashboardEvent(layoutSectionRemoved(ctx, sectionWithEmptyItems, sectionIndex, true, undefined, cmd.correlationId));
    }
    else {
        yield put(layoutActions.removeSectionItem({
            sectionIndex,
            itemIndex,
            stashIdentifier,
            undo: {
                cmd: originalCmd,
            },
        }));
        yield dispatchDashboardEvent(layoutSectionItemRemoved(ctx, itemToRemove, itemIndex, undefined, stashIdentifier, cmd.correlationId));
    }
}
//# sourceMappingURL=removeSectionItemHandler.js.map