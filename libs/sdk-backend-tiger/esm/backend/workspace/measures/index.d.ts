import { IWorkspaceMeasuresService, IMeasureExpressionToken, IMeasureReferencing } from "@gooddata/sdk-backend-spi";
import { ObjRef, IMeasureMetadataObjectDefinition, IMeasureMetadataObject } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
export declare class TigerWorkspaceMeasures implements IWorkspaceMeasuresService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string);
    getMeasureExpressionTokens(ref: ObjRef): Promise<IMeasureExpressionToken[]>;
    private resolveToken;
    private resolveObjectToken;
    createMeasure(measure: IMeasureMetadataObjectDefinition): Promise<IMeasureMetadataObject>;
    updateMeasure(measure: IMeasureMetadataObject): Promise<IMeasureMetadataObject>;
    deleteMeasure(measureRef: ObjRef): Promise<void>;
    getMeasureReferencingObjects: (ref: ObjRef) => Promise<IMeasureReferencing>;
}
//# sourceMappingURL=index.d.ts.map