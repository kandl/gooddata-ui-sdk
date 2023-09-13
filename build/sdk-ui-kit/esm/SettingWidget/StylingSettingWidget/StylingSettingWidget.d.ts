/// <reference types="react" />
import { ObjRef } from "@gooddata/sdk-model";
import { IStylingPickerItem, StylingPickerItemContent } from "../../Dialog/index.js";
/**
 * @internal
 */
export interface IStylingSettingWidgetProps<T extends StylingPickerItemContent> {
    title: string;
    defaultItem: IStylingPickerItem<T>;
    customItems: IStylingPickerItem<T>[];
    itemToColorPreview: (itemContent: T) => string[];
    emptyMessage: () => JSX.Element;
    selectedItemRef?: ObjRef;
    isLoading?: boolean;
    titleTooltip?: string;
    footerHelpLink?: string;
    footerHelpTitle?: string;
    footerMobileMessage?: string;
    className?: string;
    shouldDisableCancelButton?: boolean;
    shouldDisableApplyButton?: boolean;
    onApply?: (ref: ObjRef) => void;
    onCancel?: () => void;
    onListActionClick?: () => void;
    onItemEdit?: (modifiedItem: IStylingPickerItem<T>) => void;
    onItemDelete?: (ref: ObjRef) => void;
    locale?: string;
    onHelpClick?: () => void;
    onItemMenuToggle?: (ref: ObjRef) => void;
    onItemSelect?: (ref: ObjRef) => void;
}
/**
 * @internal
 */
export declare const StylingSettingWidget: <T extends StylingPickerItemContent>(props: IStylingSettingWidgetProps<T>) => JSX.Element;
//# sourceMappingURL=StylingSettingWidget.d.ts.map