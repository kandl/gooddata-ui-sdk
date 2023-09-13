// (C) 2019-2022 GoodData Corporation
import React, { useCallback } from "react";
import { insightVisualizationType, objRefToString, widgetRef } from "@gooddata/sdk-model";
import { stringUtils } from "@gooddata/util";
import cx from "classnames";
import { useIntl } from "react-intl";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { selectCanExportTabular, selectSettings, useDashboardSelector } from "../../../../../model/index.js";
const nonExportableVisTypes = ["headline", "xirr"];
function isExportableVisualization(visType) {
    return !nonExportableVisTypes.includes(visType);
}
const bubbleAlignPoints = [{ align: "tc bc" }, { align: "tc br" }];
export const LegacyInsightMenuButton = ({ onClick, widget, insight, isOpen, }) => {
    const intl = useIntl();
    const onOptionsMenuClick = useCallback(() => {
        onClick();
    }, [onClick]);
    const settings = useDashboardSelector(selectSettings);
    const canExportTabular = useDashboardSelector(selectCanExportTabular);
    const areExportsEnabled = settings.enableKPIDashboardExport;
    const hasExportReportPermissions = canExportTabular;
    const visType = insightVisualizationType(insight);
    const isExportableVisType = isExportableVisualization(visType);
    const canExportWidget = areExportsEnabled && hasExportReportPermissions && isExportableVisType;
    if (!canExportWidget) {
        return null;
    }
    const widgetRefValue = widgetRef(widget);
    const objRefAsString = widgetRefValue ? objRefToString(widgetRefValue) : "";
    const optionsIconClasses = cx("dash-item-action-options", "s-dash-item-action-options", `dash-item-action-options-${stringUtils.simplifyText(objRefAsString)}`, `s-dash-item-action-options-${stringUtils.simplifyText(objRefAsString)}`, "gd-icon-download", {
        "dash-item-action-options-active": isOpen,
    });
    return (React.createElement("div", { className: "dash-item-action-placeholder s-dash-item-action-placeholder", onClick: onOptionsMenuClick },
        React.createElement(BubbleHoverTrigger, { className: optionsIconClasses, showDelay: 500, hideDelay: 0, tagName: "div" },
            React.createElement(Bubble, { className: "bubble-primary", alignPoints: bubbleAlignPoints },
                React.createElement("span", null, intl.formatMessage({ id: "options.button.bubble" }))))));
};
//# sourceMappingURL=LegacyInsightMenuButton.js.map