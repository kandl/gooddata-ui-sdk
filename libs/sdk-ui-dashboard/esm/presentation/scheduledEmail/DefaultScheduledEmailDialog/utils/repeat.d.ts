import { IScheduleEmailRepeat } from "../interfaces.js";
export declare const REPEAT_DELIM = "*";
export declare const FRAGMENT_DELIM = ":";
export declare const LIST_DELIM = ",";
export declare function generateRepeatString(repeat: IScheduleEmailRepeat): string;
export declare function setDailyRepeat(repeatData: IScheduleEmailRepeat): void;
export declare function setMonthlyRepeat(repeatData: IScheduleEmailRepeat, repeatExecuteOn: string, startDate: Date): void;
export declare function setWeeklyRepeat(repeatData: IScheduleEmailRepeat, startDate: Date): void;
export declare function parseRepeatString(repeat: string): IScheduleEmailRepeat;
