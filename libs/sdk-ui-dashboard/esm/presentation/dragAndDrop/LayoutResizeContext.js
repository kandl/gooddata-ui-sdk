// (C) 2022 GoodData Corporation
import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import noop from "lodash/noop.js";
import { emptyDOMRect } from "../layout/constants.js";
const initState = {
    resizeDirection: "none",
    resizeItemIdentifiers: [],
    heightLimitReached: "none",
    widthState: null,
    initialDashboardDimensions: emptyDOMRect,
};
const LayoutResizeStateContext = createContext({
    resizeDirection: "none",
    resizeItemIdentifiers: [],
    heightLimitReached: "none",
    widthState: null,
    initialDashboardDimensions: emptyDOMRect,
    resizeStart: noop,
    resizeEnd: noop,
    setScrollCorrection: noop,
    getScrollCorrection: () => ({ x: 0, y: 0 }),
    setWidthState: noop,
    toggleHeightLimitReached: noop,
});
export function LayoutResizeStateProvider({ children }) {
    const scrollingCorrectionRef = useRef({ x: 0, y: 0 });
    const [resizeState, setResizeState] = useState(initState);
    const resizeStart = useCallback((direction, identifiers, getDashboardDimensions) => {
        setResizeState({
            heightLimitReached: "none",
            initialDashboardDimensions: getDashboardDimensions ? getDashboardDimensions() : emptyDOMRect,
            resizeDirection: direction,
            resizeItemIdentifiers: identifiers,
            widthState: null,
        });
    }, []);
    const toggleHeightLimitReached = useCallback((heightLimitReached) => {
        setResizeState((state) => (Object.assign(Object.assign({}, state), { heightLimitReached })));
    }, []);
    const setWidthState = useCallback((widthState) => {
        setResizeState((state) => (Object.assign(Object.assign({}, state), { widthState })));
    }, []);
    const setScrollCorrection = useCallback((scrollCorrection) => {
        scrollingCorrectionRef.current = scrollCorrection;
    }, []);
    const getScrollCorrection = useCallback(() => {
        return scrollingCorrectionRef.current;
    }, []);
    const resizeEnd = useCallback(() => {
        setResizeState(initState);
    }, []);
    return (React.createElement(LayoutResizeStateContext.Provider, { value: Object.assign(Object.assign({}, resizeState), { resizeStart,
            resizeEnd,
            setScrollCorrection,
            getScrollCorrection,
            setWidthState,
            toggleHeightLimitReached }) }, children));
}
export function useResizeContext() {
    return useContext(LayoutResizeStateContext);
}
export function useResizeHandlers() {
    const context = useResizeContext();
    return {
        resizeStart: context.resizeStart,
        toggleHeightLimitReached: context.toggleHeightLimitReached,
        resizeEnd: context.resizeEnd,
        setWidthState: context.setWidthState,
        setScrollCorrection: context.setScrollCorrection,
        getScrollCorrection: context.getScrollCorrection,
    };
}
export function useResizeItemStatus(identifier) {
    var _a, _b;
    const context = useResizeContext();
    return {
        isActive: context.resizeItemIdentifiers.includes(identifier),
        isResizingColumnOrRow: context.resizeDirection !== "none",
        heightLimitReached: context.heightLimitReached,
        widthLimitReached: (_b = (_a = context.widthState) === null || _a === void 0 ? void 0 : _a.limitReached) !== null && _b !== void 0 ? _b : "none",
        initialDashboardDimensions: context.initialDashboardDimensions,
    };
}
export function useResizeWidthItemStatus(identifier) {
    const context = useResizeContext();
    return {
        isWidthResizing: context.resizeDirection === "width",
        isActive: context.resizeItemIdentifiers.includes(identifier),
        widthState: context.widthState,
    };
}
export function useResizeWidthStatus() {
    const context = useResizeContext();
    return Object.assign({ isResizingWidth: context.resizeDirection === "width" }, context.widthState);
}
//# sourceMappingURL=LayoutResizeContext.js.map