import React from "react";
export interface IRepeatTypeSelectProps {
    repeatType: string;
    startDate: Date;
    onChange: (repeatType: string) => void;
}
export declare const RepeatTypeSelect: React.FC<IRepeatTypeSelectProps>;
