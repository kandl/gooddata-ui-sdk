// (C) 2021-2022 GoodData Corporation
import React from "react";
import { LoadingComponent as DefaultLoading, useClientWorkspaceStatus, useClientWorkspaceIdentifiers, useClientWorkspaceInitialized, } from "@gooddata/sdk-ui";
import { DashboardRenderer } from "./components/DashboardRenderer.js";
/**
 * @internal
 */
export const Dashboard = (props) => {
    var _a;
    const workspaceStatus = useClientWorkspaceStatus();
    const clientWsIdentifiers = useClientWorkspaceIdentifiers();
    const isClientWorkspaceInitialized = useClientWorkspaceInitialized();
    if (!isClientWorkspaceInitialized) {
        return React.createElement(DashboardRenderer, Object.assign({}, props));
    }
    const LoadingComponent = (_a = props.LoadingComponent) !== null && _a !== void 0 ? _a : DefaultLoading;
    /**
     * Show loading indicator if the client workspace is loading and the workspace
     * is not defined.
     */
    if (workspaceStatus !== "success") {
        return React.createElement(LoadingComponent, null);
    }
    return React.createElement(DashboardRenderer, Object.assign({ workspace: clientWsIdentifiers.workspace }, props));
};
//# sourceMappingURL=Dashboard.js.map