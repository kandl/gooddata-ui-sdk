// (C) 2020-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { Bubble, BubbleHoverTrigger, Item } from "@gooddata/sdk-ui-kit";
const tooltipAlignPoints = [{ align: "cl cr" }];
export const DashboardInsightMenuItemButton = (props) => {
    const { itemId, itemName, disabled, icon, onClick, tooltip, className, submenu = false } = props;
    // for JSX icons we need an extra gd-icon-wrapper class to align the icon and the text vertically
    return renderButtonWithTooltip(React.createElement(Item, { className: className, onClick: disabled ? undefined : onClick, disabled: disabled, subMenu: submenu },
        React.createElement("span", { className: cx({ "gd-icon-wrapper": icon && typeof icon !== "string" }) },
            icon ? typeof icon === "string" ? React.createElement("i", { className: icon }) : icon : null,
            itemName)), itemId, disabled, tooltip);
};
function renderButtonWithTooltip(button, id, disabled, tooltip) {
    if (tooltip && disabled) {
        return (React.createElement(BubbleHoverTrigger, { className: "s-gd-bubble-trigger-options-menu-item" },
            button,
            React.createElement(Bubble, { className: `bubble-primary bubble-primary-${id} s-bubble-primary-${id}`, alignPoints: tooltipAlignPoints }, tooltip)));
    }
    else {
        return button;
    }
}
//# sourceMappingURL=DashboardInsightMenuItemButton.js.map