import { DayPickerRangeProps } from "react-day-picker";
export declare const mergeDayPickerProps: (defaultProps: DayPickerRangeProps, userProps: DayPickerRangeProps | undefined) => DayPickerRangeProps;
export declare const areRangeBoundsCrossed: (from: Date, to: Date) => boolean;
export declare const getPlatformStringFromDate: (value: Date) => string;
export declare const getTimeStringFromDate: (value: Date | undefined) => string;
