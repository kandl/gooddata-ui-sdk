// (C) 2021-2022 GoodData Corporation
import { call, put, select } from "redux-saga/effects";
import { batchActions } from "redux-batched-actions";
import difference from "lodash/difference.js";
import partition from "lodash/partition.js";
import { invalidArgumentsProvided } from "../../../events/general.js";
import { attributeFilterRemoved } from "../../../events/filters.js";
import { filterContextActions } from "../../../store/filterContext/index.js";
import { selectFilterContextAttributeFilters } from "../../../store/filterContext/filterContextSelectors.js";
import { dispatchFilterContextChanged } from "../common.js";
import { dispatchDashboardEvent } from "../../../store/_infra/eventDispatcher.js";
import { layoutActions } from "../../../store/layout/index.js";
export function* removeAttributeFiltersHandler(ctx, cmd) {
    const { filterLocalIds } = cmd.payload;
    const allFilters = yield select(selectFilterContextAttributeFilters);
    const [removedFilters, survivingFilters] = partition(allFilters, (item) => filterLocalIds.includes(item.attributeFilter.localIdentifier));
    const invalidLocalIds = difference(filterLocalIds, allFilters.map((filter) => filter.attributeFilter.localIdentifier));
    if (invalidLocalIds.length) {
        throw invalidArgumentsProvided(ctx, cmd, `Invalid filterLocalIds provided. These ids were not found: ${invalidLocalIds.join(", ")}.`);
    }
    for (const removedFilter of removedFilters) {
        const affectedChildren = survivingFilters.filter((item) => {
            var _a;
            return (_a = item.attributeFilter.filterElementsBy) === null || _a === void 0 ? void 0 : _a.some((parent) => filterLocalIds.includes(parent.filterLocalIdentifier));
        });
        const batch = batchActions([
            // remove filter from parents and keep track of the affected filters
            ...affectedChildren.map(({ attributeFilter }) => filterContextActions.setAttributeFilterParents({
                filterLocalId: attributeFilter.localIdentifier,
                parentFilters: attributeFilter.filterElementsBy.filter((parent) => parent.filterLocalIdentifier !== (removedFilter === null || removedFilter === void 0 ? void 0 : removedFilter.attributeFilter.localIdentifier)),
            })),
            // remove filter itself
            filterContextActions.removeAttributeFilter({
                filterLocalId: removedFilter.attributeFilter.localIdentifier,
            }),
            // remove filter's display form metadata object
            filterContextActions.removeAttributeFilterDisplayForms(removedFilter.attributeFilter.displayForm),
            // house-keeping: ensure the removed attribute filter disappears from widget ignore lists
            layoutActions.removeIgnoredAttributeFilter({
                displayFormRefs: [removedFilter.attributeFilter.displayForm],
            }),
        ]);
        yield put(batch);
        yield dispatchDashboardEvent(attributeFilterRemoved(ctx, removedFilter, affectedChildren, cmd.correlationId));
    }
    yield call(dispatchFilterContextChanged, ctx, cmd);
}
//# sourceMappingURL=removeAttributeFiltersHandler.js.map