import { IntlShape } from "react-intl";
import { IElementsQueryAttributeFilter } from "@gooddata/sdk-backend-spi";
import { DashboardAttributeFilterSelectionMode, IAttributeElement, IAttributeFilter } from "@gooddata/sdk-model";
import { IAttributeFilterBaseProps } from "./types.js";
/**
 * @internal
 */
export declare const ThrowMissingComponentError: (componentName: string, providerName: string) => () => never;
/**
 * @internal
 */
export declare const throwMissingCallbackError: (callbackName: string, providerName: string) => (..._args: any[]) => any;
/**
 * @internal
 */
export declare function getElementTitle(element: IAttributeElement, intl: IntlShape): string;
/**
 * @internal
 */
export declare function getElementTitles(elements: IAttributeElement[], intl: IntlShape): string;
/**
 * @internal
 */
export declare function getElementKey(element: IAttributeElement): string;
/**
 * @internal
 */
export declare function validateAttributeFilterProps(props: IAttributeFilterBaseProps): void;
/**
 * @internal
 */
export declare function isValidSingleSelectionFilter(selectionMode: DashboardAttributeFilterSelectionMode, filter: IAttributeFilter, limitingAttributeFilters: IElementsQueryAttributeFilter[]): boolean;
