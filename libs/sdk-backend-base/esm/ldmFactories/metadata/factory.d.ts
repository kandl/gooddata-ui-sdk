import { IMetadataObject } from "@gooddata/sdk-model";
import { Builder, IBuilder } from "../builder.js";
/**
 * Metadata object builder interface
 *
 * @beta
 */
export interface IMetadataObjectBuilder<T extends IMetadataObject = IMetadataObject> extends IBuilder<T> {
    /**
     * Set metadata object title
     *
     * @param title - metadata object title
     * @returns this
     */
    title(title: string): this;
    /**
     * Set metadata object description
     *
     * @param description - metadata object description
     * @returns this
     */
    description(description: string): this;
    /**
     * Set metadata object identifier
     *
     * @param id - metadata object identifier
     * @returns this
     */
    id(id: string): this;
    /**
     * Set metadata object uri
     *
     * @param uri - metadata object uri
     * @returns this
     */
    uri(uri: string): this;
    /**
     * Sets metadata object 'unlisted' flag
     *
     * @param value - true if unlisted
     * @returns this
     */
    unlisted(value: boolean): this;
    /**
     * Set metadata object isProduction flag
     *
     * @param isProduction - true if production
     * @returns this
     */
    production(isProduction: boolean): this;
    /**
     * Set metadata object isDeprecated flag
     *
     * @param isDeprecated - true if deprecated
     * @returns this
     */
    deprecated(isDeprecated: boolean): this;
}
/**
 * Metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class MetadataObjectBuilder<T extends IMetadataObject = IMetadataObject> extends Builder<T> implements IMetadataObjectBuilder {
    title(title: string): this;
    description(description: string): this;
    id(identifier: string): this;
    uri(uri: string): this;
    unlisted(value: boolean): this;
    production(isProduction: boolean): this;
    deprecated(isDeprecated: boolean): this;
}
//# sourceMappingURL=factory.d.ts.map