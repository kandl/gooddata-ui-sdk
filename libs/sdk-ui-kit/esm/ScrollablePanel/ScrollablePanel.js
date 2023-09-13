import { __rest } from "tslib";
// (C) 2019-2022 GoodData Corporation
import React, { useRef, useImperativeHandle, useMemo, useCallback } from "react";
import { ScrollContext } from "./ScrollContext.js";
import { handleOnScrollEvent } from "../utils/scroll.js";
const DEFAULT_BOTTOM_MARGIN = 5;
const scrollToVisibleDefault = (element, container, bottomMargin) => {
    container.scrollTop = element.offsetTop - container.offsetTop - bottomMargin;
};
const isElementInvisibleCheckDefault = (element, container) => {
    if (element && container) {
        const offset = element.offsetTop - container.offsetTop;
        const itemHeight = element.clientHeight;
        const parentHeight = container.clientHeight;
        return parentHeight < offset + itemHeight;
    }
    return false;
};
/**
 * @internal
 */
export const ScrollablePanel = React.forwardRef(function ScrollablePanel(props, ref) {
    const { tagName: TagName = "div", scrollToVisible = scrollToVisibleDefault, children } = props, divProps = __rest(props, ["tagName", "scrollToVisible", "children"]);
    const containerRef = useRef();
    useImperativeHandle(ref, () => containerRef.current);
    const memoizeContext = useMemo(() => {
        return {
            scrollIntoView: (element, bottomMargin = DEFAULT_BOTTOM_MARGIN, isElementInvisibleCheck = isElementInvisibleCheckDefault) => {
                if (containerRef.current) {
                    const container = containerRef.current;
                    if (isElementInvisibleCheck(element, container)) {
                        scrollToVisible(element, container, bottomMargin);
                    }
                }
            },
        };
    }, [scrollToVisible, containerRef]);
    const onPanelScroll = useCallback(() => {
        if (containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) {
            handleOnScrollEvent(containerRef.current);
        }
    }, []);
    return (React.createElement(ScrollContext.Provider, { value: memoizeContext },
        React.createElement(TagName, Object.assign({}, divProps, { ref: containerRef, onScroll: onPanelScroll }), children)));
});
//# sourceMappingURL=ScrollablePanel.js.map