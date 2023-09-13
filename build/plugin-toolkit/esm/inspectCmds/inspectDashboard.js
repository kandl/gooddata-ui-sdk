import { areObjRefsEqual, idRef } from "@gooddata/sdk-model";
import { printObjectSummary } from "./output.js";
import columnify from "columnify";
import isEmpty from "lodash/isEmpty.js";
export async function inspectDashboard(config, _options) {
    const { backendInstance, workspace, identifier } = config;
    const ref = idRef(identifier, "analyticalDashboard");
    const { dashboard, references: { plugins }, } = await backendInstance
        .workspace(workspace)
        .dashboards()
        .getDashboardWithReferences(ref, undefined, undefined, ["dashboardPlugin"]);
    const { title, description, tags, updated, created } = dashboard;
    printObjectSummary({
        type: "Dashboard",
        identifier,
        title,
        description,
        tags,
        updated,
        created,
    });
    if (isEmpty(plugins)) {
        console.log("Dashboard is not linked with any plugins.");
    }
    else {
        console.log("\nLinked dashboard plugins\n");
        console.log(columnify(plugins.map((plugin) => {
            var _a;
            const link = (_a = dashboard.plugins) === null || _a === void 0 ? void 0 : _a.find((link) => {
                return areObjRefsEqual(link.plugin, plugin.ref);
            });
            return {
                identifier: plugin.identifier,
                title: plugin.name,
                url: plugin.url,
                parameters: !isEmpty(link === null || link === void 0 ? void 0 : link.parameters) ? link.parameters : "(none)",
                created: plugin.created,
                updated: plugin.updated,
            };
        })));
    }
}
//# sourceMappingURL=inspectDashboard.js.map