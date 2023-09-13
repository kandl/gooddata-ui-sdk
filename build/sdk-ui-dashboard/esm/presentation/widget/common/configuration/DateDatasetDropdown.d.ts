import React from "react";
import { ICatalogDateDataset, ObjRef } from "@gooddata/sdk-model";
export interface IDateDatasetDropdownProps {
    autoOpen?: boolean;
    widgetRef: ObjRef;
    relatedDateDatasets: readonly ICatalogDateDataset[];
    activeDateDataset?: ICatalogDateDataset;
    unrelatedDateDataset?: ICatalogDateDataset;
    dateFromVisualization?: ICatalogDateDataset;
    onDateDatasetChange: (id: string) => void;
    className?: string;
    width: number;
    isLoading?: boolean;
}
export declare const DateDatasetDropdown: React.FC<IDateDatasetDropdownProps>;
/**
 * Purpose of this hook is keep value of closeOnParentScroll derived from autoOpen
 * We need set closeOnParentScroll to false and after item scrolled return to true
 * otherwise dropdown is immediately closed when item is scrolled to view
 */
export declare function useAutoScroll(autoOpen: boolean): {
    onItemScroll: () => void;
    closeOnParentScroll: boolean;
};
