// (C) 2021-2024 GoodData Corporation
// import { IWebhookMetadataObject } from "../notificationChannels/index.js";
import isEmpty from "lodash/isEmpty.js";
import { IMdObject, ToMdObjectDefinition } from "../ldm/metadata/types.js";

/**
 * @alpha
 */
export interface IAutomationMdObject extends IMdObject<"automation"> {
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
