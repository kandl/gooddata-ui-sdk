// (C) 2019-2023 GoodData Corporation
import identity from "lodash/identity.js";
import cloneDeep from "lodash/cloneDeep.js";
import isEmpty from "lodash/isEmpty.js";
import { isAttribute } from "./index.js";
import { objRefToString, isObjRef } from "../../objRef/index.js";
import { idRef } from "../../objRef/factory.js";
import SparkMD5 from "spark-md5";
import { sanitizeLocalId } from "../../sanitizeLocalId.js";
/**
 * Builder for attributes.
 *
 * Do not instantiate this class directly. Instead use {@link newAttribute} or {@link modifyAttribute}.
 *
 * @public
 */
export class AttributeBuilder {
    /**
     * @internal
     */
    constructor(input) {
        this.customLocalId = false;
        /**
         * Sets alias - alternative title - for the attribute.
         *
         * @remarks
         * This value will then be used in various chart-specific descriptive elements. For convenience if no alias is specified,
         * the attribute will fall back to server-defined value.
         *
         * @param alias - alias to use instead of attribute title; undefined to use server-defined value
         */
        this.alias = (alias) => {
            if (!alias) {
                return this.noAlias();
            }
            this.attribute.alias = alias;
            return this;
        };
        /**
         * Resets alias - alternative title - set for the attribute.
         *
         * @remarks
         * The server-defined title of the attribute will be used instead.
         */
        this.noAlias = () => {
            delete this.attribute.alias;
            return this;
        };
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
        this.showAllValues = (showAllValues) => {
            if (showAllValues === undefined) {
                delete this.attribute.showAllValues;
            }
            else {
                this.attribute.showAllValues = showAllValues;
            }
            return this;
        };
        /**
         * Sets display form reference.
         *
         * @param ref - new ref to use
         */
        this.displayForm = (ref) => {
            this.attribute.displayForm = ref;
            return this;
        };
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
        this.localId = (localId) => {
            if (!localId || localId.trim().length === 0) {
                return this.defaultLocalId();
            }
            this.attribute.localIdentifier = localId;
            this.customLocalId = true;
            return this;
        };
        /**
         * Indicates that the attribute's localId should be generated using the default local-id generator logic.
         */
        this.defaultLocalId = () => {
            this.attribute.localIdentifier = "";
            this.customLocalId = false;
            return this;
        };
        /**
         * Creates the IAttribute instance.
         */
        this.build = () => {
            const localIdentifier = this.getOrGenerateLocalId();
            return {
                attribute: Object.assign(Object.assign({}, this.attribute), { localIdentifier }),
            };
        };
        if (isAttribute(input)) {
            this.attribute = cloneDeep(input.attribute);
            this.customLocalId = true;
        }
        else {
            const displayForm = isObjRef(input) ? input : idRef(input, "displayForm");
            this.attribute = {
                displayForm,
                localIdentifier: "",
            };
        }
    }
    getOrGenerateLocalId() {
        if (this.customLocalId && !isEmpty(this.attribute.localIdentifier)) {
            return this.attribute.localIdentifier;
        }
        return sanitizeLocalId(["a", this.calculateAliasHash(), objRefToString(this.attribute.displayForm)]
            .filter((part) => !isEmpty(part))
            .join("_"));
    }
    calculateAliasHash() {
        if (!this.attribute.alias) {
            return "";
        }
        const hasher = new SparkMD5();
        hasher.append(this.attribute.alias);
        return hasher.end().substr(0, 8);
    }
}
/**
 * Creates a new attribute with the specified display form ref and optional modifications and localIdentifier.
 * @param displayFormRefOrId - ref or identifier of the attribute display form
 * @param modifications - optional modifications (e.g. alias, etc.)
 * @public
 */
export function newAttribute(displayFormRefOrId, modifications = identity) {
    const builder = new AttributeBuilder(displayFormRefOrId);
    return modifications(builder).build();
}
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
export function modifyAttribute(attribute, modifications = identity) {
    const builder = new AttributeBuilder(attribute);
    return modifications(builder).build();
}
//# sourceMappingURL=factory.js.map