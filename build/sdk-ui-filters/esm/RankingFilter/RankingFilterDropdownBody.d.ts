import React from "react";
import { IRankingFilter, ObjRefInScope } from "@gooddata/sdk-model";
import { WrappedComponentProps } from "react-intl";
import { IMeasureDropdownItem, IAttributeDropdownItem, ICustomGranularitySelection } from "./types.js";
interface IRankingFilterDropdownBodyComponentOwnProps {
    measureItems: IMeasureDropdownItem[];
    attributeItems: IAttributeDropdownItem[];
    filter: IRankingFilter;
    onApply: (filter: IRankingFilter) => void;
    onCancel?: () => void;
    onDropDownItemMouseOver?: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOut?: () => void;
    customGranularitySelection?: ICustomGranularitySelection;
    enableRenamingMeasureToMetric?: boolean;
}
type RankingFilterDropdownBodyComponentProps = IRankingFilterDropdownBodyComponentOwnProps & WrappedComponentProps;
export declare const RankingFilterDropdownBody: React.FC<import("react-intl").WithIntlProps<RankingFilterDropdownBodyComponentProps>> & {
    WrappedComponent: React.ComponentType<RankingFilterDropdownBodyComponentProps>;
};
export {};
