import React from "react";
import { DateFilterGranularity } from "@gooddata/sdk-model";
interface IExcludeCurrentPeriodToggleProps {
    value: boolean;
    onChange: (excludeCurrentPeriod: boolean) => void;
    disabled?: boolean;
    granularity?: DateFilterGranularity;
}
export declare const ExcludeCurrentPeriodToggle: React.FC<IExcludeCurrentPeriodToggleProps>;
export {};
