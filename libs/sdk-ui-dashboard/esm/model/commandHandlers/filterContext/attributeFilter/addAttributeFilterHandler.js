// (C) 2021-2023 GoodData Corporation
import { all, call, put, select } from "redux-saga/effects";
import { invariant } from "ts-invariant";
import { objRefToString } from "@gooddata/sdk-model";
import { invalidArgumentsProvided } from "../../../events/general.js";
import { attributeFilterAdded } from "../../../events/filters.js";
import { filterContextActions } from "../../../store/filterContext/index.js";
import { selectAttributeFilterDisplayFormsMap, selectCanAddMoreAttributeFilters, selectFilterContextAttributeFilterByDisplayForm, selectFilterContextAttributeFilters, } from "../../../store/filterContext/filterContextSelectors.js";
import { dispatchFilterContextChanged } from "../common.js";
import { canFilterBeAdded } from "./validation/uniqueFiltersValidation.js";
import { dispatchDashboardEvent } from "../../../store/_infra/eventDispatcher.js";
import { resolveDisplayFormMetadata } from "../../../utils/displayFormResolver.js";
import isEmpty from "lodash/isEmpty.js";
import { batchActions } from "redux-batched-actions";
export function* addAttributeFilterHandler(ctx, cmd) {
    const { displayForm, index, initialIsNegativeSelection, initialSelection, parentFilters, selectionMode } = cmd.payload;
    const isUnderFilterCountLimit = yield select(selectCanAddMoreAttributeFilters);
    if (!isUnderFilterCountLimit) {
        throw invalidArgumentsProvided(ctx, cmd, `Attempting to add filter, even though the limit on the count of filters has been reached.`);
    }
    const allFilters = yield select(selectFilterContextAttributeFilters);
    const resolvedDisplayForm = yield call(resolveDisplayFormMetadata, ctx, [displayForm]);
    if (!isEmpty(resolvedDisplayForm.missing)) {
        throw invalidArgumentsProvided(ctx, cmd, `Attempting to add filter for a non-existing display form ${objRefToString(displayForm)}.`);
    }
    const displayFormMetadata = resolvedDisplayForm.resolved.get(displayForm);
    invariant(displayFormMetadata);
    const attributeRef = displayFormMetadata.attribute;
    const canBeAdded = yield call(canFilterBeAdded, ctx, displayForm, allFilters);
    if (!canBeAdded) {
        throw invalidArgumentsProvided(ctx, cmd, `Filter for attribute ${objRefToString(attributeRef)} represented by the displayForm ${objRefToString(displayForm)} already exists in the filter context.`);
    }
    yield put(batchActions([
        filterContextActions.addAttributeFilter({
            displayForm: displayFormMetadata.ref,
            index,
            initialIsNegativeSelection,
            initialSelection,
            parentFilters,
            selectionMode,
        }),
        filterContextActions.addAttributeFilterDisplayForm(displayFormMetadata),
    ]));
    const addedFilter = yield select(selectFilterContextAttributeFilterByDisplayForm(displayFormMetadata.ref));
    invariant(addedFilter, "Inconsistent state in attributeFilterAddCommandHandler");
    yield dispatchDashboardEvent(attributeFilterAdded(ctx, addedFilter, cmd.payload.index, cmd.correlationId));
    yield call(dispatchFilterContextChanged, ctx, cmd);
}
export function* getConnectingAttributes(ctx, addedFilterAttribute, neighborFilter) {
    var _a;
    const { backend, workspace } = ctx;
    const displayFormsMap = yield select(selectAttributeFilterDisplayFormsMap);
    const neighborFilterAttribute = (_a = displayFormsMap.get(neighborFilter.attributeFilter.displayForm)) === null || _a === void 0 ? void 0 : _a.attribute;
    invariant(neighborFilterAttribute, "Inconsistent state in attributeFilterAddCommandHandler");
    const connectingAttributeRefs = yield call(getCommonAttributesRefs, ctx.backend, ctx.workspace, addedFilterAttribute, neighborFilterAttribute);
    const connectingAttributesMeta = yield all(connectingAttributeRefs.map((ref) => call(getConnectingAttributeByRef, backend, workspace, ref)));
    const connectingAttributes = connectingAttributesMeta.map((meta) => {
        return {
            title: meta.title,
            ref: meta.ref,
        };
    });
    return {
        filterLocalId: neighborFilter.attributeFilter.localIdentifier,
        connectingAttributes: connectingAttributes,
    };
}
function getCommonAttributesRefs(backend, workspace, addedFilterAttribute, neighborFilterAttribute) {
    return backend
        .workspace(workspace)
        .attributes()
        .getCommonAttributes([addedFilterAttribute, neighborFilterAttribute]);
}
function getConnectingAttributeByRef(backend, workspace, ref) {
    return backend.workspace(workspace).attributes().getAttribute(ref);
}
//# sourceMappingURL=addAttributeFilterHandler.js.map