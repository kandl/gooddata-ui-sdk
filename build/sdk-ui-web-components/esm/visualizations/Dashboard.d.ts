import React from "react";
import { CustomElementAdapter, GET_VISUALIZATION, LOAD_COMPONENT } from "./CustomElementAdapter.js";
import { CustomElementContext } from "../context.js";
import type { Dashboard as OriginalDashboard } from "@gooddata/sdk-ui-dashboard";
type IDashboard = typeof OriginalDashboard;
export declare class Dashboard extends CustomElementAdapter<IDashboard> {
    static get observedAttributes(): string[];
    [LOAD_COMPONENT](): Promise<React.FC<import("@gooddata/sdk-ui-dashboard").IDashboardProps>>;
    [GET_VISUALIZATION](Component: IDashboard, { backend, workspaceId, mapboxToken }: CustomElementContext): JSX.Element;
}
export {};
//# sourceMappingURL=Dashboard.d.ts.map