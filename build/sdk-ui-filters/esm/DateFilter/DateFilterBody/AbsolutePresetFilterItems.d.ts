import React from "react";
import { IAbsoluteDateFilterPreset } from "@gooddata/sdk-model";
import { DateFilterOption } from "../interfaces/index.js";
interface IAbsolutePresetFilterItemsProps {
    filterOptions: IAbsoluteDateFilterPreset[];
    dateFormat: string;
    selectedFilterOption: DateFilterOption;
    className?: string;
    onSelectedFilterOptionChange: (option: DateFilterOption) => void;
}
export declare const AbsolutePresetFilterItems: React.FC<IAbsolutePresetFilterItemsProps>;
export {};
