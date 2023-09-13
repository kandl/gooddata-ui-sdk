import { SagaIterator } from "redux-saga";
import { RemoveAttributeFilters } from "../../../commands/filters.js";
import { DashboardContext } from "../../../types/commonTypes.js";
export declare function removeAttributeFiltersHandler(ctx: DashboardContext, cmd: RemoveAttributeFilters): SagaIterator<void>;
