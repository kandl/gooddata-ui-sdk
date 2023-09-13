// (C) 2022-2023 GoodData Corporation
import React from "react";
import { isInsightWidget, objRefToString } from "@gooddata/sdk-model";
import { ScrollablePanel, OverlayController, OverlayControllerProvider } from "@gooddata/sdk-ui-kit";
import { stringUtils } from "@gooddata/util";
import cx from "classnames";
import { DASHBOARD_HEADER_OVERLAYS_Z_INDEX } from "../../../constants/index.js";
import { InsightDrillConfigPanel } from "./InsightDrillConfigPanel/InsightDrillConfigPanel.js";
const overlayController = OverlayController.getInstance(DASHBOARD_HEADER_OVERLAYS_Z_INDEX);
export const InsightInteractions = ({ widget }) => {
    const widgetRefSuffix = isInsightWidget(widget)
        ? stringUtils.simplifyText(objRefToString(widget.ref))
        : "";
    const classes = cx("configuration-scrollable-panel", "s-configuration-scrollable-panel", `s-visualization-${widgetRefSuffix}`);
    return (React.createElement(ScrollablePanel, { className: classes },
        React.createElement(OverlayControllerProvider, { overlayController: overlayController },
            React.createElement(InsightDrillConfigPanel, { widgetRef: widget.ref }))));
};
export function createInsightInteractionsScreen(widget) {
    return React.createElement(InsightInteractions, { widget: widget });
}
//# sourceMappingURL=InsightInteractions.js.map