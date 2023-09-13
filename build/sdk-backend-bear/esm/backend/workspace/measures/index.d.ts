import { IMeasureExpressionToken, IMeasureReferencing, IWorkspaceMeasuresService } from "@gooddata/sdk-backend-spi";
import { IMeasureMetadataObject, IMeasureMetadataObjectDefinition, ObjRef } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearWorkspaceMeasures implements IWorkspaceMeasuresService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    getMeasureExpressionTokens(ref: ObjRef): Promise<IMeasureExpressionToken[]>;
    createMeasure(measure: IMeasureMetadataObjectDefinition): Promise<IMeasureMetadataObject>;
    deleteMeasure(ref: ObjRef): Promise<void>;
    updateMeasure(measure: IMeasureMetadataObject): Promise<IMeasureMetadataObject>;
    getMeasureReferencingObjects(ref: ObjRef): Promise<IMeasureReferencing>;
}
//# sourceMappingURL=index.d.ts.map