// (C) 2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
export const CompleteListPropsMessage = (props) => {
    const { documentationLink } = props;
    return (React.createElement("div", { className: "embed-insight-dialog-list-props-message" },
        React.createElement("span", { className: "gd-icon-circle-question s-circle_question question-mark-icon" }),
        React.createElement("a", { href: documentationLink, className: "gd-button-link-dimmed", target: "_blank", rel: "noreferrer" },
            React.createElement(FormattedMessage, { id: "embedInsightDialog.complete.list.props.message" }))));
};
//# sourceMappingURL=CompleteListPropsMessage.js.map