// (C) 2022-2023 GoodData Corporation
import React from "react";
import { useDashboardSelector, useDashboardDispatch, selectWidgetsOverlayState, selectSectionModification, uiActions, } from "../../../model/index.js";
import { getRefsForSection } from "../refs.js";
import { DashboardItemOverlay } from "./DashboardItemOverlay.js";
export const DashboardLayoutSectionOverlayController = (props) => {
    const { section } = props;
    const dispatch = useDashboardDispatch();
    const refs = getRefsForSection(section);
    const overlayShow = useDashboardSelector(selectWidgetsOverlayState(refs));
    const sectionModifications = useDashboardSelector(selectSectionModification(refs));
    return (React.createElement(DashboardItemOverlay, { type: "column", onHide: () => dispatch(uiActions.toggleWidgetsOverlay({
            refs: section.items().map((item) => item.ref()),
            visible: false,
        })), render: overlayShow, modifications: sectionModifications }));
};
//# sourceMappingURL=DashboardItemOverlayController.js.map