// (C) 2007-2021 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography } from "@gooddata/sdk-ui-kit";
import { CompactContentError } from "./CompactContentError.js";
import { ErrorContainer } from "./ErrorContainer.js";
export const ExecuteProtectedError = ({ fullContent }) => {
    return (React.createElement(ErrorContainer, null, fullContent ? (React.createElement("div", { className: "info-label-icon gd-icon-warning" },
        React.createElement(Typography, { tagName: "h2" },
            React.createElement(FormattedMessage, { id: "visualization.execute_protected_report.headline", tagName: "span" })),
        React.createElement(Typography, { tagName: "h2" },
            React.createElement(FormattedMessage, { id: "visualization.execute_protected_report.text", tagName: "span" })))) : (React.createElement(CompactContentError, { className: "gd-icon-warning", headline: "visualization.execute_protected_report.headline", text: "visualization.execute_protected_report.text" }))));
};
//# sourceMappingURL=ExecuteProtectedError.js.map