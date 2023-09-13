import { IDateRange } from "../DateRangePicker/DateRangePicker.js";
import { IUiAbsoluteDateFilterForm } from "../interfaces/index.js";
export declare const dateRangeToDateFilterValue: (range: IDateRange, localIdentifier: string, isTimeForAbsoluteRangeEnabled: boolean) => IUiAbsoluteDateFilterForm;
export declare const dateFilterValueToDateRange: (value: IUiAbsoluteDateFilterForm, isTimeForAbsoluteRangeEnabled?: boolean) => IDateRange;
