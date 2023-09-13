import { IAttributeElement, IAttributeFilter, IAttributeMetadataObject } from "@gooddata/sdk-model";
import { IMultiSelectAttributeFilterHandler } from "../../AttributeFilterHandler/index.js";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
/**
 * Properties of the {@link useAttributeFilterHandler} hook.
 * @beta
 */
export interface IUseAttributeFilterHandlerProps {
    backend: IAnalyticalBackend;
    workspace: string;
    filter: IAttributeFilter;
    hiddenElements?: string[];
    staticElements?: IAttributeElement[];
    attribute?: IAttributeMetadataObject;
}
/**
 * Hook for retrieving AttributeFilterHandler {@link IMultiSelectAttributeFilterHandler} Core API for Attribute Filter components.
 * This hook is responsible for initialization of the AttributeFilterHandler.
 * @beta
 */
export declare const useAttributeFilterHandler: (props: IUseAttributeFilterHandlerProps) => IMultiSelectAttributeFilterHandler;
