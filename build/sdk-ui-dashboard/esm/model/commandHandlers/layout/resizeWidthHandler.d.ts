import { SagaIterator } from "redux-saga";
import { ResizeWidth } from "../../commands/layout.js";
import { DashboardContext } from "../../types/commonTypes.js";
import { DashboardLayoutSectionItemWidthResized } from "../../events/layout.js";
export declare function resizeWidthHandler(ctx: DashboardContext, cmd: ResizeWidth): SagaIterator<DashboardLayoutSectionItemWidthResized>;
