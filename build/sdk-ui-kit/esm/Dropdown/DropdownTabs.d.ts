import React from "react";
import { ITab } from "../Tabs/index.js";
/**
 * @internal
 */
export interface IDropdownTagsProps {
    tabs?: ITab[];
    selectedTabId?: string;
    onTabSelect?: (tab: ITab) => void;
}
/**
 * @internal
 */
export declare const DropdownTabs: React.FC<IDropdownTagsProps>;
//# sourceMappingURL=DropdownTabs.d.ts.map