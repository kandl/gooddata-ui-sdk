import React from "react";
import { IRankingFilter, ObjRefInScope } from "@gooddata/sdk-model";
import { IMeasureDropdownItem, IAttributeDropdownItem, ICustomGranularitySelection } from "./types.js";
/**
 * @beta
 */
export interface IRankingFilterProps {
    measureItems: IMeasureDropdownItem[];
    attributeItems: IAttributeDropdownItem[];
    filter: IRankingFilter;
    onApply: (filter: IRankingFilter) => void;
    onCancel?: () => void;
    buttonTitle: string;
    onDropDownItemMouseOver?: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOut?: () => void;
    customGranularitySelection?: ICustomGranularitySelection;
    locale?: string;
    enableRenamingMeasureToMetric?: boolean;
}
/**
 * @beta
 */
export declare const RankingFilter: React.FC<IRankingFilterProps>;
