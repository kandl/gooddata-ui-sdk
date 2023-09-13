// (C) 2021-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import { objRefToString, widgetRef } from "@gooddata/sdk-model";
import { Bubble } from "@gooddata/sdk-ui-kit";
const alignPoints = [
    { align: "tr tl" },
    { align: "br bl" },
    { align: "tl tr" },
    { align: "tr tr" },
    { align: "br br" },
];
const arrowDirections = {
    "tr tr": "right",
    "br br": "right",
};
const arrowOffsets = {
    "tr tl": [20, 0],
    "tl tr": [-20, 0],
};
export const DashboardInsightMenuBubble = (props) => {
    const { onClose, isSubmenu, widget, children } = props;
    const widgetRefAsString = objRefToString(widgetRef(widget));
    return (React.createElement(Bubble, { alignTo: `.dash-item-action-widget-options-${stringUtils.simplifyText(widgetRefAsString)}`, alignPoints: alignPoints, arrowDirections: arrowDirections, arrowOffsets: arrowOffsets, className: cx("bubble-light", "gd-configuration-bubble", "edit-insight-config", "s-edit-insight-config", "edit-insight-config-title-1-line", isSubmenu ? "edit-insight-config-arrow-submenu-color" : "edit-insight-config-arrow-color"), closeOnOutsideClick: true, onClose: onClose, overlayClassName: "gd-configuration-bubble-wrapper sdk-edit-mode-on" }, children));
};
//# sourceMappingURL=DashboardInsightMenuBubble.js.map