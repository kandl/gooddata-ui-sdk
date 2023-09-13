// (C) 2022-2023 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { Typography } from "@gooddata/sdk-ui-kit";
import { Col } from "react-grid-system";
import { useDashboardDrop } from "../useDashboardDrop.js";
import { isInsightDraggableListItem, isInsightPlaceholderDraggableItem, isKpiPlaceholderDraggableItem, } from "../types.js";
import { useDashboardDispatch, useDashboardSelector, selectWidgetPlaceholder } from "../../../model/index.js";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
import { useNewSectionInsightListItemDropHandler } from "./useNewSectionInsightListItemDropHandler.js";
import { useNewSectionKpiPlaceholderDropHandler } from "./useNewSectionKpiPlaceholderDropHandler.js";
import { useNewSectionInsightPlaceholderDropHandler } from "./useNewSectionInsightPlaceholderDropHandler.js";
import { getDashboardLayoutItemHeightForGrid } from "../../../_staging/layout/sizing.js";
const widgetCategoryMapping = {
    "insight-placeholder": "insight",
    insightListItem: "visualization",
    "kpi-placeholder": "kpi",
};
export const EmptyDashboardDropZone = () => {
    const dispatch = useDashboardDispatch();
    const widgetPlaceholder = useDashboardSelector(selectWidgetPlaceholder);
    const { EmptyLayoutDropZoneBodyComponent } = useDashboardComponentsContext();
    const handleInsightListItemDrop = useNewSectionInsightListItemDropHandler(0);
    const handleKpiPlaceholderDrop = useNewSectionKpiPlaceholderDropHandler(0);
    const handleInsightPlaceholderDrop = useNewSectionInsightPlaceholderDropHandler(0);
    const [{ canDrop, isOver, itemType, item }, dropRef] = useDashboardDrop(["insightListItem", "kpi-placeholder", "insight-placeholder"], {
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
        },
    }, [
        dispatch,
        widgetPlaceholder,
        handleInsightListItemDrop,
        handleKpiPlaceholderDrop,
        handleInsightPlaceholderDrop,
    ]);
    const { gridWidth = 12, gridHeight } = (item === null || item === void 0 ? void 0 : item.size) || {};
    const message = React.createElement(FormattedMessage, { id: "newDashboard.dropInsight" });
    const widgetCategory = widgetCategoryMapping[itemType];
    return (React.createElement(Col, { xl: gridWidth, lg: gridWidth, md: gridWidth, sm: gridWidth, xs: gridWidth, style: {
            minHeight: gridHeight ? getDashboardLayoutItemHeightForGrid(gridHeight) : undefined,
        }, className: cx("drag-info-placeholder", "dash-item", {
            [`type-${widgetCategory}`]: !!widgetCategory,
            "type-none": !widgetCategory,
            "s-last-drop-position": canDrop,
        }) },
        React.createElement("div", { className: cx("drag-info-placeholder-inner", { "can-drop": canDrop, "is-over": isOver }), ref: dropRef },
            React.createElement(EmptyLayoutDropZoneBodyComponent, null),
            React.createElement("div", { className: "drag-info-placeholder-drop-target s-drag-info-placeholder-drop-target" },
                React.createElement("div", { className: "drop-target-inner" },
                    React.createElement(Typography, { tagName: "p", className: "drop-target-message kpi-drop-target" }, message),
                    React.createElement(Typography, { tagName: "p", className: "drop-target-message visualization-drop-target" }, message))))));
};
//# sourceMappingURL=EmptyDashboardDropZone.js.map