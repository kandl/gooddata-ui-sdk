import * as React from "react";
import { IScheduleEmailRepeatTime } from "../interfaces.js";
import { WeekStart } from "@gooddata/sdk-model";
interface IDateTimeOwnProps {
    date: Date;
    dateFormat?: string;
    label: string;
    locale?: string;
    timezone: string;
    onDateChange: (date: Date) => void;
    onTimeChange: (time: IScheduleEmailRepeatTime) => void;
    weekStart?: WeekStart;
}
export type IDateTimeProps = IDateTimeOwnProps;
export declare class DateTime extends React.PureComponent<IDateTimeProps> {
    render(): JSX.Element;
    private timeChange;
}
export {};
