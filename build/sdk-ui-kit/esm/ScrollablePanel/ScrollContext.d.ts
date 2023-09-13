import React from "react";
/**
 * @internal
 */
export declare const useScrollContext: () => {
    scrollIntoView: (_element: HTMLElement, _bottomMargin?: number, _isElementInvisibleCheck?: isElementInvisibleType) => void;
};
/**
 * @internal
 */
export type isElementInvisibleType = (element: HTMLElement, container: HTMLElement) => boolean;
/**
 * @internal
 */
export declare const scrollContextDefault: {
    scrollIntoView: (_element: HTMLElement, _bottomMargin?: number, _isElementInvisibleCheck?: isElementInvisibleType) => void;
};
export declare const ScrollContext: React.Context<{
    scrollIntoView: (_element: HTMLElement, _bottomMargin?: number, _isElementInvisibleCheck?: isElementInvisibleType) => void;
}>;
//# sourceMappingURL=ScrollContext.d.ts.map