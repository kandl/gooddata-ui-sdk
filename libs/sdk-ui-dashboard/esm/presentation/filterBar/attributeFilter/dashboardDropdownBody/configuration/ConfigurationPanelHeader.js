// (C) 2022 GoodData Corporation
import React from "react";
import { Typography } from "@gooddata/sdk-ui-kit";
import { FormattedMessage } from "react-intl";
export const ConfigurationPanelHeader = () => {
    return (React.createElement("div", { className: "configuration-panel-header" },
        React.createElement(Typography, { tagName: "h3", className: "configuration-panel-header-title" },
            React.createElement(FormattedMessage, { id: "attributesDropdown.configuration" }))));
};
//# sourceMappingURL=ConfigurationPanelHeader.js.map