import { FilterContextItem } from "@gooddata/sdk-model";
export declare const stripLocalIdentifierFromFilters: (filters: FilterContextItem[]) => (import("@gooddata/sdk-model").IDashboardDateFilter | {
    attributeFilter: Pick<{
        displayForm: import("@gooddata/sdk-model").ObjRef;
        negativeSelection: boolean;
        attributeElements: import("@gooddata/sdk-model").IAttributeElements;
        localIdentifier?: string | undefined;
        filterElementsBy?: import("@gooddata/sdk-model").IDashboardAttributeFilterParent[] | undefined;
        title?: string | undefined;
        selectionMode?: import("@gooddata/sdk-model").DashboardAttributeFilterSelectionMode | undefined;
    }, "title" | "displayForm" | "selectionMode" | "negativeSelection" | "attributeElements" | "filterElementsBy">;
})[];
