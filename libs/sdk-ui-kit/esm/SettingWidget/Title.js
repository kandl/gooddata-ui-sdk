// (C) 2022 GoodData Corporation
import React from "react";
import { TooltipIcon } from "./TooltipIcon.js";
/**
 * @internal
 */
export const Title = ({ title, tooltip }) => {
    return (React.createElement(React.Fragment, null,
        title ? React.createElement("span", { className: "gd-widget-title" }, title) : null,
        tooltip ? React.createElement(TooltipIcon, { text: tooltip, iconClass: "gd-icon-circle-question" }) : null));
};
//# sourceMappingURL=Title.js.map