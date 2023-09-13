// (C) 2019-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { Bubble, BubbleHoverTrigger, Item } from "@gooddata/sdk-ui-kit";
const alignPoints = [{ align: "cl cr" }];
export const LegacyInsightMenuItem = ({ bubbleId, className, isDisabled, onClick, title, bubbleMessage = "", }) => {
    const itemClasses = cx("gd-list-item", "gd-menu-item", className, { "is-disabled": isDisabled });
    if (isDisabled) {
        const button = React.createElement(Item, { className: itemClasses }, title);
        if (bubbleMessage) {
            return (React.createElement(BubbleHoverTrigger, { className: "s-gd-bubble-trigger-options-menu-item" },
                button,
                React.createElement(Bubble, { className: `bubble-primary bubble-primary-${bubbleId} s-bubble-primary-${bubbleId}`, alignPoints: alignPoints }, bubbleMessage)));
        }
        else {
            return button;
        }
    }
    else {
        return (React.createElement(Item, { className: itemClasses, onClick: onClick }, title));
    }
};
//# sourceMappingURL=LegacyInsightMenuItem.js.map