import { IBrokenAlertFilter } from "../../../types.js";
interface ILabelFilterData {
    title: string;
    selection: string;
    isDate: boolean;
    isAllSelected: boolean;
    selectionSize: number | undefined;
}
export declare function getFilterLabelFilter(item: IBrokenAlertFilter): ILabelFilterData;
export {};
