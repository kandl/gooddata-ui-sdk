import { invalidArgumentsProvided } from "../../events/general.js";
import { selectLayout } from "../../store/layout/layoutSelectors.js";
import { put, select } from "redux-saga/effects";
import { validateSectionExists, validateSectionPlacement } from "./validation/layoutValidation.js";
import { layoutActions } from "../../store/layout/index.js";
import { layoutSectionMoved } from "../../events/layout.js";
import { resolveRelativeIndex } from "../../utils/arrayOps.js";
function validateAndResolve(commandCtx) {
    const { ctx, cmd: { payload: { sectionIndex, toIndex }, }, layout, } = commandCtx;
    if (!validateSectionExists(layout, sectionIndex)) {
        throw invalidArgumentsProvided(ctx, commandCtx.cmd, `Attempting to move non-existent section from index ${sectionIndex}. There are only ${layout.sections.length} sections.`);
    }
    if (!validateSectionPlacement(layout, toIndex)) {
        throw invalidArgumentsProvided(ctx, commandCtx.cmd, `Attempting to move section to a wrong index ${toIndex}. There are currently ${layout.sections.length} sections.`);
    }
    const absoluteIndex = resolveRelativeIndex(layout.sections, toIndex);
    if (sectionIndex === absoluteIndex) {
        throw invalidArgumentsProvided(ctx, commandCtx.cmd, `Attempting to move section to a same index where it already resides ${sectionIndex}.`);
    }
    return {
        absoluteIndex,
    };
}
export function* moveLayoutSectionHandler(ctx, cmd) {
    const commandCtx = {
        ctx,
        cmd,
        layout: yield select(selectLayout),
    };
    const { absoluteIndex } = validateAndResolve(commandCtx);
    const { sectionIndex, toIndex } = cmd.payload;
    yield put(layoutActions.moveSection({
        sectionIndex,
        toIndex,
        undo: {
            cmd,
        },
    }));
    const section = commandCtx.layout.sections[sectionIndex];
    return layoutSectionMoved(ctx, section, sectionIndex, absoluteIndex, cmd.correlationId);
}
//# sourceMappingURL=moveLayoutSectionHandler.js.map