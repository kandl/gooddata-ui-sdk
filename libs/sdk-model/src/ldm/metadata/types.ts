// (C) 2019-2024 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { ObjectType, ObjRef } from "../../objRef/index.js";
// import { IAuditableDates } from "../../base/metadata.js";

/**
 * @public
 */
export interface IMetadataObjectIdentity {
    /**
     * Metadata object reference
     */
    ref: ObjRef;

    /**
     * Metadata object identifier
     * Currently, our implementation still depends on converting id to uri (or uri to id)
     * So until we add cache, keep both id and uri exposed on metadata objects
     */
    id: string;

    /**
     * Metadata object uri
     * Currently, our implementation still depends on converting id to uri (or uri to id)
     * So until we add cache, keep both id and uri exposed on metadata objects
     */
    uri: string;
}

/**
 * @public
 */
export interface IMetadataObjectBase {
    /**
     * Type of metadata object
     */
    type: ObjectType;

    /**
     * Title
     */
    title: string;

    /**
     * Description
     */
    description: string;

    /**
     * Is production
     */
    production: boolean;

    /**
     * Is metadata object deprecated?
     * Deprecated metadata objects still work in created reports or insights,
     * but you cannot select them for new ones (they are not displayed in the lists).
     */
    deprecated: boolean;

    /**
     * Indicates whether the item is unlisted. Depending on the context, unlisted items may
     * not be shown to the users at all or may be shown with a special indicator.
     */
    unlisted: boolean;
}

/**
 * @public
 */
export interface IMetadataObject extends IMetadataObjectBase, IMetadataObjectIdentity {}

/**
 * Type guard checking whether input is an instance of {@link IMetadataObject}.
 *
 * @public
 */
export function isMetadataObject(obj: unknown): obj is IMetadataObject {
    const c = obj as IMetadataObject;

    return !isEmpty(c) && c.type !== undefined && c.ref !== undefined;
}

/**
 * Following interfaces are intended to replace IMetadataObject in the future.
 */

/**
 * @alpha
 */
export interface IMdObject<TObjectType extends ObjectType> {
    /**
     * Metadata object identifier
     */
    id: string;

    /**
     * Type of metadata object
     */
    type: TObjectType;

    /**
     * Title
     */
    title?: string;

    /**
     * Description
     */
    description?: string;

    /**
     * Tags
     */
    tags?: string[];
}

/**
 * Utility type to convert {@link IMdObject} to its definition.
 *
 * @alpha
 */
export type ToMdObjectDefinition<T extends IMdObject<any>> = Omit<T, "id">;
