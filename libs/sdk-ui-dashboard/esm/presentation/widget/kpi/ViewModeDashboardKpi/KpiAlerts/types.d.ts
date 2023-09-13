import { IKpiWidgetDefinition } from "@gooddata/sdk-model";
import { BrokenAlertType } from "../../../../../model/index.js";
interface IBrokenAlertFilterBase {
    title: string;
    brokenType: BrokenAlertType;
}
export interface IBrokenAlertAttributeFilter extends IBrokenAlertFilterBase {
    type: "attribute";
    selection: string;
    selectionSize: number;
    isAllSelected: boolean;
}
export interface IBrokenAlertDateFilter extends IBrokenAlertFilterBase {
    type: "date";
    dateFilterTitle: string;
}
export type IBrokenAlertFilter = IBrokenAlertAttributeFilter | IBrokenAlertDateFilter;
export declare function isBrokenAlertAttributeFilter(obj: unknown): obj is IBrokenAlertAttributeFilter;
export declare function isBrokenAlertDateFilter(obj: unknown): obj is IBrokenAlertDateFilter;
export interface IKpiDescriptionTriggerProps {
    kpi: IKpiWidgetDefinition;
}
export {};
