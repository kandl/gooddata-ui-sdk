import { IAttributeMetadataObject, isAttributeMetadataObject } from "./attribute/index.js";
import { IAttributeDisplayFormMetadataObject, isAttributeDisplayFormMetadataObject, attributeDisplayFormMetadataObjectAttributeRef, attributeDisplayFormMetadataObjectRef, attributeDisplayFormMetadataObjectTitle, AttributeDisplayFormType } from "./attributeDisplayForm/index.js";
import { IAttributeHierarchyMetadataObject, isAttributeHierarchyMetadataObject } from "./attributeHierarchy/index.js";
import { IDashboardMetadataObject, isDashboardMetadataObject } from "./dashboard/index.js";
import { IDataSetMetadataObject, isDataSetMetadataObject } from "./dataSet/index.js";
import { IFactMetadataObject, isFactMetadataObject } from "./fact/index.js";
import { IMeasureMetadataObject, IMeasureMetadataObjectBase, IMetadataObjectDefinition, IMeasureMetadataObjectDefinition, isMeasureMetadataObject, isMeasureMetadataObjectDefinition } from "./measure/index.js";
import { IMetadataObject, IMetadataObjectBase, IMetadataObjectIdentity, isMetadataObject } from "./types.js";
import { isVariableMetadataObject, IVariableMetadataObject } from "./variable/index.js";
export { IMetadataObject, IMetadataObjectBase, IMetadataObjectIdentity, isMetadataObject, IAttributeMetadataObject, isAttributeMetadataObject, IAttributeDisplayFormMetadataObject, isAttributeDisplayFormMetadataObject, AttributeDisplayFormType, IFactMetadataObject, isFactMetadataObject, IMeasureMetadataObject, IMeasureMetadataObjectBase, IMetadataObjectDefinition, isMeasureMetadataObject, IMeasureMetadataObjectDefinition, isMeasureMetadataObjectDefinition, IDataSetMetadataObject, isDataSetMetadataObject, IVariableMetadataObject, isVariableMetadataObject, IDashboardMetadataObject, isDashboardMetadataObject, attributeDisplayFormMetadataObjectAttributeRef, attributeDisplayFormMetadataObjectRef, attributeDisplayFormMetadataObjectTitle, IAttributeHierarchyMetadataObject, isAttributeHierarchyMetadataObject, };
/**
 * Type that represents any metadata object
 *
 * @public
 */
export type MetadataObject = IAttributeMetadataObject | IAttributeDisplayFormMetadataObject | IFactMetadataObject | IMeasureMetadataObject | IDataSetMetadataObject | IVariableMetadataObject | IDashboardMetadataObject | IAttributeHierarchyMetadataObject;
/**
 * Get metadata object identifier
 *
 * @public
 */
export declare const metadataObjectId: (metadataObject: MetadataObject) => string;
//# sourceMappingURL=index.d.ts.map