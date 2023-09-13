// (C) 2019-2023 GoodData Corporation
import { isAttributeMetadataObject } from "./attribute/index.js";
import { isAttributeDisplayFormMetadataObject, attributeDisplayFormMetadataObjectAttributeRef, attributeDisplayFormMetadataObjectRef, attributeDisplayFormMetadataObjectTitle, } from "./attributeDisplayForm/index.js";
import { isAttributeHierarchyMetadataObject, } from "./attributeHierarchy/index.js";
import { isDashboardMetadataObject } from "./dashboard/index.js";
import { isDataSetMetadataObject } from "./dataSet/index.js";
import { isFactMetadataObject } from "./fact/index.js";
import { isMeasureMetadataObject, isMeasureMetadataObjectDefinition, } from "./measure/index.js";
import { isMetadataObject } from "./types.js";
import { isVariableMetadataObject } from "./variable/index.js";
export { isMetadataObject, isAttributeMetadataObject, isAttributeDisplayFormMetadataObject, isFactMetadataObject, isMeasureMetadataObject, isMeasureMetadataObjectDefinition, isDataSetMetadataObject, isVariableMetadataObject, isDashboardMetadataObject, attributeDisplayFormMetadataObjectAttributeRef, attributeDisplayFormMetadataObjectRef, attributeDisplayFormMetadataObjectTitle, isAttributeHierarchyMetadataObject, };
/**
 * Get metadata object identifier
 *
 * @public
 */
export const metadataObjectId = (metadataObject) => metadataObject.id;
//# sourceMappingURL=index.js.map