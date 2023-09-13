import { invalidArgumentsProvided } from "../../events/general.js";
import { selectLayout } from "../../store/layout/layoutSelectors.js";
import { put, select } from "redux-saga/effects";
import { validateSectionExists } from "./validation/layoutValidation.js";
import merge from "lodash/merge.js";
import { layoutActions } from "../../store/layout/index.js";
import { layoutSectionHeaderChanged } from "../../events/layout.js";
import { sanitizeHeader } from "./utils.js";
export function* changeLayoutSectionHeaderHandler(ctx, cmd) {
    var _a;
    const layout = yield select(selectLayout);
    const { index, header, merge: mergeHeaders } = cmd.payload;
    if (!validateSectionExists(layout, index)) {
        throw invalidArgumentsProvided(ctx, cmd, `Attempting to modify header of non-existent section at ${index}. There are currently ${layout.sections.length} sections.`);
    }
    const existingHeader = (_a = layout.sections[index].header) !== null && _a !== void 0 ? _a : {};
    const newHeader = mergeHeaders ? merge({}, existingHeader, header) : header;
    const sanitizedHeader = sanitizeHeader(newHeader);
    yield put(layoutActions.changeSectionHeader({
        index,
        header: sanitizedHeader,
        undo: {
            cmd,
        },
    }));
    return layoutSectionHeaderChanged(ctx, sanitizedHeader, index, cmd.correlationId);
}
//# sourceMappingURL=changeLayoutSectionHeaderHandler.js.map