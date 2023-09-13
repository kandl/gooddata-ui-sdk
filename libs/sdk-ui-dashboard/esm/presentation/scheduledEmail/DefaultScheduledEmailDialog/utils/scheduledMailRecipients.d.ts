import { IScheduleEmailRecipient } from "../interfaces.js";
export declare const getScheduledEmailRecipientUniqueIdentifier: (recipient: IScheduleEmailRecipient) => string;
export declare const getScheduledEmailRecipientEmail: (recipient: IScheduleEmailRecipient) => string;
export declare const getScheduledEmailRecipientDisplayName: (recipient: IScheduleEmailRecipient) => string;
export declare const splitScheduledEmailRecipients: (recipients: IScheduleEmailRecipient[]) => IScheduleEmailRecipient[];
export declare const uniqueScheduledEmailRecipients: (recipients: IScheduleEmailRecipient[]) => IScheduleEmailRecipient[];
