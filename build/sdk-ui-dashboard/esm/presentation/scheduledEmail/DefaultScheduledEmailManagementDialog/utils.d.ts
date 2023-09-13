/// <reference types="react" />
import { IntlShape } from "react-intl";
import { ScheduledMailAttachment } from "@gooddata/sdk-model";
export declare const getRecipientsLabel: (intl: IntlShape, recipients: string[], currentUserEmail?: string) => string;
export declare const getAttachmentType: (intl: IntlShape, attachments: ScheduledMailAttachment[]) => {
    AttachmentIcon: import("react").FC<import("@gooddata/sdk-ui-kit").IIconProps>;
    attachmentLabel: string;
};
export declare const getFormatsLabel: (attachments: ScheduledMailAttachment[]) => string;
