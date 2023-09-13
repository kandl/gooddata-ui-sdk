/// <reference types="react" />
import { ObjRef } from "@gooddata/sdk-model";
import { IStylingPickerItem, StylingPickerItemContent } from "../../Dialog/index.js";
interface IStylingSettingBodyProps<T> {
    isMobile: boolean;
    defaultItem: IStylingPickerItem<T>;
    customItems: IStylingPickerItem<T>[];
    itemToColorPreview: (itemContent: T) => string[];
    emptyMessage: () => JSX.Element;
    isLoading?: boolean;
    onListActionClick?: () => void;
    initiallySelectedItemRef: ObjRef;
    selectedItemRef: ObjRef;
    onItemClick: (ref: ObjRef) => void;
    onItemEdit?: (item: IStylingPickerItem<T>) => void;
    onItemDelete?: (ref: ObjRef) => void;
    onItemMenuToggle?: (ref: ObjRef) => void;
}
export declare const StylingSettingBody: <T extends StylingPickerItemContent>({ isMobile, defaultItem, customItems, itemToColorPreview, emptyMessage, isLoading, onListActionClick, initiallySelectedItemRef, selectedItemRef, onItemClick, onItemEdit, onItemDelete, onItemMenuToggle, }: IStylingSettingBodyProps<T>) => JSX.Element;
export {};
//# sourceMappingURL=StylingSettingBody.d.ts.map