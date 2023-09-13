import { IDashboardAttributeFilter, IDashboardAttributeFilterParent } from "@gooddata/sdk-model";
/**
 * @internal
 */
export declare function useOriginalConfigurationState(neighborFilters: IDashboardAttributeFilter[], filterElementsBy: IDashboardAttributeFilterParent[] | undefined): {
    localIdentifier: string;
    displayForm: import("@gooddata/sdk-model").ObjRef;
    isSelected: boolean;
    overAttributes: import("@gooddata/sdk-model").ObjRef[] | undefined;
    selectedConnectingAttribute: import("@gooddata/sdk-model").ObjRef | undefined;
    title: string | undefined;
}[];
