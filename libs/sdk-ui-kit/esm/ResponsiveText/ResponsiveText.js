// (C) 2007-2023 GoodData Corporation
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import debounce from "lodash/debounce.js";
import isNumber from "lodash/isNumber.js";
/**
 * @internal
 */
export const ResponsiveText = ({ tagName: Tag = "div", tagClassName, title, children, windowResizeRefreshDelay = 50, window: windowInstance = window, }) => {
    const [fontSize, setFontSize] = useState(null);
    const containerRef = useRef();
    const adjustFontSize = useCallback(() => {
        if (!containerRef.current) {
            return;
        }
        const currentStyle = windowInstance.getComputedStyle(containerRef.current, null);
        const currentFontSize = parseFloat(currentStyle.fontSize);
        if (isNumber(currentFontSize)) {
            const { scrollWidth } = containerRef.current;
            const width = containerRef.current.getBoundingClientRect().width;
            const ratio = Math.round(width) / scrollWidth;
            const size = Math.floor(currentFontSize * ratio);
            setFontSize(size);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useLayoutEffect(() => {
        const handleWindowResize = debounce(() => {
            // reset font size so that we can read the default fontSize in adjustFontSize later
            setFontSize(null);
        }, windowResizeRefreshDelay);
        windowInstance.addEventListener("resize", handleWindowResize);
        return () => windowInstance.removeEventListener("resize", handleWindowResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowResizeRefreshDelay]);
    useLayoutEffect(() => {
        // reset font size so that we can read the default fontSize in adjustFontSize later
        setFontSize(null);
    }, [children, tagClassName]);
    useLayoutEffect(() => {
        if (!fontSize) {
            // then adjust the font again
            adjustFontSize();
        }
    }, [fontSize, adjustFontSize]);
    return (React.createElement(Tag, { className: tagClassName, ref: containerRef, style: fontSize ? { fontSize: `${fontSize}px` } : undefined, title: title }, children));
};
//# sourceMappingURL=ResponsiveText.js.map