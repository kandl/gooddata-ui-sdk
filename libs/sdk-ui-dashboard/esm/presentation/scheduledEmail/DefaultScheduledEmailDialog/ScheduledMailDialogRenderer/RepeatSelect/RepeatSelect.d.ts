import * as React from "react";
import { WrappedComponentProps } from "react-intl";
export interface IRepeatSelectData {
    repeatExecuteOn: string;
    repeatFrequency: string;
    repeatPeriod: number;
    repeatType: string;
}
interface IRepeatSelectOwnProps {
    label: string;
    startDate: Date;
    onChange: (data: IRepeatSelectData) => void;
}
export type IRepeatSelectProps = IRepeatSelectData & IRepeatSelectOwnProps & WrappedComponentProps;
export declare const RepeatSelect: React.FC<import("react-intl").WithIntlProps<IRepeatSelectProps>> & {
    WrappedComponent: React.ComponentType<IRepeatSelectProps>;
};
export {};
