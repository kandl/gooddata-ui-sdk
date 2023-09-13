import { IInsight, ObjRef, IDashboardAttributeFilter, IAnalyticalWidget, IKpiWidget, IInsightWidget, ICatalogDateDataset } from "@gooddata/sdk-model";
import { DashboardContext } from "../../../types/commonTypes.js";
import { SagaIterator } from "redux-saga";
import { IDashboardCommand } from "../../../commands/index.js";
/**
 * This generator validates that a date dataset with the provided ref can be used for date filtering of insight in
 * particular insight widget. If the result is positive, a catalog entry of the date dataset will be returned.
 *
 * If the result is negative a DashboardCommandFailed will be thrown.
 *
 * The validation will trigger the QueryInsightDateDatasets to obtain a list of all available, valid date datasets for
 * the insight widget - that's where the actual complex logic takes place.
 *
 * Note that the query is a cached query - first execution will cache all available date dataset information in state and
 * the subsequent calls will be instant.
 *
 * @param ctx - dashboard context in which the validation is done
 * @param cmd - dashboard command it the context of which the validation is done
 * @param widget - insight that whose date filter is about to change
 * @param dateDataSet - ref of a date dataset to validate
 * @param resolvedInsight - specify entire insight used by the insight widget; if provided, the query
 *  to obtain date datasets for the insight will use insight instead of looking up insight ref in the current dashboard state.
 *  Passing resolved insight is essential in cases when this validation is done before the insight widget
 *  is actually added onto dashboard - because in that case the insight itself is not yet part of the state and
 *  the query is limited (intentionally) to query only by refs of insights that are on the dashboard
 */
export declare function validateDatasetForInsightWidgetDateFilter(ctx: DashboardContext, cmd: IDashboardCommand, widget: IInsightWidget, dateDataSet: ObjRef, resolvedInsight?: IInsight): SagaIterator<ICatalogDateDataset>;
/**
 * This generator validates that a date dataset with the provided ref can be used for date filtering of a particular
 * KPI widget. If the result is positive, a normalized ref of the date dataset will be returned - this ref
 * should be used going forward, stored in state etc etc. If the result is negative a DashboardCommandFailed will be
 * thrown.
 *
 * The validation will trigger the QueryInsightDateDatasets to obtain a list of all available, valid date datasets for
 * the insight widget - that's where the actual complex logic takes place.
 *
 * Note that the query is a cached query - first execution will cache all available date dataset information in state and
 * the subsequent calls will be instant.
 *
 * @param ctx - dashboard context in which the validation is done
 * @param cmd - dashboard command it the context of which the validation is done
 * @param widget - insight that whose date filter is about to change
 * @param dateDataSet - ref of a date dataset to validate
 */
export declare function validateDatasetForKpiWidgetDateFilter(ctx: DashboardContext, cmd: IDashboardCommand, widget: IKpiWidget, dateDataSet: ObjRef): SagaIterator<ICatalogDateDataset>;
/**
 * This generator validates whether it is possible to disable attribute filtering based on the refs of attribute display forms.
 * The validation is not widget-specific - it does not need any info from the widget. It validates that the display forms
 * used to specify filters to ignore are valid and that they are actually used in attribute filters that are currently
 * on the dashboard.
 *
 * If the result is positive, a list of normalized display form refs will be returned - these refs should be used going forward, stored in state etc. If the
 * result is negative a DashboardCommandFailed will be thrown.
 *
 * The validation may be trigger asynchronous processing when a display form cannot be resolved directly from the workspace
 * catalog that is stored in state. This can happen in two cases:
 *
 * -  ref is for a display form that is not part of production workspace catalog that is stored in the state; for instance
 *    happens when there are CSV, non-production datasets loaded and used on some of the dashboard insights
 * -  ref is for a bogus display form; code must check on backend and will find that backend has no such display form
 *    and will eventually bomb
 *
 * @param ctx - dashboard context in which the validation is done
 * @param cmd - dashboard command in the context of which the validation is done
 * @param _widget - widget on which the filters should be ignored
 * @param toIgnore - refs of display forms used in attribute filters that should be ignored
 */
export declare function validateAttributeFiltersToIgnore(ctx: DashboardContext, cmd: IDashboardCommand, _widget: IAnalyticalWidget, toIgnore: ObjRef[]): SagaIterator<IDashboardAttributeFilter[]>;
