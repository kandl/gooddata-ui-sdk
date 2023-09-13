import { ObjRef, IMeasureMetadataObject, IUser } from "@gooddata/sdk-model";
import { MetadataObjectBuilder } from "./factory.js";
import { BuilderModifications } from "../builder.js";
/**
 * Measure metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class MeasureMetadataObjectBuilder<T extends IMeasureMetadataObject = IMeasureMetadataObject> extends MetadataObjectBuilder<T> {
    expression(maql: string): this;
    format(format: string): this;
    isLocked(isLocked: boolean): this;
    created(createdAt?: string): this;
    createdBy(createdBy?: IUser): this;
    updated(updatedAt?: string): this;
    updatedBy(updatedBy?: IUser): this;
}
/**
 * Measure metadata object factory
 *
 * @param ref - measure reference
 * @param modifications - measure builder modifications to perform
 * @returns created measure metadata object
 * @beta
 */
export declare const newMeasureMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<MeasureMetadataObjectBuilder>) => IMeasureMetadataObject;
//# sourceMappingURL=measureFactory.d.ts.map