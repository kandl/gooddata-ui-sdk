/// <reference types="react" />
import { IDashboardAttributeFilter } from "@gooddata/sdk-model";
import { CustomDashboardAttributeFilterComponent } from "../../filterBar/types.js";
type DraggableAttributeFilterProps = {
    filter: IDashboardAttributeFilter;
    filterIndex: number;
    autoOpen: boolean;
    FilterComponent: CustomDashboardAttributeFilterComponent;
    onAttributeFilterChanged: (filter: IDashboardAttributeFilter) => void;
    onAttributeFilterAdded: (index: number) => void;
    onAttributeFilterClose: () => void;
};
export declare function DraggableAttributeFilter({ FilterComponent, filter, filterIndex, autoOpen, onAttributeFilterChanged, onAttributeFilterAdded, onAttributeFilterClose, }: DraggableAttributeFilterProps): JSX.Element;
export {};
