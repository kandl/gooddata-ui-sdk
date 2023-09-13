import { IElementsQueryResult, CancelableOptions } from "@gooddata/sdk-backend-spi";
import { IAttributeElement, ObjRef } from "@gooddata/sdk-model";
import { ILoadElementsOptions } from "../../../types/index.js";
import { AttributeFilterHandlerStoreContext } from "../store/types.js";
import { IHiddenElementsInfo } from "./types.js";
/**
 * @internal
 */
export declare function loadElements(context: AttributeFilterHandlerStoreContext, options: ILoadElementsOptions & CancelableOptions & {
    displayFormRef: ObjRef;
}, hiddenElementsInfo: IHiddenElementsInfo, staticElements: IAttributeElement[] | undefined): Promise<IElementsQueryResult>;
