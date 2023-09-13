// (C) 2007-2021 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography } from "@gooddata/sdk-ui-kit";
import { CompactContentError } from "./CompactContentError.js";
import { ErrorContainer } from "./ErrorContainer.js";
export const DataTooLargeError = ({ fullContent }) => {
    return (React.createElement(ErrorContainer, null, fullContent ? (React.createElement("div", { className: "info-label-icon gd-icon-rain" },
        React.createElement(Typography, { tagName: "h2" },
            React.createElement(FormattedMessage, { id: "visualization.dataTooLarge.headline", tagName: "span" })),
        React.createElement(Typography, { tagName: "p" },
            React.createElement(FormattedMessage, { id: "visualization.dataTooLarge.text", tagName: "span" })))) : (React.createElement(CompactContentError, { className: "gd-icon-rain", headline: "visualization.dataTooLarge.headline", text: "visualization.dataTooLarge.text" }))));
};
//# sourceMappingURL=DataTooLargeError.js.map