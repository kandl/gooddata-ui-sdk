import React from "react";
import { DateFilterRelativeOptionGroup, DateFilterOption } from "../interfaces/index.js";
/**
 * @internal
 */
export interface IRelativePresetFilterItemsProps {
    dateFormat: string;
    filterOption: DateFilterRelativeOptionGroup;
    selectedFilterOption: DateFilterOption;
    className?: string;
    onSelectedFilterOptionChange: (option: DateFilterOption) => void;
}
/**
 * @internal
 */
export declare const RelativePresetFilterItems: React.FC<IRelativePresetFilterItemsProps>;
