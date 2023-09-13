// (C) 2021-2023 GoodData Corporation
import React, { useEffect, useMemo, useState } from "react";
import { fluidLayoutDescriptor, INSIGHT_WIDGET_SIZE_INFO_DEFAULT } from "@gooddata/sdk-ui-ext";
import isEqual from "lodash/fp/isEqual.js";
import isEmpty from "lodash/isEmpty.js";
import { useDashboardDrag } from "../useDashboardDrag.js";
import { isCustomWidgetBase, resizeHeight, selectInsightsMap, selectSettings, useDashboardDispatch, useDashboardSelector, } from "../../../model/index.js";
import { calculateWidgetMinHeight, getMaxHeight, getMinHeight } from "../../../_staging/layout/sizing.js";
import { HeightResizer } from "./HeightResizer.js";
import { useResizeContext } from "../LayoutResizeContext.js";
import { DEFAULT_WIDTH_RESIZER_HEIGHT } from "../../layout/constants.js";
export function HeightResizerHotspot({ section, items, screen, getLayoutDimensions, }) {
    const dispatch = useDashboardDispatch();
    const insightsMap = useDashboardSelector(selectInsightsMap);
    const settings = useDashboardSelector(selectSettings);
    const { resizeDirection, resizeItemIdentifiers, resizeStart, resizeEnd, getScrollCorrection } = useResizeContext();
    const widgets = useMemo(() => items.map((item) => item.widget()), [items]);
    const widgetIdentifiers = useMemo(() => widgets.map((widget) => widget.identifier), [widgets]);
    const customWidgetsRestrictions = useMemo(() => getCustomWidgetRestrictions(items), [items]);
    const [{ isDragging }, dragRef] = useDashboardDrag({
        dragItem: () => {
            const initialLayoutDimensions = getLayoutDimensions();
            const minLimit = getMinHeight(widgets, insightsMap, customWidgetsRestrictions.heightLimit);
            const maxLimit = getMaxHeight(widgets, insightsMap);
            const heightsGR = getHeightsGR(items, insightsMap, screen, settings);
            return {
                type: "internal-height-resizer",
                sectionIndex: section.index(),
                itemIndexes: items.map((item) => item.index()),
                initialLayoutDimensions,
                widgetHeights: heightsGR,
                minLimit,
                maxLimit,
            };
        },
        dragEnd: (item, monitor) => {
            var _a;
            const scrollCorrection = getScrollCorrection();
            const { sectionIndex, itemIndexes, widgetHeights } = item;
            const minLimit = getMinHeight(widgets, insightsMap, customWidgetsRestrictions.heightLimit);
            const maxLimit = getMaxHeight(widgets, insightsMap);
            const newHeightGR = getNewHeightGR(widgetHeights, ((_a = monitor.getDifferenceFromInitialOffset()) === null || _a === void 0 ? void 0 : _a.y) || 0, scrollCorrection.y, minLimit, maxLimit);
            dispatch(resizeHeight(sectionIndex, itemIndexes, newHeightGR));
            resizeEnd();
        },
    }, [widgets, insightsMap, customWidgetsRestrictions.heightLimit]);
    useEffect(() => {
        if (isDragging) {
            resizeStart("height", widgetIdentifiers);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- we want to run this only when isDragging changes
    }, [isDragging]);
    const areWidgetsResizing = resizeDirection !== "none";
    const isColumnResizing = resizeDirection === "width";
    const isOtherRowResizing = !isEmpty(resizeItemIdentifiers) && !isEqual(resizeItemIdentifiers, widgetIdentifiers);
    const [isResizerVisible, setResizerVisibility] = useState(false);
    const onMouseEnter = () => setResizerVisibility(true);
    const onMouseLeave = () => setResizerVisibility(false);
    const shouldRenderResizer = (areWidgetsResizing || isResizerVisible) && !isColumnResizing && !isOtherRowResizing;
    const status = isDragging ? "muted" : "active";
    return (React.createElement("div", { className: "dash-height-resizer-container s-dash-height-resizer-container" }, customWidgetsRestrictions.allowHeightResize ? (React.createElement("div", { ref: dragRef, className: "s-dash-height-resizer-hotspot dash-height-resizer-hotspot", onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave }, shouldRenderResizer ? React.createElement(HeightResizer, { status: status }) : null)) : null));
}
export function getHeightsGR(items, insightMap, screen, settings) {
    return items.reduce((acc, item) => {
        var _a, _b, _c;
        const currentSize = item.sizeForScreen(screen);
        const widgetMinHeightPX = (_a = calculateWidgetMinHeight(item.widget(), currentSize, insightMap, settings)) !== null && _a !== void 0 ? _a : DEFAULT_WIDTH_RESIZER_HEIGHT;
        const curHeightGR = fluidLayoutDescriptor.toGridHeight(widgetMinHeightPX);
        const gridHeight = (_c = (_b = item.sizeForScreen(screen)) === null || _b === void 0 ? void 0 : _b.gridHeight) !== null && _c !== void 0 ? _c : curHeightGR;
        return [...acc, gridHeight];
    }, []);
}
export function getNewHeightGR(widgetHeights, offsetYPX, scrollCorrectionY, minLimit, maxLimit) {
    const currentWidth = Math.max(...widgetHeights);
    const deltaHeightGR = fluidLayoutDescriptor.toGridHeight(offsetYPX - scrollCorrectionY);
    return Math.min(maxLimit, Math.max(minLimit, currentWidth + deltaHeightGR));
}
function getCustomWidgetRestrictions(items) {
    const customWidgetItems = items.filter((item) => isCustomWidgetBase(item.widget()));
    const heightLimit = customWidgetItems.reduce((minCustomWidgetHeight, item) => {
        var _a;
        const { xl: { gridHeight = INSIGHT_WIDGET_SIZE_INFO_DEFAULT.height.default }, } = (_a = item.size()) !== null && _a !== void 0 ? _a : { xl: {} };
        return Math.max(minCustomWidgetHeight, gridHeight);
    }, 0);
    return {
        allowHeightResize: customWidgetItems.length < items.length,
        heightLimit: customWidgetItems.length > 0 ? heightLimit : 0,
    };
}
//# sourceMappingURL=HeightResizerHotspot.js.map