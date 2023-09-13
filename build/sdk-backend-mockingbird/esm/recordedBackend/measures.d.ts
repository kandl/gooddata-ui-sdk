import { IWorkspaceMeasuresService, IMeasureExpressionToken, IMeasureReferencing } from "@gooddata/sdk-backend-spi";
import { ObjRef, IMeasureMetadataObject, IMeasureMetadataObjectDefinition } from "@gooddata/sdk-model";
/**
 * @internal
 */
export declare class RecordedMeasures implements IWorkspaceMeasuresService {
    getMeasureExpressionTokens(_: ObjRef): Promise<IMeasureExpressionToken[]>;
    createMeasure(_: IMeasureMetadataObjectDefinition): Promise<IMeasureMetadataObject>;
    deleteMeasure(_: ObjRef): Promise<void>;
    updateMeasure(_: IMeasureMetadataObject): Promise<IMeasureMetadataObject>;
    getMeasureReferencingObjects(_: ObjRef): Promise<IMeasureReferencing>;
}
//# sourceMappingURL=measures.d.ts.map