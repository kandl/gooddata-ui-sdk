// (C) 2022-2023 GoodData Corporation
import React, { useEffect, useRef } from "react";
import { useScrollContext } from "./ScrollContext.js";
/**
 * @internal
 */
export const ScrollableItem = (props) => {
    const item = useRef(null);
    const scroll = useScrollContext();
    const { scrollIntoView, bottomMargin, isElementInvisibleCheck, className, children, onItemScrolled, tagName: TagName = "div", } = props;
    useEffect(() => {
        if (scrollIntoView) {
            const element = item.current;
            scroll.scrollIntoView(element, bottomMargin, isElementInvisibleCheck);
            if (onItemScrolled) {
                onItemScrolled();
            }
        }
    }, [bottomMargin, isElementInvisibleCheck, scroll, scrollIntoView, item, onItemScrolled]);
    return (React.createElement(TagName, { className: className, ref: item }, children));
};
//# sourceMappingURL=ScrollableItem.js.map