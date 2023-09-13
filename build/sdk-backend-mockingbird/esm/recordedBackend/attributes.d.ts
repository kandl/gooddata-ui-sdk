import { RecordedBackendConfig, RecordingIndex } from "./types.js";
import { ObjRef, IAttributeDisplayFormMetadataObject, IAttributeMetadataObject, IMetadataObject } from "@gooddata/sdk-model";
import { IElementsQueryFactory, IWorkspaceAttributesService } from "@gooddata/sdk-backend-spi";
/**
 * @internal
 */
export declare class RecordedAttributes implements IWorkspaceAttributesService {
    private recordings;
    private config;
    constructor(recordings: RecordingIndex, config: RecordedBackendConfig);
    elements(): IElementsQueryFactory;
    getAttributeDisplayForm: (ref: ObjRef) => Promise<IAttributeDisplayFormMetadataObject>;
    getAttribute: (ref: ObjRef) => Promise<IAttributeMetadataObject>;
    getAttributeByDisplayForm: (ref: ObjRef) => Promise<IAttributeMetadataObject>;
    getCommonAttributes(attributeRefs: ObjRef[]): Promise<ObjRef[]>;
    getCommonAttributesBatch(attributesRefsBatch: ObjRef[][]): Promise<ObjRef[][]>;
    getAttributeDisplayForms: (refs: ObjRef[]) => Promise<IAttributeDisplayFormMetadataObject[]>;
    getAttributes: (refs: ObjRef[]) => Promise<IAttributeMetadataObject[]>;
    getAttributeDatasetMeta(_: ObjRef): Promise<IMetadataObject>;
    private sanitizeAttribute;
    private isObjWithRef;
}
//# sourceMappingURL=attributes.d.ts.map