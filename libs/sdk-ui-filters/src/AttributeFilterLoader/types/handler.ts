// (C) 2022 GoodData Corporation
import { IAttributeFilterLoader } from "./loader";
import {
    InvertableSelection,
    IStagedInvertableSelectionHandler,
    IStagedSingleSelectionHandler,
} from "./selection";

/**
 * Unique key to identify the attribute element - its uri, value or primaryKey
 *
 * @alpha
 */
export type AttributeElementKey = string;

//
// Multi select attribute filter handler
//

/**
 * @alpha
 */
export type InvertableAttributeElementSelection = InvertableSelection<AttributeElementKey>;

/**
 * Handles the whole attribute filter experience
 * @alpha
 */
export interface IMultiSelectAttributeFilterHandler
    extends IAttributeFilterLoader,
        IStagedInvertableSelectionHandler<InvertableAttributeElementSelection> {
    //
    // selectors
    //
}

//
// Single select attribute filter handler
//

/**
 * Handles the whole single-select attribute filter experience.
 *
 * @alpha
 */
export interface ISingleSelectAttributeFilterHandler
    extends IAttributeFilterLoader,
        IStagedSingleSelectionHandler<AttributeElementKey | undefined> {
    //
    // selectors
    //
}

/**
 * Handles the whole attribute filter experience
 * @alpha
 */
export type IAttributeFilterHandler =
    | IMultiSelectAttributeFilterHandler
    | ISingleSelectAttributeFilterHandler;
