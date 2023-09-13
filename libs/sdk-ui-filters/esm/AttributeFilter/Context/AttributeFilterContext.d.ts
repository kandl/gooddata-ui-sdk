import React from "react";
import { IAttributeFilterCoreProps } from "../types.js";
import { AttributeFilterController } from "../hooks/types.js";
/**
 * The return type of {@link useAttributeFilterContext}.
 * @beta
 */
export type IAttributeFilterContext = AttributeFilterController & Pick<IAttributeFilterCoreProps, "fullscreenOnMobile" | "title" | "selectionMode" | "selectFirst">;
export declare const AttributeFilterContext: React.Context<IAttributeFilterContext>;
/**
 * Context providing AttributeFilter state and callbacks wrapped as {@link AttributeFilterController}.
 * @beta
 */
export declare const useAttributeFilterContext: () => IAttributeFilterContext;
/**
 * @internal
 */
export declare const AttributeFilterContextProvider: React.FC<IAttributeFilterCoreProps & {
    children: React.ReactNode;
}>;
