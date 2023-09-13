import { SagaIterator } from "redux-saga";
import { ObjRef } from "@gooddata/sdk-model";
import { DashboardContext, FiltersInfo } from "../../types/commonTypes.js";
export declare function getDrillToUrlFiltersWithResolvedValues(ctx: DashboardContext, widgetRef: ObjRef): SagaIterator<FiltersInfo>;
