// (C) 2022 GoodData Corporation
import React from "react";
import { InsightListItem } from "@gooddata/sdk-ui-kit";
import { DraggableInsightListItem } from "../../../dragAndDrop/draggableWidget/DraggableInsightListItem.js";
export const DraggableInsightListItemBody = (props) => {
    const { className } = props;
    return (React.createElement("div", { className: className },
        React.createElement(InsightListItem, Object.assign({}, props))));
};
export const DraggableInsightListItemWrapper = (props) => {
    const { WrapInsightListItemWithDragComponent, className, isLocked, title, description, showDescriptionPanel, type, updated, insight, onDescriptionPanelOpen, metadataTimeZone, } = props;
    return (React.createElement(DraggableInsightListItem, { WrapInsightListItemWithDragComponent: WrapInsightListItemWithDragComponent, ListItemComponent: DraggableInsightListItemBody, listItemComponentProps: {
            className,
            isLocked,
            title,
            description,
            type,
            updated,
            showDescriptionPanel,
            onDescriptionPanelOpen,
            metadataTimeZone,
        }, insight: insight }));
};
//# sourceMappingURL=DraggableInsightListItemWrapper.js.map