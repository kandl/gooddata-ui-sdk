import { IAttribute } from "./index.js";
import { ObjRef, Identifier } from "../../objRef/index.js";
/**
 * Input to the AttributeBuilder.
 * @public
 */
export type AttributeBuilderInput = Identifier | ObjRef | IAttribute;
/**
 * Builder for attributes.
 *
 * Do not instantiate this class directly. Instead use {@link newAttribute} or {@link modifyAttribute}.
 *
 * @public
 */
export declare class AttributeBuilder {
    private attribute;
    private customLocalId;
    /**
     * @internal
     */
    constructor(input: AttributeBuilderInput);
    /**
     * Sets alias - alternative title - for the attribute.
     *
     * @remarks
     * This value will then be used in various chart-specific descriptive elements. For convenience if no alias is specified,
     * the attribute will fall back to server-defined value.
     *
     * @param alias - alias to use instead of attribute title; undefined to use server-defined value
     */
    alias: (alias?: string | undefined) => this;
    /**
     * Resets alias - alternative title - set for the attribute.
     *
     * @remarks
     * The server-defined title of the attribute will be used instead.
     */
    noAlias: () => this;
    /**
     * Sets show all values property.
     *
     * @remarks
     * The flag showAllValues translates to a property of the same name on the attribute in execution definition.
     * If truthy, the backend will return all values of the particular attribute in the execution response
     * even if there are no data available for it.
     *
     * @param showAllValues - flag defining whether to return all attribute values for given attribute; undefined to use backend default behavior(false)
     */
    showAllValues: (showAllValues?: boolean | undefined) => this;
    /**
     * Sets display form reference.
     *
     * @param ref - new ref to use
     */
    displayForm: (ref: ObjRef) => this;
    /**
     * Sets local identifier (localId) for the attribute. LocalId can be used to reference the attribute
     * within the execution definition.
     *
     * Normally, builder will generate localId based on contents of the attribute definition - taking all
     * properties into account: in typical scenarios you don't have to call this function at all. The only exception
     * where you have to provide custom local id is if your execution must contain the exact same attribute twice.
     *
     * For convenience, this method also accepts 'undefined', which indicates that the default local id generation
     * logic should be used.
     *
     * @param localId - local identifier to set; if not specified, the builder will ensure local id will
     * be generated
     */
    localId: (localId?: Identifier | undefined) => this;
    /**
     * Indicates that the attribute's localId should be generated using the default local-id generator logic.
     */
    defaultLocalId: () => this;
    /**
     * Creates the IAttribute instance.
     */
    build: () => IAttribute;
    private getOrGenerateLocalId;
    private calculateAliasHash;
}
/**
 * Function that will be called to perform modifications of an attribute before it is fully constructed.
 *
 * @public
 */
export type AttributeModifications = (builder: AttributeBuilder) => AttributeBuilder;
/**
 * Creates a new attribute with the specified display form ref and optional modifications and localIdentifier.
 * @param displayFormRefOrId - ref or identifier of the attribute display form
 * @param modifications - optional modifications (e.g. alias, etc.)
 * @public
 */
export declare function newAttribute(displayFormRefOrId: ObjRef | Identifier, modifications?: AttributeModifications): IAttribute;
/**
 * Allows modification of an existing attribute instance.
 *
 * @remarks
 * The returned attribute will have the same localId as the original attribute. If you would like to assign
 * new/different local identifier to the attribute, you can do that using the modifications where you can provide
 * either new custom localId or indicate that the attribute should fall back to the auto-generated localId.
 *
 * @param attribute - attribute to modify
 * @param modifications - modification function
 * @public
 */
export declare function modifyAttribute(attribute: IAttribute, modifications?: AttributeModifications): IAttribute;
//# sourceMappingURL=factory.d.ts.map