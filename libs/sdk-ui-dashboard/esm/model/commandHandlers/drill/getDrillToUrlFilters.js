// (C) 2021 GoodData Corporation
import { call, select } from "redux-saga/effects";
import { selectEnableFilterValuesResolutionInDrillEvents } from "../../store/config/configSelectors.js";
import { resolveFilterValues } from "./common/filterValuesResolver.js";
import { queryWidgetFilters } from "../../queries/index.js";
import { isDashboardFilter } from "../../../types.js";
import { query } from "../../store/_infra/queryCall.js";
export function* getDrillToUrlFiltersWithResolvedValues(ctx, widgetRef) {
    // override all insight filters by passing null as insight
    const effectiveFilters = yield call(query, queryWidgetFilters(widgetRef, null));
    const filters = effectiveFilters.filter(isDashboardFilter);
    const enableFilterValuesResolutionInDrillEvents = yield select(selectEnableFilterValuesResolutionInDrillEvents);
    if (enableFilterValuesResolutionInDrillEvents) {
        const resolvedFilterValues = yield call(resolveFilterValues, filters, ctx.backend, ctx.workspace);
        return { filters, resolvedFilterValues };
    }
    return { filters };
}
//# sourceMappingURL=getDrillToUrlFilters.js.map