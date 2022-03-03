// (C) 2019-2022 GoodData Corporation
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
import { LocalDashboardPluginsConfig } from "../../types";
import { withLocalDashboardPlugins } from "./withLocalDashboardPlugins";
import { withTestWorkspaceSettings } from "./withTestWorkspaceSettings";

export function createBackend(localDashboardPluginsConfig: LocalDashboardPluginsConfig): IAnalyticalBackend {
    return withLocalDashboardPlugins(
        withTestWorkspaceSettings(bearFactory().withAuthentication(new ContextDeferredAuthProvider())),
        localDashboardPluginsConfig,
    );
}
