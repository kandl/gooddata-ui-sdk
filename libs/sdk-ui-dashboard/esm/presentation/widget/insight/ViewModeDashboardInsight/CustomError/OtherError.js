// (C) 2007-2021 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography } from "@gooddata/sdk-ui-kit";
import { CompactContentError } from "./CompactContentError.js";
import { ErrorContainer } from "./ErrorContainer.js";
export const OtherError = ({ fullContent }) => {
    return (React.createElement(ErrorContainer, null, fullContent ? (React.createElement("div", { className: "info-label-icon gd-icon-warning" },
        React.createElement(Typography, { tagName: "h2" },
            React.createElement(FormattedMessage, { id: "visualization.error.headline", tagName: "span" })),
        React.createElement(Typography, { tagName: "p" },
            React.createElement(FormattedMessage, { id: "visualization.error.text", tagName: "span" })))) : (React.createElement(CompactContentError, { className: "gd-icon-warning", headline: "visualization.error.headline", text: "visualization.error.text" }))));
};
//# sourceMappingURL=OtherError.js.map