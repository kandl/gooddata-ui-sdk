// (C) 2021-2024 GoodData Corporation
// import { IWebhookMetadataObject } from "../notificationChannels/index.js";
import isEmpty from "lodash/isEmpty.js";
import { IMetadataObject, IMetadataObjectDefinition } from "../ldm/metadata/types.js";
import { ScheduledMailAttachment } from "../dashboard/scheduledMail.js";
import { IAuditable } from "../base/metadata.js";
import {
    IExportDefinitionMetadataObject,
    IExportDefinitionMetadataObjectDefinition,
} from "../exportDefinitions/index.js";

/**
 * @alpha
 */
export interface IAutomationMetadataObjectBase {
    /**
     * Schedule of the automation.
     * Object with cron expression, timezone and first run timestamp.
     */
    schedule?: IAutomationSchedule;

    /**
     * Target webhook that automation will trigger.
     * String with webhook (notificationChannel) id.
     */
    webhook?: string;

    /**
     * Export definitions of the automation (attachments).
     */
    exportDefinitions?: IExportDefinitionMetadataObject[];

    /**
     * Recipients of the automation.
     * Array of strings with user ids.
     */
    recipients?: string[]; // This can be also groups in the future - should it be array of objects? (see user management - similar case)

    /**
     * TODO:
     * Following props are there copy pasted from IScheduledMail just for TS backward compatibility after typing changes and we should remove them,
     * once we completely change the UI to a new model (IAutomationMetadataObject)
     *
     * Also check whether IAuditable is correct
     *
     */

    // ref?: ObjRef;

    // identifier?: string;

    // uri?: string;
    /**
     * Scheduled email job interval
     * @deprecated - replace with other properties.
     */
    when: {
        /**
         * Start date in YYYY-MM-DD format.
         * @deprecated - replace with other properties.
         */
        startDate: string;

        /**
         * End date in YYYY-MM-DD format.
         * @deprecated - replace with other properties.
         */
        endDate?: string;

        /**
         * Recurrence specification string
         * e.g. 0:0:1*3:12:30:0
         * @deprecated - replace with other properties.
         */
        recurrence: string;

        /**
         * Timezone
         * e.g. Europe/Amsterdam
         * @deprecated - replace with other properties.
         */
        timeZone: string;
    };

    /**
     * Recipients unique login identifiers - should be equal to login property in {@link IWorkspaceUser} / {@link IUser}
     * @deprecated - replace with other properties.
     */
    to: string[];

    /**
     * BCC recipients email addresses
     * @deprecated - replace with other properties.
     */
    bcc?: string[];

    /**
     * Unsubscribed recipients email addresses
     * @deprecated - replace with other properties.
     */
    unsubscribed?: string[];

    /**
     * Email subject
     * @deprecated - replace with other properties.
     */
    subject: string;

    /**
     * Email message body
     * @deprecated - replace with other properties.
     */
    body: string;

    /**
     * Email attachments - should be replaced with export definitions
     * @deprecated - replace with other properties.
     */
    attachments: ScheduledMailAttachment[];

    /**
     * Date of the last successful email processing job run
     * @deprecated - replace with other properties.
     */
    lastSuccessful?: string;
}

/**
 * @alpha
 */
export interface IAutomationMetadataObject
    extends IAutomationMetadataObjectBase,
        IMetadataObject,
        IAuditable {
    type: "automation";
}

/**
 * @alpha
 */
export function isAutomationMetadataObject(obj: unknown): obj is IAutomationMetadataObject {
    return isAutomationMetadataObjectDefinition(obj) && !isEmpty((obj as IAutomationMetadataObject).id);
}

/**
 * @alpha
 */
export interface IAutomationMetadataObjectDefinition
    extends Omit<IAutomationMetadataObjectBase, "exportDefinitions">,
        IMetadataObjectDefinition,
        IAuditable {
    type: "automation";
    exportDefinitions: IExportDefinitionMetadataObjectDefinition[];
}

/**
 * @alpha
 */
export function isAutomationMetadataObjectDefinition(
    obj: unknown,
): obj is IAutomationMetadataObjectDefinition {
    return !isEmpty(obj) && (obj as IAutomationMetadataObject).type === "automation";
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
