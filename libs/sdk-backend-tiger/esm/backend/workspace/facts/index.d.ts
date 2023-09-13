import { IWorkspaceFactsService } from "@gooddata/sdk-backend-spi";
import { IMetadataObject, ObjRef } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
export declare class TigerWorkspaceFacts implements IWorkspaceFactsService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string);
    getFactDatasetMeta(ref: ObjRef): Promise<IMetadataObject>;
}
//# sourceMappingURL=index.d.ts.map