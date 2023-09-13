import { ObjRef, IAttributeDisplayFormMetadataObject, IAttributeMetadataObject, IMetadataObject } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
import { IElementsQueryFactory, IWorkspaceAttributesService } from "@gooddata/sdk-backend-spi";
export declare class BearWorkspaceAttributes implements IWorkspaceAttributesService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    elements: () => IElementsQueryFactory;
    getAttributeDisplayForm: (ref: ObjRef) => Promise<IAttributeDisplayFormMetadataObject>;
    getAttribute: (ref: ObjRef) => Promise<IAttributeMetadataObject>;
    getCommonAttributes(attributesRefs: ObjRef[]): Promise<ObjRef[]>;
    getCommonAttributesBatch(attributesRefsBatch: ObjRef[][]): Promise<ObjRef[][]>;
    getAttributeByDisplayForm(ref: ObjRef): Promise<IAttributeMetadataObject>;
    getAttributeDisplayForms: (refs: ObjRef[]) => Promise<IAttributeDisplayFormMetadataObject[]>;
    getAttributes: (refs: ObjRef[]) => Promise<IAttributeMetadataObject[]>;
    private buildAttributeDisplayForm;
    private buildAttribute;
    getAttributeDatasetMeta(ref: ObjRef): Promise<IMetadataObject>;
}
//# sourceMappingURL=index.d.ts.map