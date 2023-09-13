import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { RemoveSectionItem, RemoveSectionItemByWidgetRef } from "../../commands/index.js";
import { selectLayout } from "../../store/layout/layoutSelectors.js";
type RemoveSectionItemContext = {
    readonly ctx: DashboardContext;
    readonly cmd: Omit<RemoveSectionItem, "type">;
    originalCmd: RemoveSectionItem | RemoveSectionItemByWidgetRef;
    readonly layout: ReturnType<typeof selectLayout>;
};
export declare function removeSectionItemHandler(ctx: DashboardContext, cmd: RemoveSectionItem): SagaIterator<void>;
export declare function removeSectionItemSaga(ctx: DashboardContext, cmd: RemoveSectionItem | RemoveSectionItemContext["cmd"], originalCmd?: RemoveSectionItemByWidgetRef): SagaIterator<void>;
export {};
