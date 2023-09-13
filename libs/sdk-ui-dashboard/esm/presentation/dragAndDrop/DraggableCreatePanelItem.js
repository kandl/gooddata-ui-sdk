// (C) 2022 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const DraggableCreatePanelItem = (props) => {
    const { Component, disabled } = props;
    const WrapCreatePanelItemWithDragComponent = props.WrapCreatePanelItemWithDragComponent;
    return (React.createElement(WrapCreatePanelItemWithDragComponent, Object.assign({}, props),
        React.createElement(Component, { disabled: disabled })));
};
//# sourceMappingURL=DraggableCreatePanelItem.js.map