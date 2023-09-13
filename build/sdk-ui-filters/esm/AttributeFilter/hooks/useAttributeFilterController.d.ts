import { IAttributeFilterCoreProps } from "../types.js";
import { AttributeFilterController } from "./types.js";
/**
 * Properties of {@link useAttributeFilterController}
 * @public
 */
export type IUseAttributeFilterControllerProps = Omit<IAttributeFilterCoreProps, "fullscreenOnMobile" | "locale" | "title"> & {
    elementsOptions?: {
        limit: number;
    };
    resetOnParentFilterChange?: boolean;
};
/**
 * UseAttributeFilterController hook is responsible for initialization of AttributeFilterHandler {@link IMultiSelectAttributeFilterHandler} Core API for Attribute Filter components
 *
 * @remarks
 * You can access AttributeFilter state and callbacks ({@link AttributeFilterController})
 *
 * This is the best option if you need to implement fully custom UI for the attribute filter. This option requires a bit more coding, but you have a full control over the UI.
 * It has identical convenient API as AttributeFilter component - same input props and same output props that are available in the internal context of the AttributeFilter component.
 * It works out of the box with other UI.SDK things - {@link @gooddata/sdk-ui#BackendProvider}, {@link @gooddata/sdk-ui#WorkspaceProvider} and visualization definition placeholders.
 *
 * @public
 */
export declare const useAttributeFilterController: (props: IUseAttributeFilterControllerProps) => AttributeFilterController;
