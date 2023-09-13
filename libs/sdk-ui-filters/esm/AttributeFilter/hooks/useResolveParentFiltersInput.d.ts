import { AttributeFiltersOrPlaceholders } from "@gooddata/sdk-ui";
import { IElementsQueryAttributeFilter } from "@gooddata/sdk-backend-spi";
import { ParentFilterOverAttributeType } from "../types.js";
/**
 * @internal
 */
export declare const useResolveParentFiltersInput: (parentFilters?: AttributeFiltersOrPlaceholders, overAttribute?: ParentFilterOverAttributeType) => IElementsQueryAttributeFilter[];
