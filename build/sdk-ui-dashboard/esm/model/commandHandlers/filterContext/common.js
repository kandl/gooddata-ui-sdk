// (C) 2021-2022 GoodData Corporation
import { select } from "redux-saga/effects";
import { filterContextChanged } from "../../events/filters.js";
import { selectFilterContextDefinition } from "../../store/filterContext/filterContextSelectors.js";
import { dispatchDashboardEvent } from "../../store/_infra/eventDispatcher.js";
import { selectEffectiveDateFilterOptions } from "../../store/dateFilterConfig/dateFilterConfigSelectors.js";
import { findDateFilterOptionByValue } from "../../../_staging/dateFilterConfig/dateFilterOptionMapping.js";
export function* dispatchFilterContextChanged(ctx, cmd) {
    const filterContext = yield select(selectFilterContextDefinition);
    yield dispatchDashboardEvent(filterContextChanged(ctx, filterContext, cmd.correlationId));
}
export function* canApplyDateFilter(dateFilter) {
    var _a, _b, _c;
    const effectiveDateFilterOptions = yield select(selectEffectiveDateFilterOptions);
    const targetOption = findDateFilterOptionByValue(dateFilter, effectiveDateFilterOptions);
    if (!targetOption) {
        if (dateFilter.dateFilter.type === "absolute") {
            return !!((_a = effectiveDateFilterOptions === null || effectiveDateFilterOptions === void 0 ? void 0 : effectiveDateFilterOptions.absoluteForm) === null || _a === void 0 ? void 0 : _a.visible);
        }
        else if (dateFilter.dateFilter.type === "relative") {
            if (dateFilter.dateFilter.granularity === "GDC.time.date" &&
                dateFilter.dateFilter.from === undefined &&
                dateFilter.dateFilter.to === undefined) {
                return !!((_b = effectiveDateFilterOptions === null || effectiveDateFilterOptions === void 0 ? void 0 : effectiveDateFilterOptions.allTime) === null || _b === void 0 ? void 0 : _b.visible);
            }
            return !!((_c = effectiveDateFilterOptions === null || effectiveDateFilterOptions === void 0 ? void 0 : effectiveDateFilterOptions.relativeForm) === null || _c === void 0 ? void 0 : _c.visible);
        }
    }
    return !!targetOption;
}
//# sourceMappingURL=common.js.map