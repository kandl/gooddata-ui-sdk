import React from "react";
import { IUiRelativeDateFilterForm, DateFilterOption } from "../interfaces/index.js";
import { DateFilterGranularity } from "@gooddata/sdk-model";
/**
 * @internal
 */
export interface IRelativeDateFilterFormProps {
    availableGranularities: DateFilterGranularity[];
    selectedFilterOption: IUiRelativeDateFilterForm;
    onSelectedFilterOptionChange: (dateFilterOption: DateFilterOption) => void;
    isMobile: boolean;
}
/**
 * @internal
 */
export declare const RelativeDateFilterForm: React.FC<IRelativeDateFilterFormProps>;
