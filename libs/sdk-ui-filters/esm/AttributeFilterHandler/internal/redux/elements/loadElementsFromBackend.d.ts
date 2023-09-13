import { IAnalyticalBackend, IElementsQueryResult, CancelableOptions } from "@gooddata/sdk-backend-spi";
import { ObjRef } from "@gooddata/sdk-model";
import { ILoadElementsOptions } from "../../../types/index.js";
import { AttributeFilterHandlerStoreContext } from "../store/types.js";
import { IHiddenElementsInfo } from "./types.js";
/**
 * @internal
 */
export declare function loadElementsFromBackend(context: AttributeFilterHandlerStoreContext, options: ILoadElementsOptions & CancelableOptions & {
    displayFormRef: ObjRef;
}, hiddenElementsInfo: IHiddenElementsInfo): Promise<IElementsQueryResult>;
export declare const isElementUrisSupported: (backend: IAnalyticalBackend) => boolean;
