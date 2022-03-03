// (C) 2019-2022 GoodData Corporation
import { createLocalTestPlugin, createLocalTestPluginLink } from "./utils";
import { LocalDashboardPluginsConfig } from "./types";

export const SIMPLE_DASHBOARD = "aaw44pxZplIi";

export const TEST_PLUGIN = createLocalTestPlugin("test-plugin");

export const LOCAL_PLUGINS_CONFIG: LocalDashboardPluginsConfig = {
    plugins: [TEST_PLUGIN],
    links: {
        [SIMPLE_DASHBOARD]: [createLocalTestPluginLink(TEST_PLUGIN)],
    },
};
