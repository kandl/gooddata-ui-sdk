import { AfmObjectIdentifier, AfmLocalIdentifier, AfmIdentifier, AfmObjectIdentifierLabel, AfmObjectIdentifierDataset, AfmObjectIdentifierAttribute, AfmObjectIdentifierCore } from "@gooddata/api-client-tiger";
import { ObjRef, ObjRefInScope } from "@gooddata/sdk-model";
import { TigerAfmType, TigerObjectType } from "../../types/index.js";
import { TigerCompatibleObjectType } from "../../types/refTypeMapping.js";
export declare function toTigerType(value: TigerCompatibleObjectType | undefined, defaultValue?: TigerObjectType): TigerObjectType;
export declare function toObjQualifier(ref: ObjRef, defaultValue?: TigerAfmType): AfmObjectIdentifier;
/**
 * @internal
 */
export declare function toFactQualifier(ref: ObjRef): AfmObjectIdentifierCore;
/**
 * @internal
 */
export declare function toLabelQualifier(ref: ObjRef): AfmObjectIdentifierLabel;
/**
 * @internal
 */
export declare function toAttributeQualifier(ref: ObjRef): AfmObjectIdentifierAttribute;
/**
 * @internal
 */
export declare function toDateDataSetQualifier(ref: ObjRef): AfmObjectIdentifierDataset;
/**
 * @internal
 */
export declare function toLocalIdentifier(localIdentifier: string): AfmLocalIdentifier;
/**
 * @internal
 */
export declare function toAfmIdentifier(ref: ObjRefInScope): AfmIdentifier;
//# sourceMappingURL=ObjRefConverter.d.ts.map