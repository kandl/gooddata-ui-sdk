import React from "react";
import { IWrapCreatePanelItemWithDragComponent, IWrapInsightListItemWithDragComponent } from "../../dragAndDrop/types.js";
import { AttributeFilterComponentSet, InsightWidgetComponentSet, KpiWidgetComponentSet } from "../../componentDefinition/index.js";
interface ICreationPanelProps {
    className?: string;
    WrapCreatePanelItemWithDragComponent?: IWrapCreatePanelItemWithDragComponent;
    WrapInsightListItemWithDragComponent?: IWrapInsightListItemWithDragComponent;
    KpiWidgetComponentSet?: KpiWidgetComponentSet;
    AttributeFilterComponentSet?: AttributeFilterComponentSet;
    InsightWidgetComponentSet?: InsightWidgetComponentSet;
}
export declare const CreationPanel: React.FC<ICreationPanelProps>;
export {};
