// (C) 2019-2023 GoodData Corporation
import { userFullName } from "@gooddata/sdk-model";
import { isScheduleEmailExistingRecipient, } from "../interfaces.js";
import isEmpty from "lodash/isEmpty.js";
import flatMap from "lodash/flatMap.js";
export const getScheduledEmailRecipientUniqueIdentifier = (recipient) => isScheduleEmailExistingRecipient(recipient) ? recipient.user.login : recipient.email;
export const getScheduledEmailRecipientEmail = (recipient) => isScheduleEmailExistingRecipient(recipient) ? recipient.user.email : recipient.email;
export const getScheduledEmailRecipientDisplayName = (recipient) => isScheduleEmailExistingRecipient(recipient) ? userFullName(recipient.user) : recipient.email;
const scheduleEmailRecipientDelimiter = /[,;\s]/;
export const splitScheduledEmailRecipients = (recipients) => {
    return flatMap(recipients, (recipient) => {
        return splitScheduledEmailRecipientByDelimiter(recipient, scheduleEmailRecipientDelimiter);
    });
};
export const uniqueScheduledEmailRecipients = (recipients) => {
    const recipientIds = [];
    return recipients.filter((recipient) => {
        const recipientId = getScheduledEmailRecipientUniqueIdentifier(recipient);
        if (recipientIds.includes(recipientId)) {
            return false;
        }
        else {
            recipientIds.push(recipientId);
            return true;
        }
    });
};
const splitScheduledEmailRecipientByDelimiter = (recipient, delimiter) => {
    if (isScheduleEmailExistingRecipient(recipient)) {
        return [recipient];
    }
    return splitScheduledEmailExternalRecipientByDelimiter(recipient, delimiter);
};
const splitScheduledEmailExternalRecipientByDelimiter = (recipient, delimiter) => {
    return recipient.email
        .split(delimiter)
        .map((val) => val.trim())
        .filter((val) => !isEmpty(val))
        .map((email) => ({ email }));
};
//# sourceMappingURL=scheduledMailRecipients.js.map