import { IMetadataObject, IMetadataObjectBase } from "../types.js";
import { IAuditable } from "../../../base/metadata.js";
/**
 * @public
 */
export interface IMeasureMetadataObjectBase {
    type: "measure";
    /**
     * Measure MAQL expression
     */
    expression: string;
    /**
     * Measure formatting
     * Prefer set format value, if the format is empty string backend implementation-dependent default will be used.
     */
    format: string;
    /**
     * Measure is locked for editing
     */
    isLocked?: boolean;
}
/**
 * @public
 */
export interface IMetadataObjectDefinition extends Partial<IMetadataObjectBase>, Partial<Pick<IMetadataObject, "id">> {
}
/**
 * Measure metadata object
 *
 * @public
 */
export type IMeasureMetadataObject = IMetadataObject & IMeasureMetadataObjectBase & IAuditable;
/**
 * Measure metadata object definition
 *
 * @public
 */
export type IMeasureMetadataObjectDefinition = IMetadataObjectDefinition & IMeasureMetadataObjectBase;
/**
 * Tests whether the provided object is of type {@link IMeasureMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isMeasureMetadataObject(obj: unknown): obj is IMeasureMetadataObject;
/**
 * Tests whether the provided object is of type {@link IMeasureMetadataObjectDefinition}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isMeasureMetadataObjectDefinition(obj: unknown): obj is IMeasureMetadataObjectDefinition;
//# sourceMappingURL=index.d.ts.map