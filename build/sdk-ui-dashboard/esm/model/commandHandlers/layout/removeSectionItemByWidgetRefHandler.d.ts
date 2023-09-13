import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { RemoveSectionItemByWidgetRef } from "../../commands/layout.js";
export declare function removeSectionItemByWidgetRefHandler(ctx: DashboardContext, cmd: RemoveSectionItemByWidgetRef): SagaIterator<void>;
