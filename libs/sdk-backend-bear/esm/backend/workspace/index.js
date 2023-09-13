// (C) 2019-2021 GoodData Corporation
import { BearExecution } from "./execution/executionFactory.js";
import { BearWorkspaceMeasures } from "./measures/index.js";
import { BearWorkspaceStyling } from "./styling/styling.js";
import { BearWorkspaceCatalogFactory } from "./catalog/factory.js";
import { BearWorkspaceSettings } from "./settings/settings.js";
import { BearWorkspacePermissionsFactory } from "./permissions/permissions.js";
import { BearWorkspaceInsights } from "./insights/index.js";
import { BearWorkspaceDataSets } from "./datasets/index.js";
import { BearWorkspaceDashboards } from "./dashboards/index.js";
import { BearWorkspaceUsersQuery } from "./users/index.js";
import { BearWorkspaceDateFilterConfigsQuery } from "./dateFilterConfigs/index.js";
import { BearWorkspaceAttributes } from "./attributes/index.js";
import { BearWorkspaceFacts } from "./facts/index.js";
import { BearWorkspaceUserGroupsQuery } from "./userGroups/index.js";
import { BearWorkspaceAccessControlService } from "./accessControl/index.js";
export class BearWorkspace {
    constructor(authCall, workspace, descriptor) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.descriptor = descriptor;
    }
    async getDescriptor() {
        var _a, _b;
        if (!this.descriptor) {
            const project = await this.authCall(async (sdk) => {
                return sdk.project.getProject(this.workspace);
            });
            return {
                id: this.workspace,
                description: (_a = project === null || project === void 0 ? void 0 : project.meta.summary) !== null && _a !== void 0 ? _a : "",
                title: (_b = project === null || project === void 0 ? void 0 : project.meta.title) !== null && _b !== void 0 ? _b : "",
                // isDemo:  TO-DO: Implement this using sdk.project.getProjectsWithPaging, which contains demoWorkspace prop
            };
        }
        return this.descriptor;
    }
    async getParentWorkspace() {
        // Bear has no workspace parenting
        return undefined;
    }
    attributes() {
        return new BearWorkspaceAttributes(this.authCall, this.workspace);
    }
    execution() {
        return new BearExecution(this.authCall, this.workspace);
    }
    settings() {
        return new BearWorkspaceSettings(this.authCall, this.workspace);
    }
    insights() {
        return new BearWorkspaceInsights(this.authCall, this.workspace);
    }
    dashboards() {
        return new BearWorkspaceDashboards(this.authCall, this.workspace);
    }
    measures() {
        return new BearWorkspaceMeasures(this.authCall, this.workspace);
    }
    facts() {
        return new BearWorkspaceFacts(this.authCall, this.workspace);
    }
    styling() {
        return new BearWorkspaceStyling(this.authCall, this.workspace);
    }
    catalog() {
        return new BearWorkspaceCatalogFactory(this.authCall, this.workspace);
    }
    datasets() {
        return new BearWorkspaceDataSets(this.authCall, this.workspace);
    }
    permissions() {
        return new BearWorkspacePermissionsFactory(this.authCall, this.workspace);
    }
    users() {
        return new BearWorkspaceUsersQuery(this.authCall, this.workspace);
    }
    dateFilterConfigs() {
        return new BearWorkspaceDateFilterConfigsQuery(this.authCall, this.workspace);
    }
    userGroups() {
        return new BearWorkspaceUserGroupsQuery(this.authCall, this.workspace);
    }
    accessControl() {
        return new BearWorkspaceAccessControlService(this.authCall, this.workspace);
    }
}
//# sourceMappingURL=index.js.map