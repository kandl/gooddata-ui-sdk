import { ScheduledMailAttachment as BearScheduledMailAttachment, IWrappedScheduledMail } from "@gooddata/api-model-bear";
import { IUser, IScheduledMail, IScheduledMailDefinition, ScheduledMailAttachment } from "@gooddata/sdk-model";
export declare const convertScheduledMailAttachment: (scheduledMailAttachment: BearScheduledMailAttachment) => ScheduledMailAttachment | undefined;
/**
 * @internal
 */
export declare const convertScheduledMail: (scheduledMail: IWrappedScheduledMail, userMap?: Map<string, IUser>) => IScheduledMail | IScheduledMailDefinition;
//# sourceMappingURL=scheduledMails.d.ts.map