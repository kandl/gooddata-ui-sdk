// (C) 2022-2023 GoodData Corporation
import React, { useCallback } from "react";
import cx from "classnames";
import { Typography } from "../../Typography/index.js";
import { Bubble, BubbleHoverTrigger } from "../../Bubble/index.js";
const BUTTON_TOOLTIP_ALIGN_POINTS = [
    { align: "cr cl", offset: { x: 0, y: 0 } },
    { align: "cl cr", offset: { x: 0, y: 0 } },
];
/**
 * @internal
 */
export const DialogListHeader = (props) => {
    const { className, gdIconName = "gd-icon-plus", title, buttonTitle, buttonDisabled, buttonTooltipText, onButtonClick, } = props;
    const headerClassNames = cx("gd-dialog-list-header s-dialog-list-header", className);
    const buttonClassNames = cx("gd-button", "gd-button-link", gdIconName, "s-dialog-list-header-button", {
        disabled: buttonDisabled,
    });
    const onClick = useCallback(() => !buttonDisabled && (onButtonClick === null || onButtonClick === void 0 ? void 0 : onButtonClick()), [buttonDisabled, onButtonClick]);
    return (React.createElement("div", { role: "dialog-list-header", className: headerClassNames },
        title ? (React.createElement("div", null,
            React.createElement(Typography, { tagName: "h3" }, title))) : null,
        React.createElement("div", { className: "gd-dialog-list-header-divider" }),
        buttonTitle ? (React.createElement("div", { className: "gd-dialog-list-header-button" },
            React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
                React.createElement("a", { className: buttonClassNames, target: "_blank", rel: "noopener noreferrer", onClick: onClick }, buttonTitle),
                buttonTooltipText ? (React.createElement(Bubble, { className: "bubble-primary", alignPoints: BUTTON_TOOLTIP_ALIGN_POINTS }, buttonTooltipText)) : null))) : null));
};
//# sourceMappingURL=DialogListHeader.js.map