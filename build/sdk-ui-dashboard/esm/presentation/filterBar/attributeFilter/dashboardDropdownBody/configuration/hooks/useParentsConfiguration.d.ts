import { IDashboardAttributeFilter, ObjRef } from "@gooddata/sdk-model";
import { IDashboardAttributeFilterParentItem } from "../../../../../../model/index.js";
export declare function useParentsConfiguration(neighborFilters: IDashboardAttributeFilter[], currentFilter: IDashboardAttributeFilter): {
    parents: IDashboardAttributeFilterParentItem[];
    configurationChanged: boolean;
    onParentSelect: (localIdentifier: string, isSelected: boolean, overAttributes: ObjRef[]) => void;
    onConnectingAttributeChanged: (localIdentifier: string, selectedAttribute: ObjRef) => void;
    onParentFiltersChange: () => void;
    onConfigurationClose: () => void;
};
