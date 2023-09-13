import { ExtendedDashboardItem } from "../../../types/layoutTypes.js";
import { InsightResolutionResult } from "../../../utils/insightResolver.js";
import { DashboardContext } from "../../../types/commonTypes.js";
import { SagaIterator } from "redux-saga";
import { IDashboardCommand } from "../../../commands/index.js";
import { ItemResolutionResult } from "./stashValidation.js";
type ItemValidationResult = {
    normalizedItems: ItemResolutionResult;
    resolvedInsights: InsightResolutionResult;
};
/**
 * Given resolved items that should be added onto a dashboard, this function will ensure that items that reference
 * either KPI or Insight widgets reference valid insights or measures.
 *
 * Once the validity of used insights and measures is established, the code will additionally normalize the widget
 * definitions so that they use the native object `ref`s included in the referenced objects.
 *
 * This generator function will consult with backend on the existence of insights and measures if they are not
 * already stored in the state. If an insight is not found in the state but is available on the backend, the
 * insight will be retrieved and returned in the final validation result.
 */
export declare function validateAndNormalizeWidgetItems(ctx: DashboardContext, items: ItemResolutionResult, cmd: IDashboardCommand): SagaIterator<ItemValidationResult>;
/**
 * This generator function will ensure that Insight and KPI widgets that are included in the `items`
 * have valid filter settings:
 *
 * -  the date dataset to use for filtering is correct
 * -  the attribute filters to ignore are correct and reference existing attribute filters
 *
 * Additionally, if the widget does not have dateDataSet to use for filtering set AND the `autoDateDataset` is true,
 * the generator will automatically update the widget with date dataset to use for filtering. It does this by
 * performing the necessary query to obtain relevant date dataset and then picking the most relevant one.
 *
 * @param ctx - dashboard context in which filter validation & resolution is done
 * @param items - items that are about to be added to the dashboard
 * @param cmd - command that is adding the items to the dashboard
 * @param autoDateDataset - indicates whether to automatically resolve and set date dataset to use for filtering for
 * KPI and Insight widgets.
 */
export declare function validateAndResolveItemFilterSettings(ctx: DashboardContext, cmd: IDashboardCommand, items: ItemValidationResult, autoDateDataset?: boolean): SagaIterator<ExtendedDashboardItem[]>;
export {};
