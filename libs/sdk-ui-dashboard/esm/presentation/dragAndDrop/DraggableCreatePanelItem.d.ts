import React from "react";
import { CustomCreatePanelItemComponent } from "../componentDefinition/index.js";
import { DraggableItem, IWrapCreatePanelItemWithDragComponent } from "./types.js";
/**
 * @internal
 */
export type IDraggableCreatePanelItemProps = {
    Component: CustomCreatePanelItemComponent;
    WrapCreatePanelItemWithDragComponent?: IWrapCreatePanelItemWithDragComponent;
    dragItem: DraggableItem;
    hideDefaultPreview?: boolean;
    disabled?: boolean;
};
/**
 * @internal
 */
export declare const DraggableCreatePanelItem: React.FC<IDraggableCreatePanelItemProps>;
