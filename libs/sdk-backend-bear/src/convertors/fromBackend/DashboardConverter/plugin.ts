// (C) 2021-2022 GoodData Corporation

import { GdcDashboardPlugin } from "@gooddata/api-model-bear";
import { uriRef, IDashboardPlugin } from "@gooddata/sdk-model";

export function convertDashboardPlugin(plugin: GdcDashboardPlugin.IWrappedDashboardPlugin): IDashboardPlugin {
    const {
        dashboardPlugin: {
            content: { url },
            meta: { title, summary, uri, identifier, updated, created, tags },
        },
    } = plugin;

    return {
        type: "IDashboardPlugin",
        name: title,
        description: summary ?? "",
        uri: uri!,
        id: identifier!,
        updated: updated,
        created: created,
        tags: tags?.split(" ").filter((t) => t) ?? [],
        ref: uriRef(uri!),
        url: url,
    };
}
