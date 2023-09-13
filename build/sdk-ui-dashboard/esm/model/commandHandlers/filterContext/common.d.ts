import { SagaIterator } from "redux-saga";
import { IDashboardDateFilter } from "@gooddata/sdk-model";
import { IDashboardCommand } from "../../commands/base.js";
import { DashboardContext } from "../../types/commonTypes.js";
export declare function dispatchFilterContextChanged(ctx: DashboardContext, cmd: IDashboardCommand): SagaIterator<void>;
export declare function canApplyDateFilter(dateFilter: IDashboardDateFilter): SagaIterator<boolean>;
