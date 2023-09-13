import cx from "classnames";
import React, { useMemo } from "react";
import { Col } from "react-grid-system";
import { selectDraggingWidgetTarget, useDashboardDispatch, useDashboardSelector, } from "../../../model/index.js";
import { WidgetDropZone } from "./WidgetDropZone.js";
import { useDashboardDrop } from "../useDashboardDrop.js";
import { useInsightListItemDropHandler } from "./useInsightListItemDropHandler.js";
import { useInsightPlaceholderDropHandler } from "./useInsightPlaceholderDropHandler.js";
import { useKpiPlaceholderDropHandler } from "./useKpiPlaceholderDropHandler.js";
import { useMoveWidgetDropHandler } from "./useMoveWidgetHandler.js";
import { getDashboardLayoutItemHeightForGrid } from "../../../_staging/layout/sizing.js";
import { isInsightDraggableItem, isInsightDraggableListItem, isInsightPlaceholderDraggableItem, isKpiDraggableItem, isKpiPlaceholderDraggableItem, } from "../types.js";
export const WidgetDropZoneColumn = (props) => {
    const { sectionIndex, itemIndex, isLastInSection = false } = props;
    const dropzoneCoordinates = useDashboardSelector(selectDraggingWidgetTarget);
    const handleInsightListItemDrop = useInsightListItemDropHandler(sectionIndex, itemIndex);
    const handleInsightPlaceholderDrop = useInsightPlaceholderDropHandler(sectionIndex, itemIndex);
    const handleKpiPlaceholderDrop = useKpiPlaceholderDropHandler(sectionIndex, itemIndex);
    const handleWidgetDrop = useMoveWidgetDropHandler(sectionIndex, itemIndex);
    const dispatch = useDashboardDispatch();
    const [collectedProps, dropRef] = useDashboardDrop(["insightListItem", "kpi-placeholder", "insight-placeholder", "kpi", "insight"], {
        drop: (item) => {
            if (isInsightDraggableListItem(item)) {
                handleInsightListItemDrop(item.insight);
            }
            if (isKpiPlaceholderDraggableItem(item)) {
                handleKpiPlaceholderDrop();
            }
            if (isInsightPlaceholderDraggableItem(item)) {
                handleInsightPlaceholderDrop();
            }
            if (isInsightDraggableItem(item) || isKpiDraggableItem(item)) {
                handleWidgetDrop(item);
            }
        },
    }, [dispatch, handleInsightListItemDrop, handleInsightPlaceholderDrop, handleKpiPlaceholderDrop]);
    const showDropZone = useMemo(() => (dropzoneCoordinates === null || dropzoneCoordinates === void 0 ? void 0 : dropzoneCoordinates.sectionIndex) === sectionIndex &&
        (dropzoneCoordinates === null || dropzoneCoordinates === void 0 ? void 0 : dropzoneCoordinates.itemIndex) === itemIndex, [dropzoneCoordinates === null || dropzoneCoordinates === void 0 ? void 0 : dropzoneCoordinates.itemIndex, dropzoneCoordinates === null || dropzoneCoordinates === void 0 ? void 0 : dropzoneCoordinates.sectionIndex, itemIndex, sectionIndex]);
    if (!showDropZone) {
        return null;
    }
    const size = collectedProps.item.size;
    return (React.createElement(Col, { xl: size.gridWidth, lg: size.gridWidth, md: size.gridWidth, sm: size.gridWidth, xs: size.gridWidth, className: cx("gd-fluidlayout-column", "gd-fluidlayout-column-dropzone", "s-fluid-layout-column"), style: {
            minHeight: getDashboardLayoutItemHeightForGrid(size.gridHeight),
        } },
        React.createElement(WidgetDropZone, { isLastInSection: isLastInSection, sectionIndex: sectionIndex, itemIndex: itemIndex, dropRef: dropRef })));
};
//# sourceMappingURL=WidgetDropZoneColumn.js.map