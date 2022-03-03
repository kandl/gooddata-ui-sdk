// (C) 2019-2022 GoodData Corporation
import { idRef } from "@gooddata/sdk-model";
import { IDashboardPlugin, IDashboardPluginLink } from "@gooddata/sdk-backend-spi";
import snakeCase from "lodash/snakeCase";
const { SERVER_URL } = require("./constants.ts");

// const SERVER_URL = "http://localhost:9500/dashboard-plugin-tests"

export function convertToPluginIdentifier(name: string): string {
    return `dp_${snakeCase(name)}`;
}

export function createLocalTestPlugin(id: string): IDashboardPlugin {
    return {
        identifier: id,
        name: id,
        ref: idRef(id),
        tags: [],
        type: "IDashboardPlugin",
        uri: `/${id}`,
        url: `${SERVER_URL}/plugins/${id}/${convertToPluginIdentifier(id)}.js`,
    };
}

export function createLocalTestPluginLink(
    plugin: IDashboardPlugin,
    parameters?: string,
): IDashboardPluginLink {
    return {
        type: "IDashboardPluginLink",
        plugin: plugin.ref,
        parameters,
    };
}
