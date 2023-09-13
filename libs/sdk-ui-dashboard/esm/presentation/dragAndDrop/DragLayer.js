// (C) 2022 GoodData Corporation
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useDragLayer } from "react-dnd";
import { ContentDragPreview } from "./DragLayerPreview/ContentDragPreview.js";
import { HeightResizerDragPreview } from "./DragLayerPreview/HeightResizerDragPreview.js";
import { WidthResizerDragPreview } from "./DragLayerPreview/WidthResizerDragPreview.js";
import { useScrollCorrection } from "./Resize/useScrollCorrection.js";
import { isDraggableInternalItemType } from "./types.js";
import { emptyDOMRect } from "../layout/constants.js";
import { useResizeHandlers } from "./LayoutResizeContext.js";
import { DASHBOARD_HEADER_OVERLAYS_Z_INDEX } from "../constants/index.js";
const previewComponentsMap = {
    "internal-height-resizer": HeightResizerDragPreview,
    "internal-width-resizer": WidthResizerDragPreview,
};
export const DragLayerComponent = () => {
    const dragLayerRef = useRef(null);
    const { setScrollCorrection } = useResizeHandlers();
    const dragLayerProperties = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        clientOffset: monitor.getClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
        isDragging: monitor.isDragging(),
    }));
    const { itemType, isDragging } = dragLayerProperties;
    const getDragLayerPosition = useCallback(() => {
        var _a, _b;
        return (_b = (_a = dragLayerRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) !== null && _b !== void 0 ? _b : emptyDOMRect;
    }, [dragLayerRef.current]);
    const isResizing = itemType === "internal-height-resizer" || itemType === "internal-width-resizer";
    const { scrollCorrection } = useScrollCorrection(getDragLayerPosition, isDragging && isResizing);
    useEffect(() => {
        setScrollCorrection(scrollCorrection);
    }, [scrollCorrection, setScrollCorrection]);
    const layerStyles = useMemo(() => {
        const position = isResizing ? "relative" : "fixed";
        return {
            position,
            pointerEvents: "none",
            zIndex: DASHBOARD_HEADER_OVERLAYS_Z_INDEX + 1,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
        };
    }, [isResizing]);
    if (!isDragging) {
        return null;
    }
    const Component = isDraggableInternalItemType(itemType)
        ? previewComponentsMap[itemType]
        : ContentDragPreview;
    const previewProps = isDraggableInternalItemType(itemType)
        ? Object.assign(Object.assign({}, dragLayerProperties), { getDragLayerPosition, scrollCorrection }) : dragLayerProperties;
    return (React.createElement("div", { className: "drag-layer", style: layerStyles, ref: dragLayerRef },
        React.createElement(Component, Object.assign({}, previewProps))));
};
//# sourceMappingURL=DragLayer.js.map