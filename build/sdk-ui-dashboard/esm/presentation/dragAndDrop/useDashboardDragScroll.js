// (C) 2022 GoodData Corporation
import { useDragDropManager } from "react-dnd";
import { useEffect, useState } from "react";
import { useInterval } from "./useInterval.js";
const SCROLLING_STEP = 3;
const SCROLLING_INTERVAL = 5;
const SCROLLING_BOTTOM_ZONE_HEIGHT = 100;
const SCROLLING_ITEM_TYPES = [
    "insightListItem",
    "insight",
    "insight-placeholder",
    "kpi",
    "kpi-placeholder",
    "internal-width-resizer",
    "internal-height-resizer",
];
var ScrollingDirection;
(function (ScrollingDirection) {
    ScrollingDirection[ScrollingDirection["Up"] = -1] = "Up";
    ScrollingDirection[ScrollingDirection["Down"] = 1] = "Down";
    ScrollingDirection[ScrollingDirection["None"] = 0] = "None";
})(ScrollingDirection || (ScrollingDirection = {}));
export function useDashboardDragScroll(contentRef, stickyHeaderRef, stickyFooterRef) {
    const [scrollingDirection, setScrollingDirection] = useState(ScrollingDirection.None);
    const dragDropManager = useDragDropManager();
    useEffect(() => {
        return dragDropManager.getMonitor().subscribeToOffsetChange(() => {
            var _a, _b, _c;
            const itemType = dragDropManager.getMonitor().getItemType();
            const clientOffset = dragDropManager.getMonitor().getSourceClientOffset();
            const headerCoordinations = (_a = stickyHeaderRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            const footerCoordinations = (_b = stickyFooterRef.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
            const contentCoordinations = (_c = contentRef.current) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect();
            if ((itemType && !SCROLLING_ITEM_TYPES.includes(itemType)) ||
                !clientOffset ||
                !headerCoordinations ||
                !footerCoordinations ||
                !contentCoordinations) {
                setScrollingDirection(ScrollingDirection.None);
                return;
            }
            const shouldScrollUp = clientOffset.y <= (headerCoordinations === null || headerCoordinations === void 0 ? void 0 : headerCoordinations.bottom) &&
                (headerCoordinations === null || headerCoordinations === void 0 ? void 0 : headerCoordinations.bottom) > (contentCoordinations === null || contentCoordinations === void 0 ? void 0 : contentCoordinations.top);
            if (shouldScrollUp) {
                setScrollingDirection(ScrollingDirection.Up);
                return;
            }
            const shouldScrollDown = clientOffset.y > (footerCoordinations === null || footerCoordinations === void 0 ? void 0 : footerCoordinations.bottom) - SCROLLING_BOTTOM_ZONE_HEIGHT &&
                (contentCoordinations === null || contentCoordinations === void 0 ? void 0 : contentCoordinations.bottom) > (footerCoordinations === null || footerCoordinations === void 0 ? void 0 : footerCoordinations.bottom);
            if (shouldScrollDown) {
                setScrollingDirection(ScrollingDirection.Down);
                return;
            }
            setScrollingDirection(ScrollingDirection.None);
        });
        // we want to subscribe only once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useInterval(() => {
        var _a;
        const scrollingTop = scrollingDirection * SCROLLING_STEP;
        (_a = findScrollable(contentRef.current)) === null || _a === void 0 ? void 0 : _a.scrollBy({
            top: scrollingTop,
        });
    }, scrollingDirection === ScrollingDirection.None ? null : SCROLLING_INTERVAL);
}
/**
 * function goes from element to its parents and finds first scrollable element
 */
function findScrollable(element) {
    if (!element) {
        return document.documentElement;
    }
    if (element instanceof HTMLElement) {
        const overflowY = window.getComputedStyle(element).overflowY;
        const isScrollable = overflowY !== "visible" && overflowY !== "hidden";
        if (isScrollable && element.scrollHeight >= element.clientHeight) {
            return element;
        }
    }
    return findScrollable(element.parentNode);
}
//# sourceMappingURL=useDashboardDragScroll.js.map