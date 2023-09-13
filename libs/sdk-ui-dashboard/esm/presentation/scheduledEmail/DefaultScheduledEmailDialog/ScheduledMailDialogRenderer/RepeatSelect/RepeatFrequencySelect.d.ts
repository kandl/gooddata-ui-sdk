import React from "react";
export interface IRepeatFrequencySelectProps {
    repeatFrequency: string;
    repeatPeriod: number;
    onChange: (repeatFrequency: string) => void;
}
export declare const RepeatFrequencySelect: React.FC<IRepeatFrequencySelectProps>;
