// (C) 2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Button, Typography } from "@gooddata/sdk-ui-kit";
export const KpiConfigurationPanelHeader = (props) => {
    const { onCloseButtonClick } = props;
    return (React.createElement("div", { className: "configuration-panel-header" },
        React.createElement(Typography, { tagName: "h3", className: "configuration-panel-header-title" },
            React.createElement(FormattedMessage, { id: "configurationPanel.title" })),
        React.createElement(Button, { className: "gd-button-link gd-button-icon-only gd-icon-cross configuration-panel-header-close-button s-configuration-panel-header-close-button", onClick: onCloseButtonClick })));
};
//# sourceMappingURL=KpiConfigurationPanelHeader.js.map