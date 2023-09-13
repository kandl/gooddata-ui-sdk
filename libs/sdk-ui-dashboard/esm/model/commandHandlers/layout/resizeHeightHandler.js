// (C) 2021-2022 GoodData Corporation
import { put, select } from "redux-saga/effects";
import { invalidArgumentsProvided } from "../../events/general.js";
import { layoutSectionItemsHeightResized, } from "../../events/layout.js";
import { getMaxHeight, getMinHeight } from "../../../_staging/layout/sizing.js";
import { selectInsightsMap } from "../../store/insights/insightsSelectors.js";
import { layoutActions } from "../../store/layout/index.js";
import { selectLayout } from "../../store/layout/layoutSelectors.js";
import { validateItemExists, validateSectionExists } from "./validation/layoutValidation.js";
function validateLayoutIndexes(ctx, layout, command) {
    const { payload: { sectionIndex, itemIndexes }, } = command;
    if (!validateSectionExists(layout, sectionIndex)) {
        throw invalidArgumentsProvided(ctx, command, `Attempting to resize item from non-existent section at ${sectionIndex}. There are only ${layout.sections.length} sections.`);
    }
    const fromSection = layout.sections[sectionIndex];
    itemIndexes.forEach((itemIndex) => {
        if (!validateItemExists(fromSection, itemIndex)) {
            throw invalidArgumentsProvided(ctx, command, `Attempting to resize non-existent item from index ${itemIndex} in section ${sectionIndex}. There are only ${fromSection.items.length} items in this section.`);
        }
    });
}
export function* resizeHeightHandler(ctx, cmd) {
    const { payload: { sectionIndex, itemIndexes, height }, } = cmd;
    const layout = yield select(selectLayout);
    const insightsMap = yield select(selectInsightsMap);
    validateLayoutIndexes(ctx, layout, cmd);
    validateHeight(ctx, layout, insightsMap, cmd);
    yield put(layoutActions.changeItemsHeight({
        sectionIndex,
        itemIndexes,
        height,
    }));
    return layoutSectionItemsHeightResized(ctx, sectionIndex, itemIndexes, height, cmd.correlationId);
}
function validateHeight(ctx, layout, insightsMap, cmd) {
    const { payload: { sectionIndex, itemIndexes, height }, } = cmd;
    const widgets = itemIndexes.map((itemIndex) => layout.sections[sectionIndex].items[itemIndex].widget);
    const minLimit = getMinHeight(widgets, insightsMap);
    const maxLimit = getMaxHeight(widgets, insightsMap);
    const validHeight = height >= minLimit && height <= maxLimit;
    if (!validHeight) {
        throw invalidArgumentsProvided(ctx, cmd, `Attempting to set invalid height. Allowed height is from ${minLimit} to ${maxLimit}.`);
    }
}
//# sourceMappingURL=resizeHeightHandler.js.map