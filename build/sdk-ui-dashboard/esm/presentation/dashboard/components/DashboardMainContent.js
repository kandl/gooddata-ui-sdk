// (C) 2022 GoodData Corporation
import React, { forwardRef, useEffect } from "react";
import { useDispatchDashboardCommand, changeFilterContextSelection, useWidgetSelection, } from "../../../model/index.js";
import { useDashboardDrop, useWidgetDragHoverHandlers } from "../../dragAndDrop/index.js";
import { DashboardLayout } from "../../layout/index.js";
import { DateFilterConfigWarnings } from "./DateFilterConfigWarnings.js";
export const DashboardMainContent = forwardRef(function DashboardMainContent(_, ref) {
    const onFiltersChange = useDispatchDashboardCommand(changeFilterContextSelection);
    const { deselectWidgets } = useWidgetSelection();
    const { handleDragHoverEnd } = useWidgetDragHoverHandlers();
    const [{ isOver }, dropRef] = useDashboardDrop(["insight", "insight-placeholder", "insightListItem", "kpi", "kpi-placeholder"], {});
    useEffect(() => {
        if (!isOver) {
            handleDragHoverEnd();
        }
    }, [handleDragHoverEnd, isOver]);
    return (React.createElement("div", { className: "gd-flex-item-stretch dash-section dash-section-kpis", ref: ref },
        React.createElement("div", { className: "gd-flex-container root-flex-maincontent", ref: dropRef, onClick: deselectWidgets },
            React.createElement(DateFilterConfigWarnings, null),
            React.createElement(DashboardLayout, { onFiltersChange: onFiltersChange }))));
});
//# sourceMappingURL=DashboardMainContent.js.map