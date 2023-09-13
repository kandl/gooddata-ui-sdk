import { IAttributeMetadataObject } from "@gooddata/sdk-model";
import { AttributeFilterHandlerStoreContext } from "../store/types.js";
import { IElementsQueryAttributeFilter } from "@gooddata/sdk-backend-spi";
/**
 * @internal
 */
export declare function loadLimitingAttributeFiltersAttributes(context: AttributeFilterHandlerStoreContext, limitingAttributeFilters: IElementsQueryAttributeFilter[]): Promise<IAttributeMetadataObject[]>;
