// (C) 2021-2022 GoodData Corporation
import { selectWidgetsMap } from "../../store/layout/layoutSelectors.js";
import { call, put, select } from "redux-saga/effects";
import { validateExistingKpiWidget } from "./validation/widgetValidations.js";
import { layoutActions } from "../../store/layout/index.js";
import { processFilterOp } from "./common/filterOperations.js";
import { validateAttributeFiltersToIgnore, validateDatasetForKpiWidgetDateFilter, } from "./validation/filterValidation.js";
import { kpiWidgetFilterSettingsChanged } from "../../events/kpi.js";
const KpiWidgetFilterValidations = {
    dateDatasetValidator: validateDatasetForKpiWidgetDateFilter,
    attributeFilterValidator: validateAttributeFiltersToIgnore,
};
/**
 * Filter setting handler contains some of the more complex validations.
 *
 * If command specifies date dataset to use for date filter (meaning at the same time that date filter should be enabled),
 * then the date dataset validation occurs. This needs to perform complex query processing first to obtain all available
 * date datasets for the insight widget.
 *
 * If command specifies refs of display forms to ignore attribute filters by, then another validation occurs. This one
 * will ensure that the display form refs on the input represent valid, existing display forms. And then ensure that
 * those display forms are actually used in currently used attribute filters.
 */
export function* changeKpiWidgetFilterSettingsHandler(ctx, cmd) {
    const widgets = yield select(selectWidgetsMap);
    const kpiWidget = validateExistingKpiWidget(widgets, cmd, ctx);
    const result = yield call(processFilterOp, ctx, KpiWidgetFilterValidations, cmd, kpiWidget);
    const { dateDataSet, ignoredFilters } = result;
    const ignoreDashboardFilters = ignoredFilters === null || ignoredFilters === void 0 ? void 0 : ignoredFilters.map((filter) => {
        const filterReference = {
            type: "attributeFilterReference",
            displayForm: filter.attributeFilter.displayForm,
        };
        return filterReference;
    });
    yield put(layoutActions.replaceWidgetFilterSettings({
        ref: kpiWidget.ref,
        dateDataSet: dateDataSet === null || dateDataSet === void 0 ? void 0 : dateDataSet.dataSet.ref,
        ignoreDashboardFilters: ignoreDashboardFilters,
        undo: {
            cmd,
        },
    }));
    return kpiWidgetFilterSettingsChanged(ctx, kpiWidget.ref, ignoredFilters !== null && ignoredFilters !== void 0 ? ignoredFilters : [], result.dateDataSet, cmd.correlationId);
}
//# sourceMappingURL=changeKpiWidgetFilterSettingsHandler.js.map