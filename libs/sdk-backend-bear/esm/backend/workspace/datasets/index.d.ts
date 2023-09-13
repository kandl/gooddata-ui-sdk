import { IWorkspaceDatasetsService } from "@gooddata/sdk-backend-spi";
import { IMetadataObject, IDataset } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearWorkspaceDataSets implements IWorkspaceDatasetsService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    getDatasets(): Promise<IDataset[]>;
    getAllDatasetsMeta(): Promise<IMetadataObject[]>;
}
//# sourceMappingURL=index.d.ts.map