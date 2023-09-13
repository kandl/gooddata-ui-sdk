import { ObjRef } from "../../../objRef/index.js";
import { IMetadataObject } from "../types.js";
/**
 * Attribute display form type
 *
 * @public
 */
export type AttributeDisplayFormType = 
/**
 * Display form representing hyperlink
 */
"GDC.link"
/**
 * Display form representing geo pin location.
 * Both latitude and longitude in single value (lat;long).
 */
 | "GDC.geo.pin"
/**
 * Display form representing geo pin latitude.
 */
 | "GDC.geo.pin_latitude"
/**
 * Display form representing geo pin longitude.
 */
 | "GDC.geo.pin_longitude";
/**
 * Attribute display form metadata object
 *
 * @public
 */
export interface IAttributeDisplayFormMetadataObject extends IMetadataObject {
    type: "displayForm";
    /**
     * A reference to the attribute that displayForm represents
     */
    attribute: ObjRef;
    /**
     * Subtype of the display form
     * (e.g. GDC.geo.pin, or GDC.link, see constants above).
     */
    displayFormType?: AttributeDisplayFormType | string;
    /**
     * Default display form of attribute.
     */
    isDefault?: boolean;
}
/**
 * Gets the attribute display form's ObjRef
 * @param displayForm - attribute display form to work with
 * @returns ObjRef of the attribute display form
 * @public
 */
export declare function attributeDisplayFormMetadataObjectRef(displayForm: IAttributeDisplayFormMetadataObject): ObjRef;
/**
 * Gets the attribute display form's title.
 * @param displayForm - attribute display form to work with
 * @returns title of the attribute display form
 * @public
 */
export declare function attributeDisplayFormMetadataObjectTitle(displayForm: IAttributeDisplayFormMetadataObject): string;
/**
 * Gets ObjRef of the attribute the display form is a form of.
 *
 * @param displayForm - attribute display form to work with
 * @returns display form ObjRef
 * @public
 */
export declare function attributeDisplayFormMetadataObjectAttributeRef(displayForm: IAttributeDisplayFormMetadataObject): ObjRef;
/**
 * Tests whether the provided object is of type {@link IAttributeDisplayFormMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isAttributeDisplayFormMetadataObject(obj: unknown): obj is IAttributeDisplayFormMetadataObject;
//# sourceMappingURL=index.d.ts.map