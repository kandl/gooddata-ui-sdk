import { IUser, IWorkspaceUser } from "@gooddata/sdk-model";
/**
 * @internal
 */
export interface IScheduleEmailRepeatDate {
    day: number;
    month: number;
    year: number;
}
/**
 * @internal
 */
export interface IScheduleEmailRepeatTime {
    hour: number;
    minute: number;
    second: number;
}
/**
 * @internal
 */
export interface IScheduleEmailRepeatFrequencyDayOfWeek {
    day: number;
    week: number;
}
/**
 * @internal
 */
export interface IScheduleEmailRepeatFrequency {
    day?: boolean;
    week?: {
        days: number[];
    };
    month?: {
        type: string;
        dayOfMonth?: number;
        dayOfWeek?: IScheduleEmailRepeatFrequencyDayOfWeek;
    };
}
/**
 * @internal
 */
export interface IScheduleEmailRepeat {
    time: IScheduleEmailRepeatTime;
    repeatFrequency: IScheduleEmailRepeatFrequency;
    repeatPeriod: number;
    repeatType: string;
}
/**
 * @internal
 */
export interface IScheduleEmailExternalRecipient {
    /**
     * Target email, if recipient is an external user
     */
    email: string;
}
/**
 * @internal
 */
export declare const isScheduleEmailExternalRecipient: (obj: unknown) => obj is IScheduleEmailExternalRecipient;
/**
 * @internal
 */
export interface IScheduleEmailExistingRecipient {
    /**
     * Target user, if the recipient is an existing user
     */
    user: IWorkspaceUser | IUser;
}
/**
 * @internal
 */
export declare const isScheduleEmailExistingRecipient: (obj: unknown) => obj is IScheduleEmailExistingRecipient;
/**
 * @internal
 */
export type IScheduleEmailRecipient = IScheduleEmailExternalRecipient | IScheduleEmailExistingRecipient;
/**
 * @internal
 */
export interface IDropdownItem {
    id: string;
    title: string;
}
/**
 * @internal
 */
export interface IWidgetsSelection {
    [ref: string]: boolean;
}
export type WidgetExportFileFormat = "csv" | "xlsx";
export interface IWidgetExportConfiguration {
    format: WidgetExportFileFormat;
    mergeHeaders: boolean;
    includeFilters: boolean;
}
