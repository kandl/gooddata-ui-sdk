// (C) 2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Message } from "../../../../Messages/index.js";
export const PrepareEnvMessage = (props) => {
    const { integrationDocLink } = props;
    if (integrationDocLink) {
        return (React.createElement(Message, { type: "progress", className: "embed-insight-dialog-prep-env-message" },
            React.createElement("span", null,
                React.createElement(FormattedMessage, { id: "embedInsightDialog.prepareEnvironmentMessage", values: { b: (chunks) => React.createElement("strong", null, chunks) } })),
            React.createElement("a", { href: integrationDocLink, target: "_blank", rel: "noreferrer" },
                React.createElement(FormattedMessage, { id: "embedInsightDialog.prepareEnvironmentMessage.link" }))));
    }
    return null;
};
//# sourceMappingURL=PrepareEnvMessage.js.map