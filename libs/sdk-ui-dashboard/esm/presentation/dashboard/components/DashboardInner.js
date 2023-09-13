// (C) 2022 GoodData Corporation
import React, { useRef } from "react";
import cx from "classnames";
import { IntlWrapper } from "../../localization/index.js";
import { useDashboardSelector, selectLocale, selectIsInEditMode } from "../../../model/index.js";
import { DashboardHeader } from "../DashboardHeader/DashboardHeader.js";
import { DashboardMainContent } from "./DashboardMainContent.js";
import { DashboardSidebar } from "../DashboardSidebar/DashboardSidebar.js";
import { RenderModeAwareDashboardSidebar } from "../DashboardSidebar/RenderModeAwareDashboardSidebar.js";
import { DragLayerComponent, useDashboardDragScroll, DeleteDropZone, WrapCreatePanelItemWithDrag, WrapInsightListItemWithDrag, } from "../../dragAndDrop/index.js";
import { Toolbar } from "../../toolbar/index.js";
import { OverlayController, OverlayControllerProvider } from "@gooddata/sdk-ui-kit";
import { DASHBOARD_HEADER_OVERLAYS_Z_INDEX } from "../../constants/index.js";
const overlayController = OverlayController.getInstance(DASHBOARD_HEADER_OVERLAYS_Z_INDEX);
export const DashboardInner = () => {
    const locale = useDashboardSelector(selectLocale);
    const isEditMode = useDashboardSelector(selectIsInEditMode);
    const headerRef = useRef(null);
    const layoutRef = useRef(null);
    const bottomRef = useRef(null);
    useDashboardDragScroll(layoutRef, headerRef, bottomRef);
    return (React.createElement(IntlWrapper, { locale: locale },
        React.createElement("div", { className: cx("component-root", {
                "sdk-edit-mode-on": isEditMode,
            }) },
            React.createElement(DragLayerComponent, null),
            React.createElement("div", { className: "gd-dashboards-root gd-flex-container" },
                React.createElement(DashboardSidebar, { DefaultSidebar: RenderModeAwareDashboardSidebar, DeleteDropZoneComponent: DeleteDropZone, WrapCreatePanelItemWithDragComponent: WrapCreatePanelItemWithDrag, WrapInsightListItemWithDragComponent: WrapInsightListItemWithDrag }),
                React.createElement("div", { className: "gd-dash-content" },
                    React.createElement("div", { className: "gd-dash-header-wrapper gd-dash-header-wrapper-sdk-8-12", ref: headerRef },
                        React.createElement(OverlayControllerProvider, { overlayController: overlayController },
                            React.createElement(DashboardHeader, null))),
                    React.createElement(DashboardMainContent, { ref: layoutRef }),
                    React.createElement("div", { className: "gd-dash-bottom-position-pixel", ref: bottomRef }))),
            React.createElement(Toolbar, null))));
};
//# sourceMappingURL=DashboardInner.js.map