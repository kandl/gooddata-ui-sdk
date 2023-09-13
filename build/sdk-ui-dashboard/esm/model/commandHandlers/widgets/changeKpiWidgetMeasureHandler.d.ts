import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeKpiWidgetMeasure } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardKpiWidgetMeasureChanged } from "../../events/index.js";
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
export declare function changeKpiWidgetMeasureHandler(ctx: DashboardContext, cmd: ChangeKpiWidgetMeasure): SagaIterator<DashboardKpiWidgetMeasureChanged>;
