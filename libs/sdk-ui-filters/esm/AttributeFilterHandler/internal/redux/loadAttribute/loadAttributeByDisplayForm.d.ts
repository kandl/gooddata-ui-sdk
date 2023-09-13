import { IAttributeMetadataObject, ObjRef } from "@gooddata/sdk-model";
import { AttributeFilterHandlerStoreContext } from "../store/types.js";
/**
 * @internal
 */
export declare function loadAttributeByDisplayForm(context: AttributeFilterHandlerStoreContext, displayFormRef: ObjRef): Promise<IAttributeMetadataObject>;
