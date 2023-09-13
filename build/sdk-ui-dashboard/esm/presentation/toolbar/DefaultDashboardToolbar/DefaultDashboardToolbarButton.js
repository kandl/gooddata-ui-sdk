// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { Bubble, BubbleHoverTrigger, Button } from "@gooddata/sdk-ui-kit";
const ALIGN_POINTS = [{ align: "tc bc", offset: { x: 0, y: -5 } }];
const DashboardToolbarButtonBubbleWrapper = (props) => {
    const { tooltip, children } = props;
    if (!tooltip) {
        return React.createElement("div", { className: "gd-toolbar-button-wrapper" }, children);
    }
    return (React.createElement(BubbleHoverTrigger, { className: "gd-toolbar-button-wrapper" },
        children,
        React.createElement(Bubble, { alignPoints: ALIGN_POINTS }, tooltip)));
};
/**
 * @internal
 */
export const DefaultDashboardToolbarButton = (props) => {
    const { tooltip, disabled, icon, onClick, isActive } = props;
    return (React.createElement(DashboardToolbarButtonBubbleWrapper, { tooltip: tooltip },
        React.createElement(Button, { className: cx("gd-button-secondary", { [`gd-icon-${icon}`]: icon, "is-active": isActive }), disabled: disabled, onClick: onClick })));
};
//# sourceMappingURL=DefaultDashboardToolbarButton.js.map