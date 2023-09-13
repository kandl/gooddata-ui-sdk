import React from "react";
export interface IRepeatExecuteOnSelectProps {
    repeatExecuteOn: string;
    startDate: Date;
    onChange: (repeatExecuteOn: string) => void;
}
export declare const RepeatExecuteOnSelect: React.FC<IRepeatExecuteOnSelectProps>;
