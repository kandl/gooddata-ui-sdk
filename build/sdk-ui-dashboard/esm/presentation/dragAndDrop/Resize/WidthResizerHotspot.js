import React, { useEffect, useMemo, useState } from "react";
import { useDashboardDrag } from "../useDashboardDrag.js";
import { resizeWidth, selectInsightsMap, useDashboardDispatch, useDashboardSelector, } from "../../../model/index.js";
import { getMinWidth } from "../../../_staging/layout/sizing.js";
import { getDashboardLayoutItemMaxGridWidth } from "../../layout/DefaultDashboardLayoutRenderer/utils/sizing.js";
import { getSizeAndXCoords } from "../DragLayerPreview/WidthResizerDragPreview.js";
import { useResizeHandlers, useResizeWidthItemStatus } from "../LayoutResizeContext.js";
import { WidthResizer } from "./WidthResizer.js";
export function WidthResizerHotspot({ item, screen, getGridColumnWidth, getGridColumnHeightInPx, getLayoutDimensions, }) {
    const dispatch = useDashboardDispatch();
    const insightsMap = useDashboardSelector(selectInsightsMap);
    const { resizeStart, resizeEnd, getScrollCorrection } = useResizeHandlers();
    const widget = useMemo(() => item.widget(), [item]);
    const widgetIdentifier = widget.identifier;
    const { isWidthResizing, isActive } = useResizeWidthItemStatus(widgetIdentifier);
    const [isResizerVisible, setResizerVisibility] = useState(false);
    const onMouseEnter = () => setResizerVisibility(true);
    const onMouseLeave = () => setResizerVisibility(false);
    const sectionIndex = item.section().index();
    const itemIndex = item.index();
    const currentWidth = item.sizeForScreen(screen).gridWidth;
    const minLimit = getMinWidth(widget, insightsMap);
    const maxLimit = getDashboardLayoutItemMaxGridWidth(item, "xl");
    const [{ isDragging }, dragRef] = useDashboardDrag({
        dragItem: () => {
            const initialLayoutDimensions = getLayoutDimensions();
            return {
                type: "internal-width-resizer",
                sectionIndex,
                itemIndex,
                gridColumnHeightInPx: getGridColumnHeightInPx(),
                gridColumnWidth: getGridColumnWidth(),
                initialLayoutDimensions,
                currentWidth,
                minLimit,
                maxLimit,
            };
        },
        dragEnd: (dragItem, monitor) => {
            const scrollCorrection = getScrollCorrection();
            const { limitedSize } = getSizeAndXCoords(dragItem, monitor.getInitialClientOffset().x, monitor.getDifferenceFromInitialOffset().x, scrollCorrection.x);
            dispatch(resizeWidth(sectionIndex, itemIndex, limitedSize));
            setResizerVisibility(false);
        },
    }, [widget, insightsMap, sectionIndex, itemIndex, currentWidth, minLimit, maxLimit]);
    useEffect(() => {
        if (isDragging) {
            resizeStart("width", [widgetIdentifier], getLayoutDimensions);
        }
        else {
            resizeEnd();
        }
    }, [isDragging]);
    const isThisResizing = isWidthResizing && isActive;
    const showHotspot = !isDragging || isWidthResizing || isResizerVisible;
    const showResizer = isResizerVisible || isThisResizing;
    const status = isDragging ? "muted" : "active";
    if (!showHotspot) {
        return null;
    }
    return (React.createElement("div", { className: "dash-width-resizer-container" },
        React.createElement("div", { className: "s-dash-width-resizer-hotspot dash-width-resizer-hotspot", onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, ref: dragRef }, showResizer ? React.createElement(WidthResizer, { status: status }) : null)));
}
//# sourceMappingURL=WidthResizerHotspot.js.map