// (C) 2021 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { BubbleHoverTrigger, Bubble } from "@gooddata/sdk-ui-kit";
const bubbleAlignPoints = [{ align: "bc tc", offset: { x: 0, y: 0 } }];
export const CompactContentError = ({ className, headline, text }) => {
    return (React.createElement(BubbleHoverTrigger, null,
        React.createElement("div", { className: `info-label-icon ${className}` }),
        React.createElement(Bubble, { alignPoints: bubbleAlignPoints },
            React.createElement(FormattedMessage, { id: headline }),
            React.createElement("br", null),
            React.createElement(FormattedMessage, { id: text }))));
};
//# sourceMappingURL=CompactContentError.js.map