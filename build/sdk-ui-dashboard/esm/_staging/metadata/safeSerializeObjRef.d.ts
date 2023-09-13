import { ObjRefInScope } from "@gooddata/sdk-model";
/**
 * Wrapper around {@link @gooddata/sdk-model#serializeObjRef} that can handle undefined values.
 *
 * @param ref - ref to serialize
 */
export declare function safeSerializeObjRef(ref: ObjRefInScope | undefined): string;
