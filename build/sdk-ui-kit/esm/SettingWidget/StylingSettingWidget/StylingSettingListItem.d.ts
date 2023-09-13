/// <reference types="react" />
import { ObjRef } from "@gooddata/sdk-model";
import { IStylingPickerItem, StylingPickerItemContent } from "../../Dialog/index.js";
interface IStylingSettingListItemProps<T> {
    item: IStylingPickerItem<T>;
    itemToColorPreview: (itemContent: T) => string[];
    isSelected: boolean;
    isDeletable?: boolean;
    onClick: (ref: ObjRef) => void;
    onEdit?: (item: IStylingPickerItem<T>) => void;
    onDelete?: (ref: ObjRef) => void;
    onMenuToggle?: (ref: ObjRef) => void;
}
export declare const StylingSettingListItem: <T extends StylingPickerItemContent>({ item, itemToColorPreview, isSelected, isDeletable, onClick, onEdit, onDelete, onMenuToggle, }: IStylingSettingListItemProps<T>) => JSX.Element;
export {};
//# sourceMappingURL=StylingSettingListItem.d.ts.map