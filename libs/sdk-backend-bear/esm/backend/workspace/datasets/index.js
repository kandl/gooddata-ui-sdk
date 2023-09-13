import { convertMetadataObjectXrefEntry } from "../../../convertors/fromBackend/MetaConverter.js";
import { convertDataSet } from "../../../convertors/fromBackend/DataSetConverter.js";
export class BearWorkspaceDataSets {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
    }
    async getDatasets() {
        const result = await this.authCall((sdk) => sdk.catalogue.loadDataSets(this.workspace));
        return result.map(convertDataSet);
    }
    async getAllDatasetsMeta() {
        const datasetsResult = await this.authCall((sdk) => sdk.project.getDatasets(this.workspace));
        return datasetsResult.map((dataset) => convertMetadataObjectXrefEntry("dataSet", dataset));
    }
}
//# sourceMappingURL=index.js.map