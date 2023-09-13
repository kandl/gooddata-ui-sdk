import React from "react";
import { IAllTimeDateFilterOption } from "@gooddata/sdk-model";
import { DateFilterOption } from "../interfaces/index.js";
export declare const AllTimeFilterItem: React.FC<{
    filterOption: IAllTimeDateFilterOption;
    selectedFilterOption: DateFilterOption;
    className?: string;
    onSelectedFilterOptionChange: (option: DateFilterOption) => void;
}>;
