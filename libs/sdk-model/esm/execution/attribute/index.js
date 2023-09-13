// (C) 2019-2023 GoodData Corporation
import { isUriRef, isIdentifierRef } from "../../objRef/index.js";
import isEmpty from "lodash/isEmpty.js";
import { invariant } from "ts-invariant";
/**
 * Type guard checking whether object is an instance of IAttribute.
 *
 * @public
 */
export function isAttribute(obj) {
    return !isEmpty(obj) && obj.attribute !== undefined;
}
/**
 * Predicate that returns true for any attribute.
 *
 * @public
 */
export const anyAttribute = (_) => true;
/**
 * Factory function for attribute predicate which evaluates true for attributes that match particular ID.
 *
 * @public
 */
export const idMatchAttribute = (id) => (attr) => attr.attribute.localIdentifier === id;
//
//
//
/**
 * Gets local identifier of an attribute.
 *
 * @remarks
 * For convenience and fluency, this function accepts both attribute object and identifier.
 *
 * @param attributeOrId - attribute to work with or the identifier
 * @returns value of local identifier
 * @public
 */
export function attributeLocalId(attributeOrId) {
    invariant(attributeOrId, "attribute must be specified");
    return typeof attributeOrId === "string" ? attributeOrId : attributeOrId.attribute.localIdentifier;
}
/**
 * Gets URI of attribute's display form to use and get attribute element values from.
 *
 * @param attribute - attribute to work with, may be undefined == result is undefined
 * @returns display form URI as string, undefined if display form not specified using URI
 * @public
 */
export function attributeUri(attribute) {
    invariant(attribute, "attribute must be specified");
    return isUriRef(attribute.attribute.displayForm) ? attribute.attribute.displayForm.uri : undefined;
}
/**
 * Gets identifier of attribute's display form to use and get attribute element values from.
 *
 * @param attribute - attribute to work with, may be undefined == result is undefined
 * @returns display form identifier as string, undefined if display for not specified using identifier
 * @public
 */
export function attributeIdentifier(attribute) {
    invariant(attribute, "attribute must be specified");
    return isIdentifierRef(attribute.attribute.displayForm)
        ? attribute.attribute.displayForm.identifier
        : undefined;
}
/**
 * Gets an attribute alias.
 *
 * @param attribute - attribute to work with
 * @returns value of attribute alias
 * @public
 */
export function attributeAlias(attribute) {
    invariant(attribute, "attribute must be specified");
    return attribute.attribute.alias;
}
/**
 * Gets an attribute show all values property.
 *
 * @param attribute - attribute to work with
 * @returns value of attribute show all values property
 * @public
 */
export function attributeShowAllValues(attribute) {
    invariant(attribute, "attribute must be specified");
    return attribute.attribute.showAllValues;
}
/**
 * Gets an attribute display form object ref.
 *
 * @param attribute - attribute to work with
 * @returns value of attribute display form object ref
 * @public
 */
export function attributeDisplayFormRef(attribute) {
    invariant(attribute, "attribute must be specified");
    return attribute.attribute.displayForm;
}
/**
 * Given list of attributes, returns first-found attribute matching the provided predicate.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyAttribute predicate - meaning first found attribute
 * will be returned.
 *
 * This function also provides convenience to find attribute by its local identifier - if you pass predicate as
 * string the function will automatically create idMatchAttribute predicate.
 *
 * @param attributes - list of attributes to work with, must be specified
 * @param idOrFun - attribute identifier or instance of AttributePredicate; {@link anyAttribute} predicate is default
 * @public
 */
export function attributesFind(attributes, idOrFun = anyAttribute) {
    invariant(attributes, "attributes must be specified");
    if (!attributes.length) {
        return;
    }
    const predicate = typeof idOrFun === "string" ? idMatchAttribute(idOrFun) : idOrFun;
    return attributes.find(predicate);
}
//# sourceMappingURL=index.js.map