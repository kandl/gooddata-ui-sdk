import { IWorkspaceDatasetsService } from "@gooddata/sdk-backend-spi";
import { IMetadataObject, IDataset } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
export declare class TigerWorkspaceDataSets implements IWorkspaceDatasetsService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string);
    getDatasets(): Promise<IDataset[]>;
    getAllDatasetsMeta(): Promise<IMetadataObject[]>;
}
//# sourceMappingURL=index.d.ts.map