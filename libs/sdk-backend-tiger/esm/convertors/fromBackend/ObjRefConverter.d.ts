import { AfmObjectIdentifier } from "@gooddata/api-client-tiger";
import { ObjRef } from "@gooddata/sdk-model";
import { TigerObjectType } from "../../types/index.js";
import { TigerCompatibleObjectType } from "../../types/refTypeMapping.js";
export declare function toObjectType(value: TigerObjectType): TigerCompatibleObjectType;
export declare function toObjRef(qualifier: AfmObjectIdentifier): ObjRef;
export type JsonApiId = {
    id: string;
    type: string;
};
export declare function isJsonApiId(obj: unknown): obj is JsonApiId;
export declare function jsonApiIdToObjRef(idAndType: JsonApiId): ObjRef;
//# sourceMappingURL=ObjRefConverter.d.ts.map