import React from "react";
import { IWrapCreatePanelItemWithDragComponent } from "../types.js";
import { CustomCreatePanelItemComponent } from "../../componentDefinition/index.js";
/**
 * @internal
 */
export interface IDraggableAttributeFilterCreatePanelItemProps {
    CreatePanelItemComponent: CustomCreatePanelItemComponent;
    WrapCreatePanelItemWithDragComponent?: IWrapCreatePanelItemWithDragComponent;
    disabled?: boolean;
}
/**
 * @internal
 */
export declare const DraggableAttributeFilterCreatePanelItem: React.FC<IDraggableAttributeFilterCreatePanelItemProps>;
