// (C) 2007-2021 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography, BubbleHoverTrigger, Bubble } from "@gooddata/sdk-ui-kit";
const bubbleAlignPoints = [{ align: "bc tc", offset: { x: 0, y: 0 } }];
export const NoDataError = ({ fullContent }) => {
    return (React.createElement("div", { className: "gd-visualization-content visualization-empty" },
        React.createElement("div", { className: "info-label info-label-empty" }, fullContent ? (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "info-label-icon-empty" }),
            React.createElement(Typography, { tagName: "p" },
                React.createElement(FormattedMessage, { id: "visualization.empty.headline", tagName: "span" })))) : (React.createElement(BubbleHoverTrigger, null,
            React.createElement("div", { className: "info-label-icon-empty" }),
            React.createElement(Bubble, { alignPoints: bubbleAlignPoints },
                React.createElement(FormattedMessage, { id: "visualization.empty.headline", tagName: "span" })))))));
};
//# sourceMappingURL=NoDataError.js.map