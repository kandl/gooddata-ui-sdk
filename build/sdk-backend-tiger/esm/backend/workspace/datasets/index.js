export class TigerWorkspaceDataSets {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
    }
    async getDatasets() {
        return this.authCall(async () => []);
    }
    async getAllDatasetsMeta() {
        return this.authCall(async () => []);
    }
}
//# sourceMappingURL=index.js.map