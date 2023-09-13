// (C) 2022 GoodData Corporation
import { useEffect, useCallback } from "react";
import { useNumberState } from "./useNumberState.js";
import { useContentHeight } from "./useContentHeight.js";
export function useScrollEvent(content, size, onScroll) {
    const [top, setTop] = useNumberState();
    const [bottom, setBottom] = useNumberState();
    const contentHeight = useContentHeight(content);
    useEffect(() => {
        calculateOpacities(content, size, [top, setTop], [bottom, setBottom]);
    }, [bottom, setBottom, setTop, size, top, content, contentHeight]);
    const onScrollHandler = useCallback((event) => {
        calculateOpacities(content, size, [top, setTop], [bottom, setBottom]);
        onScroll === null || onScroll === void 0 ? void 0 : onScroll(event);
    }, [bottom, onScroll, setBottom, setTop, size, top, content]);
    return { top, bottom, onScrollHandler };
}
function calculateOpacities(content, size, t, b) {
    const scrollTop = content ? content.scrollTop : 0;
    const topOpacity = calculateOpacity(scrollTop, size);
    const scrollBottom = content ? content.scrollHeight - content.offsetHeight - content.scrollTop : 0;
    const bottomOpacity = calculateOpacity(scrollBottom, size);
    const [top, setTop] = t;
    if (top !== topOpacity) {
        setTop(topOpacity);
    }
    const [bottom, setBottom] = b;
    if (bottom !== bottomOpacity) {
        setBottom(bottomOpacity);
    }
}
function calculateOpacity(current, size) {
    const opacity = Math.min(current / size, 1);
    if (opacity > 0) {
        return Math.max(opacity, 0.2);
    }
    return opacity;
}
//# sourceMappingURL=useScrollEvent.js.map