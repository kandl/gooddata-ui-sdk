// (C) 2019-2023 GoodData Corporation
import { invariant } from "ts-invariant";
import { isMetadataObject } from "../types.js";
/**
 * Gets the attribute display form's ObjRef
 * @param displayForm - attribute display form to work with
 * @returns ObjRef of the attribute display form
 * @public
 */
export function attributeDisplayFormMetadataObjectRef(displayForm) {
    invariant(displayForm, "displayForm must be specified");
    return displayForm.ref;
}
/**
 * Gets the attribute display form's title.
 * @param displayForm - attribute display form to work with
 * @returns title of the attribute display form
 * @public
 */
export function attributeDisplayFormMetadataObjectTitle(displayForm) {
    invariant(displayForm, "displayForm must be specified");
    return displayForm.title;
}
/**
 * Gets ObjRef of the attribute the display form is a form of.
 *
 * @param displayForm - attribute display form to work with
 * @returns display form ObjRef
 * @public
 */
export function attributeDisplayFormMetadataObjectAttributeRef(displayForm) {
    invariant(displayForm, "displayForm must be specified");
    return displayForm.attribute;
}
/**
 * Tests whether the provided object is of type {@link IAttributeDisplayFormMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export function isAttributeDisplayFormMetadataObject(obj) {
    return isMetadataObject(obj) && obj.type === "displayForm";
}
//# sourceMappingURL=index.js.map