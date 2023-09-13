import { selectWidgetsMap } from "../../store/layout/layoutSelectors.js";
import { call, put, select } from "redux-saga/effects";
import { validateExistingKpiWidget } from "./validation/widgetValidations.js";
import { layoutActions } from "../../store/layout/index.js";
import { kpiWidgetMeasureChanged } from "../../events/kpi.js";
import { selectAllCatalogMeasuresMap } from "../../store/catalog/catalogSelectors.js";
import { invalidArgumentsProvided } from "../../events/general.js";
import { objRefToString } from "@gooddata/sdk-model";
import { batchActions } from "redux-batched-actions";
import { isWidgetHeader } from "../../types/widgetTypes.js";
import { queryDateDatasetsForMeasure } from "../../queries/index.js";
import { query } from "../../store/_infra/queryCall.js";
import { newCatalogDateDatasetMap } from "../../../_staging/metadata/objRefMap.js";
import isEmpty from "lodash/isEmpty.js";
function* validateMeasure(ctx, cmd) {
    const { payload: { measureRef }, } = cmd;
    const measures = yield select(selectAllCatalogMeasuresMap);
    const measure = measures.get(measureRef);
    if (!measure) {
        throw invalidArgumentsProvided(ctx, cmd, `Attempting to use non-existent measure for KPI widget. ${objRefToString(measureRef)} does not exist.`);
    }
    return measure;
}
function determineHeaderToUse(cmd, measure) {
    const { payload: { header }, } = cmd;
    if (typeof header === "string" && header === "from-measure") {
        return {
            title: measure.measure.title,
        };
    }
    else if (isWidgetHeader(header)) {
        return header;
    }
    return undefined;
}
function* determineDateDatasetToUse(widget, measure) {
    if (!widget.dateDataSet) {
        return undefined;
    }
    const measureDateDatasets = yield call(query, queryDateDatasetsForMeasure(measure.measure.ref));
    const catalogDataSet = newCatalogDateDatasetMap(measureDateDatasets.dateDatasets).get(widget.dateDataSet);
    if (!catalogDataSet) {
        if (!isEmpty(measureDateDatasets.dateDatasetsOrdered)) {
            return measureDateDatasets.dateDatasetsOrdered[0];
        }
        return undefined;
    }
    return catalogDataSet;
}
/**
 * When switching measure used by the KPI the handler needs to deal with several things:
 *
 * -  Input validation; both KPI widget and the new measure must be valid
 * -  Determining what header to use for the KPI. The header may come either as part of the command or command may
 *    indicate to automatically use title from measure OR the command may not provide any header in which case the
 *    old header will be retained
 * -  Determining what date dataset to use for filtering. Different measures can use different date datasets for
 *    filtering - the existing dateDataSet setting on the KPI widget may not be valid in the context of the
 *    new measure.
 *
 *    Thus the command triggers logic (in generator) to query available date datasets for the metric, check if the
 *    existing dateDataSet is among the results of the query. If so, the existing date dataset will be kept. Otherwise
 *    code will pick the most-relevant date dataset.
 *
 *    If the KPI is not setup with date dataset, then nothing happens.
 *
 *
 */
export function* changeKpiWidgetMeasureHandler(ctx, cmd) {
    const { correlationId } = cmd;
    const widgets = yield select(selectWidgetsMap);
    const kpiWidget = validateExistingKpiWidget(widgets, cmd, ctx);
    const measure = yield call(validateMeasure, ctx, cmd);
    const header = determineHeaderToUse(cmd, measure);
    const dateDataset = yield call(determineDateDatasetToUse, kpiWidget, measure);
    const actions = [
        layoutActions.replaceKpiWidgetMeasure({
            ref: kpiWidget.ref,
            measureRef: measure.measure.ref,
            undo: {
                cmd,
            },
        }),
        layoutActions.replaceWidgetDateDataset({
            ref: kpiWidget.ref,
            dateDataSet: dateDataset === null || dateDataset === void 0 ? void 0 : dateDataset.dataSet.ref,
            undo: {
                cmd,
            },
        }),
    ];
    if (header) {
        actions.push(layoutActions.replaceWidgetHeader({
            ref: kpiWidget.ref,
            header,
            undo: {
                cmd,
            },
        }));
    }
    yield put(batchActions(actions, "@@CMD.UPDATE.KPI"));
    const updatedWidgets = yield select(selectWidgetsMap);
    const updatedKpiWidget = updatedWidgets.get(kpiWidget.ref);
    return kpiWidgetMeasureChanged(ctx, kpiWidget.ref, updatedKpiWidget, measure.measure, header, correlationId);
}
//# sourceMappingURL=changeKpiWidgetMeasureHandler.js.map