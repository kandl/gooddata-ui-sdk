import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeInsightWidgetFilterSettings } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardInsightWidgetFilterSettingsChanged } from "../../events/index.js";
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
export declare function changeInsightWidgetFilterSettingsHandler(ctx: DashboardContext, cmd: ChangeInsightWidgetFilterSettings): SagaIterator<DashboardInsightWidgetFilterSettingsChanged>;
