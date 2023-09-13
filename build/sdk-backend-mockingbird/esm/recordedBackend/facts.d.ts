import { IWorkspaceFactsService } from "@gooddata/sdk-backend-spi";
import { IMetadataObject, ObjRef } from "@gooddata/sdk-model";
/**
 * @internal
 */
export declare class RecordedFacts implements IWorkspaceFactsService {
    getFactDatasetMeta(_: ObjRef): Promise<IMetadataObject>;
}
//# sourceMappingURL=facts.d.ts.map