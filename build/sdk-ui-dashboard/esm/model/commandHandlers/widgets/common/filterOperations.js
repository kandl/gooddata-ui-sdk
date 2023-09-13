// (C) 2021-2022 GoodData Corporation
import { areObjRefsEqual, isDashboardAttributeFilterReference, isInsightWidget, isKpiWidget, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import { call, select } from "redux-saga/effects";
import { selectFilterContextAttributeFilters } from "../../../store/filterContext/filterContextSelectors.js";
import { selectAllCatalogDateDatasetsMap } from "../../../store/catalog/catalogSelectors.js";
import { query } from "../../../store/_infra/queryCall.js";
import { insightSelectDateDataset, queryDateDatasetsForInsight, queryDateDatasetsForMeasure, } from "../../../queries/index.js";
function toAttributeDisplayFormRefs(references) {
    return references.filter(isDashboardAttributeFilterReference).map((reference) => reference.displayForm);
}
function getIgnoredAttributeFilters(filters, ignored) {
    const ignoredRefs = toAttributeDisplayFormRefs(ignored);
    return filters.filter((filter) => {
        return ignoredRefs.some((ref) => areObjRefsEqual(filter.attributeFilter.displayForm, ref));
    });
}
function* replaceFilterSettings(ctx, validators, cmd, widget, op) {
    let dateDataSet;
    if (op.dateDatasetForFiltering) {
        dateDataSet = yield call(validators.dateDatasetValidator, ctx, cmd, widget, op.dateDatasetForFiltering);
    }
    let ignoredFilters = undefined;
    if (op.ignoreAttributeFilters) {
        ignoredFilters = yield call(validators.attributeFilterValidator, ctx, cmd, widget, op.ignoreAttributeFilters);
    }
    return {
        dateDataSet,
        ignoredFilters,
    };
}
function* changeDateFilterIgnore(widget, dateDataSet) {
    const attributeFilters = yield select(selectFilterContextAttributeFilters);
    const ignoredFilters = getIgnoredAttributeFilters(attributeFilters, widget.ignoreDashboardFilters);
    return {
        dateDataSet,
        ignoredFilters,
    };
}
function* disableDateFilter(_ctx, _validators, _cmd, widget) {
    const result = yield call(changeDateFilterIgnore, widget, undefined);
    return result;
}
function* enableDateFilter(ctx, validators, cmd, widget, op) {
    let dateDatasetToUse;
    if (op.dateDataset === "default") {
        if (isInsightWidget(widget)) {
            const queryResult = yield call(query, queryDateDatasetsForInsight(widget.insight));
            dateDatasetToUse = insightSelectDateDataset(queryResult);
        }
        else if (isKpiWidget(widget)) {
            const queryResult = yield call(query, queryDateDatasetsForMeasure(widget.kpi.metric));
            dateDatasetToUse = queryResult.dateDatasetsOrdered[0];
        }
        else {
            invariant(false, "Cannot use default date dataset for custom widgets");
        }
    }
    else {
        dateDatasetToUse = yield call(validators.dateDatasetValidator, ctx, cmd, widget, op.dateDataset);
    }
    const result = yield call(changeDateFilterIgnore, widget, dateDatasetToUse);
    return result;
}
function* changeAttributeIgnores(widget, newlyIgnoredFilters) {
    const dateDataSetMap = yield select(selectAllCatalogDateDatasetsMap);
    const dateDataSet = widget.dateDataSet ? dateDataSetMap.get(widget.dateDataSet) : undefined;
    return {
        dateDataSet,
        ignoredFilters: newlyIgnoredFilters,
    };
}
function* replaceAttributeIgnores(ctx, validators, cmd, widget, op) {
    const ignoredFilters = yield call(validators.attributeFilterValidator, ctx, cmd, widget, op.displayFormRefs);
    const result = yield call(changeAttributeIgnores, widget, ignoredFilters);
    return result;
}
function* ignoreAttributeFilter(ctx, validators, cmd, widget, op) {
    const ignoredFilters = yield call(validators.attributeFilterValidator, ctx, cmd, widget, op.displayFormRefs);
    const attributeFilters = yield select(selectFilterContextAttributeFilters);
    const alreadyIgnored = getIgnoredAttributeFilters(attributeFilters, widget.ignoreDashboardFilters);
    const addToIgnore = (ignoredFilters !== null && ignoredFilters !== void 0 ? ignoredFilters : []).filter((candidate) => {
        return !alreadyIgnored.some((ignoredFilter) => areObjRefsEqual(ignoredFilter.attributeFilter.displayForm, candidate.attributeFilter.displayForm));
    });
    const result = yield call(changeAttributeIgnores, widget, [
        ...alreadyIgnored,
        ...addToIgnore,
    ]);
    return result;
}
function* unignoreAttributeFilter(ctx, validators, cmd, widget, op) {
    const unignoredFilters = yield call(validators.attributeFilterValidator, ctx, cmd, widget, op.displayFormRefs);
    const attributeFilters = yield select(selectFilterContextAttributeFilters);
    const alreadyIgnored = getIgnoredAttributeFilters(attributeFilters, widget.ignoreDashboardFilters);
    const reducedIgnores = alreadyIgnored.filter((candidate) => {
        return !(unignoredFilters !== null && unignoredFilters !== void 0 ? unignoredFilters : []).some((toRemove) => areObjRefsEqual(candidate.attributeFilter.displayForm, toRemove.attributeFilter.displayForm));
    });
    const result = yield call(changeAttributeIgnores, widget, reducedIgnores);
    return result;
}
/**
 * This is one of the more complex event handlers. Here is a little introduction to make studying easier. You
 * really should read this first because you start messing around here villy-nilly. It can simplify things hopefully.
 *
 * In order to provide rich/convenient API for fiddling with widget filters, the widget filter setting commands
 * allow caller to use different types of operations such as:
 *
 * -  replace filter settings completely
 * -  enable/disable date filter (by setting or unsetting date dataset)
 * -  replace list of attribute filters to ignore
 * -  add/remove one or more items from a list of attribute filters to ignore
 *
 * To keep things sane, the handler opts out for convenient - yet perhaps not optimal approach to implement these
 * operations:
 *
 * 1.  The operation to replace filter settings completely can handle validation and resolution of date dataset
 *     to filter by and attribute filters to ignore. In a way, this is the ultimate operation that can achieve
 *     everything.
 *
 * 2.  All the other operations are just thin wrappers on top of the replace filter settings. The sub-operation always
 *     prepare a 'quasi replace' or 'intermediate replace', call the the replace settings operation and
 *     then either send the results off or tweak them.
 *
 *     The latter is the case for the ignore/unignore one or more attribute filter operations. These cannot be
 *     mapped 1-1 to just the replace. However, the replace operation is still used to do intermediate work/validations.
 *
 *     The result of the intermediate operation is then tweaked. The funniest example is the unignore operation:
 *
 *     -  the intermediate operation is set with the existing date data set setting that is on the widget - this is
 *        because it should be untouched yet we need to perform resolution to catalog date dataset for the
 *        purpose of having nice, rich eventing in the end
 *
 *     -  the intermediate operation is set with attribute filters that should be removed from ignore list. that is
 *        because code needs to verify the input - whether the display form is valid and used in some attribute filter
 *
 *     -  the replace operation does the validations.. it essentially resolves date data set ref to a nice catalog
 *        date dataset info & resolves display form of the filter to remove to an attribute filter to remove
 *
 *     -  the unignore op then fiddles with with existing ignore list and removes the attribute filter that was
 *        validated and resolved by the intermediate replace operation
 */
export function* processFilterOp(ctx, validators, cmd, widget) {
    const { payload: { operation }, } = cmd;
    switch (operation.type) {
        case "replace": {
            return yield call(replaceFilterSettings, ctx, validators, cmd, widget, operation);
        }
        case "disableDateFilter": {
            return yield call(disableDateFilter, ctx, validators, cmd, widget);
        }
        case "enableDateFilter": {
            return yield call(enableDateFilter, ctx, validators, cmd, widget, operation);
        }
        case "replaceAttributeIgnores": {
            return yield call(replaceAttributeIgnores, ctx, validators, cmd, widget, operation);
        }
        case "ignoreAttributeFilter": {
            return yield call(ignoreAttributeFilter, ctx, validators, cmd, widget, operation);
        }
        case "unignoreAttributeFilter": {
            return yield call(unignoreAttributeFilter, ctx, validators, cmd, widget, operation);
        }
    }
}
//# sourceMappingURL=filterOperations.js.map