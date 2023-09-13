import React from "react";
import { IWrapInsightListItemWithDragComponent } from "../../../dragAndDrop/types.js";
interface IDraggableInsightListProps {
    WrapInsightListItemWithDragComponent?: IWrapInsightListItemWithDragComponent;
    recalculateSizeReference?: string;
    searchAutofocus?: boolean;
    enableDescriptions?: boolean;
}
export declare const DraggableInsightList: React.FC<IDraggableInsightListProps>;
export {};
