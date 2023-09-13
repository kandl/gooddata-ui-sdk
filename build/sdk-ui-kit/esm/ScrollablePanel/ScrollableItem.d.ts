import React from "react";
import { isElementInvisibleType } from "./ScrollContext.js";
/**
 * @internal
 */
export interface IScrollableItemProps {
    scrollIntoView: boolean;
    className?: string;
    bottomMargin?: number;
    isElementInvisibleCheck?: isElementInvisibleType;
    tagName?: React.ElementType;
    onItemScrolled?: () => void;
    children?: React.ReactNode;
}
/**
 * @internal
 */
export declare const ScrollableItem: React.FC<IScrollableItemProps>;
//# sourceMappingURL=ScrollableItem.d.ts.map