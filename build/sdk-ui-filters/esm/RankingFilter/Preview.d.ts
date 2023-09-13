import React from "react";
import { RankingFilterOperator } from "@gooddata/sdk-model";
import { IMeasureDropdownItem, IAttributeDropdownItem } from "./types.js";
interface IPreviewProps {
    measure: IMeasureDropdownItem;
    attribute?: IAttributeDropdownItem;
    operator: RankingFilterOperator;
    value: number;
}
export declare const Preview: React.FC<IPreviewProps>;
export {};
