// (C) 2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { LoadingSpinner } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { ScheduledEmail } from "./ScheduledEmail.js";
export const ScheduledEmails = (props) => {
    var _a, _b;
    const { isLoading, scheduledEmails, currentUserEmail, onDelete, onEdit, noSchedulesMessageId, canManageScheduledMail, users, } = props;
    const theme = useTheme();
    if (isLoading) {
        return (React.createElement("div", { className: "gd-loading-equalizer-wrap" },
            React.createElement("div", { className: "gd-loading-equalizer gd-loading-equalizer-fade" },
                React.createElement(LoadingSpinner, { className: "large gd-loading-equalizer-spinner", color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c9 }))));
    }
    if (scheduledEmails.length === 0) {
        return (React.createElement("div", { className: "gd-scheduled-emails-message s-no-schedules-message" },
            React.createElement(FormattedMessage, { id: noSchedulesMessageId, values: { br: React.createElement("br", null) } })));
    }
    return (React.createElement(React.Fragment, null, scheduledEmails.map((scheduledEmail) => (React.createElement(ScheduledEmail, { key: scheduledEmail.identifier, scheduledEmail: scheduledEmail, currentUserEmail: currentUserEmail, onDelete: onDelete, onEdit: onEdit, users: users, canManageScheduledMail: canManageScheduledMail })))));
};
//# sourceMappingURL=ScheduledEmails.js.map