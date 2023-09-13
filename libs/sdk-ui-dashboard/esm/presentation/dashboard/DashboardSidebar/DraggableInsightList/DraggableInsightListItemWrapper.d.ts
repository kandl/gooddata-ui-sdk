import React from "react";
import { IInsightListItemProps } from "@gooddata/sdk-ui-kit";
import { IInsight } from "@gooddata/sdk-model";
import { CustomDashboardInsightListItemComponent, IWrapInsightListItemWithDragComponent } from "../../../dragAndDrop/types.js";
interface IDraggableInsightListItemWrapperProps extends IInsightListItemProps {
    WrapInsightListItemWithDragComponent?: IWrapInsightListItemWithDragComponent;
    className?: string;
    insight: IInsight;
}
export declare const DraggableInsightListItemBody: CustomDashboardInsightListItemComponent;
export declare const DraggableInsightListItemWrapper: React.FC<IDraggableInsightListItemWrapperProps>;
export {};
