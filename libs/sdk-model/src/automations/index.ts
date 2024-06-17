// (C) 2021-2024 GoodData Corporation
// import { IWebhookMetadataObject } from "../notificationChannels/index.js";
import isEmpty from "lodash/isEmpty.js";
import { IMdObject, ToMdObjectDefinition } from "../ldm/metadata/types.js";
import { ScheduledMailAttachment } from "../dashboard/scheduledMail.js";
import { ObjRef } from "../objRef/index.js";
import { IAuditable } from "../base/metadata.js";

/**
 * @alpha
 */
export interface IAutomationMdObject extends IMdObject<"automation">, IAuditable {
    /**
     * Schedule of the automation.
     * Object with cron expression, timezone and first run timestamp.
     */
    schedule?: IAutomationSchedule;

    /**
     * Target webhook that automation will trigger.
     * String with webhook id.
     */
    webhook?: string; // notificationChannel ID
    // This must be created as part of the automation -> should it be only ids or full export definitions?

    /**
     * Export definitions of the automation (attachments).
     * Array of strings with export definition ids.
     */
    exportDefinitions?: string[];

    /**
     * Recipients of the automation.
     * Array of strings with user ids.
     */
    recipients?: string[]; // This can be also groups in the future - should it be array of objects?

    /**
     * TODO:
     * Following props are there copy pasted from IScheduledMail just for TS backward compatibility after typing changes and we should remove them,
     * once we completely change the UI to a new model (IAutomationMdObject)
     *
     * Also check whether IAuditable is correct
     *
     */

    ref?: ObjRef;

    identifier?: string;

    uri?: string;
    /**
     * Scheduled email job interval
     */
    when: {
        /**
         * Start date in YYYY-MM-DD format.
         */
        startDate: string;

        /**
         * End date in YYYY-MM-DD format.
         */
        endDate?: string;

        /**
         * Recurrence specification string
         * e.g. 0:0:1*3:12:30:0
         */
        recurrence: string;

        /**
         * Timezone
         * e.g. Europe/Amsterdam
         */
        timeZone: string;
    };

    /**
     * Recipients unique login identifiers - should be equal to login property in {@link IWorkspaceUser} / {@link IUser}
     */
    to: string[];

    /**
     * BCC recipients email addresses
     */
    bcc?: string[];

    /**
     * Unsubscribed recipients email addresses
     */
    unsubscribed?: string[];

    /**
     * Email subject
     */
    subject: string;

    /**
     * Email message body
     */
    body: string;

    /**
     * Email attachments - should be replaced with export definitions
     */
    attachments: ScheduledMailAttachment[];

    /**
     * Date of the last successful email processing job run
     */
    lastSuccessful?: string;

    /**
     * Is unlisted?
     */
    unlisted: boolean;
}

/**
 * @alpha
 */
export function isAutomationMdObject(obj: unknown): obj is IAutomationMdObject {
    return isAutomationMdObjectDefinition(obj) && !isEmpty((obj as IAutomationMdObject).id);
}

/**
 * @alpha
 */
export type IAutomationMdObjectDefinition = ToMdObjectDefinition<IAutomationMdObject>;

/**
 * @alpha
 */
export function isAutomationMdObjectDefinition(obj: unknown): obj is IAutomationMdObjectDefinition {
    return !isEmpty(obj) && (obj as IAutomationMdObject).type === "automation";
}

/**
 * @alpha
 */
export interface IAutomationSchedule {
    /**
     * Cron expression defining the schedule of the automation.
     * The format is SECOND MINUTE HOUR DAY-OF-MONTH MONTH DAY-OF-WEEK (YEAR).
     *
     * Example: 0 *\/30 9-17 ? * MON-FRI (every 30 minutes from 9:00 to 17:00 on workdays)
     */
    cron: string;

    /**
     * Timezone in which the schedule is defined.
     */
    timezone?: string;

    /**
     * Timestamp of the first scheduled action
     * If not provided default to the next scheduled time.
     */
    firstRun?: string;
}
