// (C) 2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Message } from "@gooddata/sdk-ui-kit";
export const KpiConfigurationMessages = (props) => {
    const { numberOfAlerts } = props;
    if (numberOfAlerts) {
        return (React.createElement("div", { className: "warning s-alert-edit-warning" },
            React.createElement(Message, { type: "warning" },
                React.createElement(FormattedMessage, { id: "configurationPanel.breakAlertWarning", values: { numAlerts: numberOfAlerts } }))));
    }
    return null;
};
//# sourceMappingURL=KpiConfigurationMessages.js.map