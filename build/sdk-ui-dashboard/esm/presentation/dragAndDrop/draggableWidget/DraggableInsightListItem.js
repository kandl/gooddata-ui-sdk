// (C) 2022 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export function DraggableInsightListItem(props) {
    const { ListItemComponent, listItemComponentProps, insight } = props;
    const WrapInsightListItemWithDragComponent = props.WrapInsightListItemWithDragComponent;
    return (React.createElement(WrapInsightListItemWithDragComponent, { insight: insight },
        React.createElement(ListItemComponent, Object.assign({}, listItemComponentProps))));
}
//# sourceMappingURL=DraggableInsightListItem.js.map