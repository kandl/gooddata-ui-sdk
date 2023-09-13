import { ObjRef, IFilterContextDefinition } from "@gooddata/sdk-model";
type ObjRefsToUris = (refs: ObjRef[]) => Promise<string[]>;
/**
 * Since bear backend does not support idRefs in filter context objects, we need to covert them to uriRefs if they are present.
 *
 * @param filterContext - filter context to sanitize
 * @param objRefsToUris - function converting ObjRefs to URIs
 * @returns filter context that uses uriRefs exclusively in its filters
 */
export declare function sanitizeFilterContext<T extends IFilterContextDefinition>(filterContext: T, objRefsToUris: ObjRefsToUris): Promise<T>;
export {};
//# sourceMappingURL=filterContexts.d.ts.map