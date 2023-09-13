/// <reference types="react" />
import { ObjRef } from "@gooddata/sdk-model";
import { IStylingPickerItem, StylingPickerItemContent } from "../../Dialog/index.js";
interface IStylingSettingListProps<T> {
    items: IStylingPickerItem<T>[];
    itemToColorPreview: (itemContent: T) => string[];
    emptyMessageElement: JSX.Element;
    onItemClick: (ref: ObjRef) => void;
    initiallySelectedItemRef?: ObjRef;
    selectedItemRef?: ObjRef;
    onItemEdit?: (item: IStylingPickerItem<T>) => void;
    onItemDelete?: (ref: ObjRef) => void;
    onItemMenuToggle?: (ref: ObjRef) => void;
}
export declare const StylingSettingList: <T extends StylingPickerItemContent>({ items, itemToColorPreview, emptyMessageElement, onItemClick, onItemEdit, onItemDelete, initiallySelectedItemRef, selectedItemRef, onItemMenuToggle, }: IStylingSettingListProps<T>) => JSX.Element;
export {};
//# sourceMappingURL=StylingSettingList.d.ts.map