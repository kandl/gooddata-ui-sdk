import { JsonApiAnalyticalDashboardOutMeta, JsonApiAnalyticalDashboardOutMetaOrigin } from "@gooddata/api-client-tiger";
type JsonApiMetadataLikeObject<T> = T & {
    id: string;
    type: string;
    meta?: JsonApiAnalyticalDashboardOutMeta;
};
export declare function isInheritedObject<T = unknown>(obj: JsonApiMetadataLikeObject<T>): boolean;
export declare function getObjectOrigin<T = unknown>(obj: JsonApiMetadataLikeObject<T>): JsonApiAnalyticalDashboardOutMetaOrigin;
/**
 * @internal
 */
export type OriginInfoWithId = JsonApiAnalyticalDashboardOutMetaOrigin & {
    id: string;
};
/**
 * This method split id by Prefix separator (:) and return origin info
 *
 * @remarks
 * Id without prefix - LOCAL origin type with not origin id
 * Id with prefix - REMOTE origin type with origin id as first part of id (before :) and
 *  id as second part if id (after :)
 *
 * @param id - string that represent id with or without prefix
 * @internal
 */
export declare function getIdOrigin(id: string): OriginInfoWithId;
export {};
//# sourceMappingURL=ObjectInheritance.d.ts.map