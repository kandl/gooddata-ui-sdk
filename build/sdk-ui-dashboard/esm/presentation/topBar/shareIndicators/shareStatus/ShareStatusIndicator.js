// (C) 2021-2022 GoodData Corporation
import React from "react";
import { BubbleHoverTrigger, Bubble } from "@gooddata/sdk-ui-kit";
import { FormattedMessage } from "react-intl";
/**
 * @alpha
 */
export const ShareStatusIndicator = (props) => {
    const { shareStatus, isUnderStrictControl } = props;
    if (shareStatus !== "private") {
        return null;
    }
    const tooltip = isUnderStrictControl ? (React.createElement(FormattedMessage, { id: "header.shareStatus.private.strict.tooltip" })) : (React.createElement(FormattedMessage, { id: "header.shareStatus.private.not.strict.tooltip" }));
    return (React.createElement("div", { className: "s-share-status gd-share-status" },
        React.createElement(BubbleHoverTrigger, null,
            React.createElement("div", { className: "gd-share-indicator" },
                React.createElement("i", { className: "gd-share-icon gd-icon-invisible" }),
                React.createElement(FormattedMessage, { id: "header.shareStatus.private.text" })),
            React.createElement(Bubble, { alignPoints: [{ align: "bc tl" }], alignTo: `.gd-share-icon` }, tooltip))));
};
//# sourceMappingURL=ShareStatusIndicator.js.map