/// <reference types="react" />
import { IInsight } from "@gooddata/sdk-model";
import { CustomDashboardInsightListItemComponent, CustomDashboardInsightListItemComponentProps, IWrapInsightListItemWithDragComponent } from "../types.js";
/**
 * @internal
 */
export interface IDraggableInsightListItemProps {
    WrapInsightListItemWithDragComponent?: IWrapInsightListItemWithDragComponent;
    ListItemComponent: CustomDashboardInsightListItemComponent;
    listItemComponentProps: CustomDashboardInsightListItemComponentProps;
    insight: IInsight;
}
/**
 * @internal
 */
export declare function DraggableInsightListItem(props: IDraggableInsightListItemProps): JSX.Element;
