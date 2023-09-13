// (C) 2022 GoodData Corporation
import React, { useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import cx from "classnames";
import { Bubble, BubbleHoverTrigger, ShortenedText } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { getAttachmentType, getFormatsLabel, getRecipientsLabel } from "./utils.js";
import { gdColorDisabled } from "../../constants/colors.js";
const ICON_TOOLTIP_ALIGN_POINTS = [
    { align: "cr cl", offset: { x: 0, y: 0 } },
    { align: "cl cr", offset: { x: 0, y: 0 } },
];
const TEXT_TOOLTIP_ALIGN_POINTS = [
    { align: "tc bc", offset: { x: 0, y: 0 } },
    { align: "bc tc", offset: { x: 0, y: 0 } },
];
export const ScheduledEmail = (props) => {
    var _a, _b, _c;
    const intl = useIntl();
    const theme = useTheme();
    const { scheduledEmail, currentUserEmail, onDelete, onEdit, canManageScheduledMail, users } = props;
    const { subject, to, bcc, attachments } = scheduledEmail;
    const recipients = [...to, ...(bcc !== null && bcc !== void 0 ? bcc : [])];
    const recipientsLabel = getRecipientsLabel(intl, recipients, currentUserEmail);
    const formatsLabel = getFormatsLabel(attachments);
    const { AttachmentIcon, attachmentLabel } = getAttachmentType(intl, attachments);
    const subtitle = `${recipientsLabel} • ${attachmentLabel} • ${formatsLabel}`;
    const handleClick = useCallback(() => {
        if (canManageScheduledMail) {
            onEdit(scheduledEmail, users);
        }
    }, [scheduledEmail, canManageScheduledMail, users]);
    return (React.createElement("div", { className: cx("gd-scheduled-email", "s-scheduled-email", { editable: canManageScheduledMail }) },
        React.createElement("div", { className: "gd-scheduled-email-delete" },
            React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
                React.createElement("span", { className: "gd-scheduled-email-delete-icon s-scheduled-email-delete-icon", onClick: () => onDelete(scheduledEmail) }),
                React.createElement(Bubble, { className: "bubble-primary", alignPoints: ICON_TOOLTIP_ALIGN_POINTS },
                    React.createElement(FormattedMessage, { id: "dialogs.schedule.management.delete" })))),
        React.createElement("div", { className: "gd-scheduled-email-content", onClick: handleClick },
            React.createElement("div", { className: "gd-scheduled-email-icon" },
                React.createElement(AttachmentIcon, { color: (_c = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c5) !== null && _c !== void 0 ? _c : gdColorDisabled, width: 18, height: 16 })),
            React.createElement("div", { className: "gd-scheduled-email-text-content" },
                React.createElement("div", { className: "gd-scheduled-email-title" },
                    React.createElement("strong", null,
                        React.createElement(ShortenedText, { className: "gd-scheduled-email-shortened-text", tooltipAlignPoints: TEXT_TOOLTIP_ALIGN_POINTS }, subject))),
                React.createElement("div", null,
                    React.createElement("span", { className: "gd-scheduled-email-subtitle" },
                        React.createElement(ShortenedText, { className: "gd-scheduled-email-shortened-text", tooltipAlignPoints: TEXT_TOOLTIP_ALIGN_POINTS }, subtitle)))))));
};
//# sourceMappingURL=ScheduledEmail.js.map