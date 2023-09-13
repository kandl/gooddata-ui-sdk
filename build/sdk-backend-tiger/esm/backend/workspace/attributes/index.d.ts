import { IElementsQueryFactory, IWorkspaceAttributesService } from "@gooddata/sdk-backend-spi";
import { ObjRef, IMetadataObject, IAttributeDisplayFormMetadataObject, IAttributeMetadataObject } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
import { DateFormatter } from "../../../convertors/fromBackend/dateFormatting/types.js";
export declare class TigerWorkspaceAttributes implements IWorkspaceAttributesService {
    private readonly authCall;
    readonly workspace: string;
    private readonly dateFormatter;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string, dateFormatter: DateFormatter);
    elements(): IElementsQueryFactory;
    getAttributeDisplayForm: (ref: ObjRef) => Promise<IAttributeDisplayFormMetadataObject>;
    getAttribute: (ref: ObjRef) => Promise<IAttributeMetadataObject>;
    getAttributeDisplayForms(refs: ObjRef[]): Promise<IAttributeDisplayFormMetadataObject[]>;
    getAttributeByDisplayForm(ref: ObjRef): Promise<IAttributeMetadataObject>;
    getAttributes(refs: ObjRef[]): Promise<IAttributeMetadataObject[]>;
    getCommonAttributes(): Promise<ObjRef[]>;
    getCommonAttributesBatch(): Promise<ObjRef[][]>;
    getAttributeDatasetMeta(ref: ObjRef): Promise<IMetadataObject>;
}
//# sourceMappingURL=index.d.ts.map