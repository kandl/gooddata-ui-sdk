import { DashboardContext } from "../types/commonTypes.js";
import { IInsightDefinition, ICatalogDateDataset } from "@gooddata/sdk-model";
import { SagaIterator } from "redux-saga";
/**
 * This generator function will communicate with backend to obtain the available date data sets that can be
 * used for date-filtering of the provided insight.
 *
 * The available date datasets vary based on the contents (measures, attributes) of the insight & the shape of
 * the LDM itself. Some data sets will not be available as they are unreachable given the measures/attributes
 * used in the insight.
 *
 * This generator will take into account the current object availability config.
 *
 * @param ctx - dashboard context in which the resolution should be done
 * @param insight - insight to use during availability check
 */
export declare function loadDateDatasetsForInsight(ctx: DashboardContext, insight: IInsightDefinition): SagaIterator<ICatalogDateDataset[]>;
