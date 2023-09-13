import { FilterContextItem, IDashboardAttributeFilter, IDashboardDateFilter, ObjRef } from "@gooddata/sdk-model";
/**
 * @internal
 */
export type FilterBarAttributeFilterPlaceholder = {
    type: "attributeFilterPlaceholder";
    filterIndex: number;
    displayForm?: ObjRef;
};
/**
 * @internal
 */
export declare function isFilterBarAttributeFilterPlaceholder(object: any): object is FilterBarAttributeFilterPlaceholder;
/**
 * @internal
 */
export type FilterBarAttributeFilterIndexed = {
    filter: IDashboardAttributeFilter;
    filterIndex: number;
};
/**
 * @internal
 */
export type FilterBarAttributeItem = FilterBarAttributeFilterPlaceholder | FilterBarAttributeFilterIndexed;
/**
 * @internal
 */
export type FilterBarAttributeItems = FilterBarAttributeItem[];
/**
 * @internal
 */
export declare function useFiltersWithAddedPlaceholder(filters: FilterContextItem[]): [
    {
        dateFilter: IDashboardDateFilter;
        attributeFiltersWithPlaceholder: FilterBarAttributeItems;
        attributeFiltersCount: number;
        autoOpenFilter: ObjRef | undefined;
    },
    {
        addAttributeFilterPlaceholder: (index: number) => void;
        selectAttributeFilter: (displayForm: ObjRef) => void;
        closeAttributeSelection: () => void;
        onCloseAttributeFilter: () => void;
    }
];
