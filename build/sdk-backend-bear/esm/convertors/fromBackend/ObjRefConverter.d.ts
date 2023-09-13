import { ObjQualifier, Qualifier } from "@gooddata/api-model-bear";
import { ObjectType, ObjRef, ObjRefInScope } from "@gooddata/sdk-model";
/**
 * Converts reference into a format acceptable by the SPI. URI references are left as-is, while
 * the identifier references have the object type added.
 *
 * @param ref - reference
 * @param defaultType - type to use it the ref has none specified
 * @internal
 */
export declare function fromBearRef(ref: ObjQualifier, defaultType: ObjectType): ObjRef;
/**
 * Converts scoped reference into a format acceptable by the bear SPI. URI references are left as-is, scoped
 * references are left as is, while the identifier references have the object type added.
 *
 * @param ref - reference
 * @param defaultType - type to use it the ref has none specified
 * @internal
 */
export declare function fromScopedBearRef(ref: Qualifier, defaultType: ObjectType): ObjRefInScope;
//# sourceMappingURL=ObjRefConverter.d.ts.map