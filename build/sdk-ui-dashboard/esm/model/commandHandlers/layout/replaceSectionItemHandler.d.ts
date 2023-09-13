import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { ReplaceSectionItem } from "../../commands/index.js";
import { DashboardLayoutSectionItemReplaced } from "../../events/layout.js";
export declare function replaceSectionItemHandler(ctx: DashboardContext, cmd: ReplaceSectionItem): SagaIterator<DashboardLayoutSectionItemReplaced>;
