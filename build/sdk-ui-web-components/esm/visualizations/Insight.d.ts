/// <reference types="react" />
import { CustomElementAdapter, LOAD_COMPONENT, GET_VISUALIZATION } from "./CustomElementAdapter.js";
import { CustomElementContext } from "../context.js";
import type { InsightView } from "@gooddata/sdk-ui-ext";
type IInsightView = typeof InsightView;
export declare class Insight extends CustomElementAdapter<IInsightView> {
    static get observedAttributes(): string[];
    [LOAD_COMPONENT](): Promise<typeof InsightView>;
    [GET_VISUALIZATION](Component: IInsightView, { backend, workspaceId, mapboxToken }: CustomElementContext): JSX.Element;
}
export {};
//# sourceMappingURL=Insight.d.ts.map