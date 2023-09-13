import { IWorkspaceFactsService } from "@gooddata/sdk-backend-spi";
import { ObjRef, IMetadataObject } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearWorkspaceFacts implements IWorkspaceFactsService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    getFactDatasetMeta(ref: ObjRef): Promise<IMetadataObject>;
}
//# sourceMappingURL=index.d.ts.map