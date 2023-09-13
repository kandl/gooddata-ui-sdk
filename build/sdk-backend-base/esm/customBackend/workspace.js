// (C) 2019-2021 GoodData Corporation
import { NotSupported, } from "@gooddata/sdk-backend-spi";
import { CustomExecutionFactory } from "./execution.js";
/**
 * @internal
 */
export class CustomWorkspace {
    constructor(workspace, config, state) {
        this.workspace = workspace;
        this.config = config;
        this.state = state;
    }
    getDescriptor() {
        throw new NotSupported("getting workspace descriptor is not supported");
    }
    getParentWorkspace() {
        throw new NotSupported("getting parent workspace is not supported");
    }
    execution() {
        return new CustomExecutionFactory(this.workspace, this.config, this.state);
    }
    //
    // Should implement
    //
    // used by attribute filters
    attributes() {
        throw new NotSupported("attributes service is not supported");
    }
    // used in InsightView - implement if custom backend should support persisted insights
    settings() {
        throw new NotSupported("settings not supported");
    }
    // used in InsightView - implement if custom backend should support persisted insights
    styling() {
        throw new NotSupported("styling is not supported");
    }
    //
    // Services for 'advanced' use cases - used in AD and KD.
    //
    permissions() {
        throw new NotSupported("permissions are not supported");
    }
    catalog() {
        throw new NotSupported("catalog is not supported");
    }
    measures() {
        throw new NotSupported("measures service is not supported");
    }
    facts() {
        throw new NotSupported("measures service is not supported");
    }
    datasets() {
        throw new NotSupported("data sets service is not supported");
    }
    insights() {
        throw new NotSupported("insights are not supported");
    }
    dashboards() {
        throw new NotSupported("dashboards are not supported");
    }
    users() {
        throw new NotSupported("users are not supported");
    }
    dateFilterConfigs() {
        throw new NotSupported("dateFilterConfigs are not supported");
    }
    userGroups() {
        throw new NotSupported("user groups are not supported");
    }
    accessControl() {
        throw new NotSupported("access control is not supported");
    }
}
//# sourceMappingURL=workspace.js.map