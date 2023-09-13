import React from "react";
import { DateFilterOption } from "../interfaces/index.js";
export interface IDateFilterButtonLocalizedProps {
    dateFilterOption: DateFilterOption;
    dateFormat: string;
    isOpen?: boolean;
    isMobile: boolean;
    customFilterName?: string;
    disabled?: boolean;
}
export declare const DateFilterButtonLocalized: React.FC<IDateFilterButtonLocalizedProps>;
