import React from "react";
import { IAttributeFilterCustomComponentProps } from "../types.js";
/**
 * @internal
 */
export declare const useAttributeFilterComponentsContext: () => IAttributeFilterCustomComponentProps;
/**
 * @internal
 */
export declare const AttributeFilterComponentsProvider: React.FC<IAttributeFilterCustomComponentProps & {
    children: React.ReactNode;
}>;
