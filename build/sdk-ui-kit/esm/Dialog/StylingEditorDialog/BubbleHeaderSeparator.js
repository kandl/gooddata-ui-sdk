// (C) 2022 GoodData Corporation
import { Bubble, BubbleHoverTrigger } from "../../Bubble/index.js";
import { Typography } from "../../Typography/index.js";
import React from "react";
/**
 * @internal
 */
export const BubbleHeaderSeparator = ({ title, message }) => (React.createElement("div", { className: "gd-bubble-header-separator" },
    title ? React.createElement(Typography, { tagName: "h3" }, title) : null,
    message ? (React.createElement(BubbleHoverTrigger, { className: "gd-bubble-header-separator-icon", showDelay: 0, hideDelay: 0 },
        React.createElement("div", { className: "gd-icon-circle-question" }),
        React.createElement(Bubble, { className: "bubble-primary", arrowOffsets: { "tc br": [13, -10] }, alignPoints: [{ align: "tc br" }] }, message))) : null,
    React.createElement("div", { className: "gd-bubble-header-separator-divider" })));
//# sourceMappingURL=BubbleHeaderSeparator.js.map