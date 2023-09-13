import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeLayoutSectionHeader } from "../../commands/index.js";
import { DashboardLayoutSectionHeaderChanged } from "../../events/layout.js";
export declare function changeLayoutSectionHeaderHandler(ctx: DashboardContext, cmd: ChangeLayoutSectionHeader): SagaIterator<DashboardLayoutSectionHeaderChanged>;
