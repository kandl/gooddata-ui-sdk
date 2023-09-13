import cx from "classnames";
import React from "react";
import { selectIsInEditMode, useDashboardSelector } from "../../../model/index.js";
import { getLayoutCoordinates } from "../../../_staging/layout/coordinates.js";
import { Hotspot } from "./Hotspot.js";
import { WidgetDropZoneColumn } from "./WidgetDropZoneColumn.js";
export const RowEndHotspot = (props) => {
    const { item, screen } = props;
    const isInEditMode = useDashboardSelector(selectIsInEditMode);
    const { sectionIndex, itemIndex } = getLayoutCoordinates(item);
    const isLastInSection = item.isLast();
    const showEndingHotspot = isLastInSection && isInEditMode;
    if (!showEndingHotspot) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(WidgetDropZoneColumn, { screen: screen, sectionIndex: sectionIndex, itemIndex: itemIndex + 1, isLastInSection: true }),
        React.createElement("div", { className: cx("gd-fluidlayout-column", "gd-fluidlayout-column-row-end-hotspot", "s-fluid-layout-column", `s-fluid-layout-screen-${screen}`) },
            React.createElement(Hotspot, { dropZoneType: "next", isEndingHotspot: true, itemIndex: itemIndex, sectionIndex: sectionIndex, isLastInSection: item.isLast() }))));
};
//# sourceMappingURL=RowEndHotspot.js.map