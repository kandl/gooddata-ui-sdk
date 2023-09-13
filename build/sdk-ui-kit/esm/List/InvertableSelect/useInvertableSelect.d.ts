/**
 * @internal
 */
export interface IUseInvertableSelectProps<T> {
    items: T[];
    totalItemsCount?: number;
    getItemKey?: (item: T) => string;
    searchString?: string;
    isInverted: boolean;
    selectedItems: T[];
    onSelect?: (items: T[], isInverted: boolean) => void;
}
export type SelectionStatusType = "all" | "partial" | "none";
/**
 * @internal
 */
export declare function useInvertableSelect<T>(props: IUseInvertableSelectProps<T>): {
    onSelectAllCheckboxToggle: () => void;
    onSelectAllCheckboxChange: (value: boolean) => void;
    getIsItemSelected: (item: T) => boolean;
    selectionState: SelectionStatusType;
    selectItems: (items: T[]) => void;
    deselectItems: (items: T[]) => void;
    selectOnly: (item: T) => void;
};
//# sourceMappingURL=useInvertableSelect.d.ts.map