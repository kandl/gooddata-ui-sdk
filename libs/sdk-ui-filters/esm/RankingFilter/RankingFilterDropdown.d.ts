import React from "react";
import { IRankingFilter, ObjRefInScope } from "@gooddata/sdk-model";
import { IMeasureDropdownItem, IAttributeDropdownItem, ICustomGranularitySelection } from "./types.js";
export declare const prepareRankingFilterState: (filter: IRankingFilter) => IRankingFilter;
/**
 * @beta
 */
export interface IRankingFilterDropdownProps {
    measureItems: IMeasureDropdownItem[];
    attributeItems: IAttributeDropdownItem[];
    filter: IRankingFilter;
    onApply: (filter: IRankingFilter) => void;
    onCancel?: () => void;
    onDropDownItemMouseOver?: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOut?: () => void;
    anchorEl?: HTMLElement | string;
    customGranularitySelection?: ICustomGranularitySelection;
    locale?: string;
    enableRenamingMeasureToMetric?: boolean;
}
/**
 * @beta
 */
export declare const RankingFilterDropdown: React.FC<IRankingFilterDropdownProps>;
