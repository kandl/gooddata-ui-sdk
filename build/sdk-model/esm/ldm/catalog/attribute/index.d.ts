import { IAttributeMetadataObject } from "../../metadata/attribute/index.js";
import { IAttributeDisplayFormMetadataObject } from "../../metadata/attributeDisplayForm/index.js";
import { IGroupableCatalogItemBase } from "../group/index.js";
/**
 * Type representing catalog attribute
 *
 * @public
 */
export interface ICatalogAttribute extends IGroupableCatalogItemBase {
    /**
     * Catalog item type
     */
    type: "attribute";
    /**
     * Attribute metadata object that catalog attribute represents
     */
    attribute: IAttributeMetadataObject;
    /**
     * Default display form of the attribute
     */
    defaultDisplayForm: IAttributeDisplayFormMetadataObject;
    /**
     * Display forms of the attribute
     */
    displayForms: IAttributeDisplayFormMetadataObject[];
    /**
     * Attribute's display forms that contain geo pins (lat; lng) pairs.
     */
    geoPinDisplayForms: IAttributeDisplayFormMetadataObject[];
}
/**
 * Type guard checking whether the provided object is a {@link ICatalogAttribute}
 *
 * @public
 */
export declare function isCatalogAttribute(obj: unknown): obj is ICatalogAttribute;
//# sourceMappingURL=index.d.ts.map