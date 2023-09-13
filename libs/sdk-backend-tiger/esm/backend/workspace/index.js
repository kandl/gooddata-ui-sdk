// (C) 2019-2023 GoodData Corporation
import { NotSupported, } from "@gooddata/sdk-backend-spi";
import { TigerExecution } from "./execution/executionFactory.js";
import { TigerWorkspaceCatalogFactory } from "./catalog/factory.js";
import { TigerWorkspaceDataSets } from "./datasets/index.js";
import { TigerWorkspaceAttributes } from "./attributes/index.js";
import { TigerWorkspaceSettings } from "./settings/index.js";
import { TigerWorkspacePermissionsFactory } from "./permissions/index.js";
import { TigerWorkspaceStyling } from "./styling/index.js";
import { TigerWorkspaceInsights } from "./insights/index.js";
import { TigerWorkspaceDashboards } from "./dashboards/index.js";
import { workspaceConverter } from "../../convertors/fromBackend/WorkspaceConverter.js";
import { TigerWorkspaceMeasures } from "./measures/index.js";
import { TigerWorkspaceFacts } from "./facts/index.js";
import { TigerWorkspaceDateFilterConfigsQuery } from "./dateFilterConfigs/index.js";
import { TigerWorkspaceAccessControlService } from "./accessControl/index.js";
export class TigerWorkspace {
    constructor(authCall, workspace, dateFormatter, descriptor) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.dateFormatter = dateFormatter;
        this.descriptor = descriptor;
    }
    async getDescriptor() {
        if (!this.descriptor) {
            return workspaceConverter((await this.authCall(async (client) => {
                return client.entities.getEntityWorkspaces({
                    id: this.workspace,
                    include: ["workspaces"],
                });
            })).data.data, (await this.authCall(async (client) => {
                return client.actions.inheritedEntityPrefixes({
                    workspaceId: this.workspace,
                });
            })).data);
        }
        return this.descriptor;
    }
    async getParentWorkspace() {
        const descriptor = await this.getDescriptor();
        if (descriptor.parentWorkspace) {
            return new TigerWorkspace(this.authCall, descriptor.parentWorkspace, this.dateFormatter);
        }
        return undefined;
    }
    attributes() {
        return new TigerWorkspaceAttributes(this.authCall, this.workspace, this.dateFormatter);
    }
    execution() {
        return new TigerExecution(this.authCall, this.workspace, this.dateFormatter);
    }
    settings() {
        return new TigerWorkspaceSettings(this.authCall, this.workspace);
    }
    insights() {
        return new TigerWorkspaceInsights(this.authCall, this.workspace);
    }
    dashboards() {
        return new TigerWorkspaceDashboards(this.authCall, this.workspace);
    }
    measures() {
        return new TigerWorkspaceMeasures(this.authCall, this.workspace);
    }
    facts() {
        return new TigerWorkspaceFacts(this.authCall, this.workspace);
    }
    styling() {
        return new TigerWorkspaceStyling(this.authCall, this.workspace);
    }
    catalog() {
        return new TigerWorkspaceCatalogFactory(this.authCall, this.workspace);
    }
    datasets() {
        return new TigerWorkspaceDataSets(this.authCall, this.workspace);
    }
    permissions() {
        return new TigerWorkspacePermissionsFactory(this.authCall, this.workspace);
    }
    users() {
        throw new NotSupported("Not supported");
    }
    userGroups() {
        throw new NotSupported("Not supported");
    }
    accessControl() {
        return new TigerWorkspaceAccessControlService(this.authCall, this.workspace);
    }
    dateFilterConfigs() {
        return new TigerWorkspaceDateFilterConfigsQuery();
    }
}
//# sourceMappingURL=index.js.map