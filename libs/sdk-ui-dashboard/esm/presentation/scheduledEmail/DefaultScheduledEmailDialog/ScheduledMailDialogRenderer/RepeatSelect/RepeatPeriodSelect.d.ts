import * as React from "react";
interface IRepeatPeriodSelectData {
    repeatPeriod: number | string;
}
interface IRepeatPeriodSelectOwnProps {
    onChange: (repeatPeriod: number) => void;
}
export type IRepeatPeriodSelectProps = IRepeatPeriodSelectData & IRepeatPeriodSelectOwnProps;
type IRepeatPeriodSelectState = IRepeatPeriodSelectData;
export declare class RepeatPeriodSelect extends React.PureComponent<IRepeatPeriodSelectProps, IRepeatPeriodSelectState> {
    constructor(props: IRepeatPeriodSelectProps);
    render(): JSX.Element;
    private isInvalidValue;
    private triggerChangeEvent;
    private onBlur;
    private onChange;
}
export {};
