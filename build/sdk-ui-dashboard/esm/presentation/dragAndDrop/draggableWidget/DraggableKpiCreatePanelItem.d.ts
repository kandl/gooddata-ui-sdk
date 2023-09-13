import React from "react";
import { CustomCreatePanelItemComponent } from "../../componentDefinition/index.js";
import { IWrapCreatePanelItemWithDragComponent } from "../types.js";
/**
 * @internal
 */
interface IDraggableKpiCreatePanelItemProps {
    CreatePanelItemComponent: CustomCreatePanelItemComponent;
    WrapCreatePanelItemWithDragComponent?: IWrapCreatePanelItemWithDragComponent;
    disabled?: boolean;
}
/**
 * @internal
 */
export declare const DraggableKpiCreatePanelItem: React.FC<IDraggableKpiCreatePanelItemProps>;
export {};
