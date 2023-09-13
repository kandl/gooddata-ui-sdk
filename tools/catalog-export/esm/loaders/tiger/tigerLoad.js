// (C) 2007-2023 GoodData Corporation
import { CatalogExportError } from "../../base/types.js";
import ora from "ora";
import { logError } from "../../cli/loggers.js";
import { loadCatalog } from "./tigerCatalog.js";
import { loadInsights } from "./tigerInsights.js";
import { loadDateDataSets } from "./tigerDateDatasets.js";
import { loadAnalyticalDashboards } from "./tigerAnalyticalDashboards.js";
export async function tigerLoad(client, workspaceId) {
    var _a;
    const spinner = ora();
    try {
        spinner.start("Loading catalog of attributes and metrics…");
        const catalog = await loadCatalog(client, workspaceId);
        spinner.succeed("Catalog loaded");
        spinner.start("Loading date data sets…");
        const dateDataSets = await loadDateDataSets(client, workspaceId);
        spinner.succeed("Date data sets loaded");
        spinner.start("Loading insights…");
        const insights = await loadInsights(client, workspaceId);
        spinner.succeed("Insights loaded");
        spinner.start("Loading analytical dashboards…");
        const analyticalDashboards = await loadAnalyticalDashboards(client, workspaceId);
        spinner.succeed("Analytical dashboards loaded");
        return {
            workspaceId: workspaceId,
            catalog,
            dateDataSets,
            insights,
            analyticalDashboards,
        };
    }
    catch (err) {
        spinner.fail();
        if (((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
            // handle known error more gracefully to avoid general-type error messages
            logError(`Workspace with id '${workspaceId}' was not found. Please make sure you are passing a correct value to the 'workspace-id' argument.`);
            process.exit(1);
        }
        const more = err.response ? err.response.url : "";
        logError(`Exception: ${err.message} ${more}\n${err.stack}`);
        throw new CatalogExportError("A fatal error has occurred while loading workspace metadata", 1);
    }
}
