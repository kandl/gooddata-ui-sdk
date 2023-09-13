// (C) 2020-2022 GoodData Corporation
import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
const DocumentationLink = ({ url }) => (React.createElement("div", { className: "gd-measure-custom-format-dialog-section gd-measure-custom-format-dialog-section-help" },
    React.createElement("a", { "aria-label": "custom-format-documentation-link", className: "gd-measure-format-button s-custom-format-dialog-documentation-link", target: "_blank", rel: "noreferrer noopener", href: url },
        React.createElement("div", { className: "gd-icon-circle-question gd-measure-format-button-icon-left" }),
        React.createElement("span", null,
            React.createElement(FormattedMessage, { id: "measureNumberCustomFormatDialog.howToFormat" })))));
export default injectIntl(DocumentationLink);
//# sourceMappingURL=DocumentationLink.js.map