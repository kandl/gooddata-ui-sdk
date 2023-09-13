// (C) 2019-2022 GoodData Corporation
import React, { useEffect } from "react";
import { WidthResizer } from "../Resize/WidthResizer.js";
import { applySizeLimitation } from "./sizeLimiting.js";
import { useResizeHandlers } from "../LayoutResizeContext.js";
export function WidthResizerDragPreview(props) {
    const { setWidthState } = useResizeHandlers();
    const { item, differenceFromInitialOffset, initialOffset, scrollCorrection, getDragLayerPosition } = props;
    const { gridColumnHeightInPx } = item;
    const sizeAndCoords = getSizeAndXCoords(item, initialOffset.x, differenceFromInitialOffset.x, scrollCorrection.x);
    const style = getWidthResizerStyle({
        gridColumnHeightInPx,
        initialOffset,
        limitedX: sizeAndCoords.limitedX,
        dragLayerOffset: getDragLayerPosition(),
        scrollCorrection,
    });
    useEffect(() => {
        setWidthState({
            initialIndex: sizeAndCoords.initialIndex,
            currentIndex: sizeAndCoords.currentIndex,
            limitReached: sizeAndCoords.limitReached,
        });
    }, [
        sizeAndCoords.initialIndex,
        sizeAndCoords.currentIndex,
        sizeAndCoords.isLimited,
        sizeAndCoords.limitReached,
        setWidthState,
    ]);
    return (React.createElement("div", { className: "s-resizer-drag-preview resizer-drag-preview", style: style },
        React.createElement(WidthResizer, { status: "active" })));
}
export function getSizeAndXCoords(item, initialSourceClientOffsetX, differenceFromInitialOffsetX, scrollCorrectionX) {
    const { minLimit, maxLimit, currentWidth, initialLayoutDimensions, gridColumnWidth } = item;
    const deltaSize = getDiffInGridColumns(differenceFromInitialOffsetX - scrollCorrectionX, gridColumnWidth);
    const sizeLimitation = applySizeLimitation(minLimit, maxLimit, currentWidth, deltaSize);
    const deltaSizeLimited = sizeLimitation.limitedSize - currentWidth;
    const deltaXLimited = deltaSizeLimited * gridColumnWidth;
    const deltaXUnlimited = deltaSize * gridColumnWidth;
    const initialIndex = Math.round((initialSourceClientOffsetX - initialLayoutDimensions.left) / gridColumnWidth);
    const currentIndex = initialIndex + deltaSizeLimited;
    return Object.assign(Object.assign({}, sizeLimitation), { limitedX: initialSourceClientOffsetX + deltaXLimited, unlimitedX: initialSourceClientOffsetX + deltaXUnlimited, initialIndex,
        currentIndex });
}
export function getDiffInGridColumns(pxDiffX, gridColumnWidth) {
    return Math.round(pxDiffX / gridColumnWidth);
}
function getWidthResizerStyle({ initialOffset, limitedX, gridColumnHeightInPx, dragLayerOffset, scrollCorrection, }) {
    return {
        position: "absolute",
        top: `${initialOffset.y - dragLayerOffset.y + scrollCorrection.y}px`,
        left: `${limitedX - dragLayerOffset.x + scrollCorrection.x}px`,
        height: `${gridColumnHeightInPx}px`,
    };
}
//# sourceMappingURL=WidthResizerDragPreview.js.map