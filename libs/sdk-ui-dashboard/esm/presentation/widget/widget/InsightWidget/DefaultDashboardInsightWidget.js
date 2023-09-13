// (C) 2020-2022 GoodData Corporation
import React, { useMemo, useCallback } from "react";
import cx from "classnames";
import { useIntl } from "react-intl";
import { insightVisualizationType, widgetTitle } from "@gooddata/sdk-model";
import { useDashboardSelector, isCustomWidget, useDashboardScheduledEmails, selectCanExportTabular, selectSettings, } from "../../../../model/index.js";
import { DashboardItem, DashboardItemHeadline, DashboardItemVisualization, getVisTypeCssClass, } from "../../../presentationComponents/index.js";
import { DashboardInsight } from "../../insight/index.js";
import { useInsightExport } from "../../common/index.js";
import { useDashboardComponentsContext } from "../../../dashboardContexts/index.js";
import { useInsightMenu } from "./useInsightMenu.js";
import { DashboardWidgetInsightGuard } from "./DashboardWidgetInsightGuard.js";
import { InsightWidgetDescriptionTrigger } from "../../description/InsightWidgetDescriptionTrigger.js";
export const DefaultDashboardInsightWidget = (props) => {
    return React.createElement(DashboardWidgetInsightGuard, Object.assign({}, props, { Component: DefaultDashboardInsightWidgetCore }));
};
/**
 * @internal
 */
const DefaultDashboardInsightWidgetCore = ({ widget, insight, screen, onError, onExportReady, onLoadingChanged, dashboardItemClasses }) => {
    const intl = useIntl();
    const visType = insightVisualizationType(insight);
    const { ref: widgetRef } = widget;
    const { exportCSVEnabled, exportXLSXEnabled, onExportCSV, onExportXLSX } = useInsightExport({
        widgetRef,
        title: widgetTitle(widget) || intl.formatMessage({ id: "export.defaultTitle" }),
        insight,
    });
    const { isScheduledEmailingVisible, enableInsightExportScheduling, onScheduleEmailingOpen } = useDashboardScheduledEmails();
    const canExportTabular = useDashboardSelector(selectCanExportTabular);
    const onScheduleExport = useCallback(() => {
        onScheduleEmailingOpen(widgetRef);
    }, [onScheduleEmailingOpen, widgetRef]);
    const scheduleExportEnabled = !isCustomWidget(widget);
    const { closeMenu, isMenuOpen, menuItems, openMenu } = useInsightMenu({
        insight,
        widget,
        exportCSVEnabled,
        exportXLSXEnabled,
        scheduleExportEnabled,
        onExportCSV,
        onExportXLSX,
        onScheduleExport,
        isScheduleExportVisible: isScheduledEmailingVisible && canExportTabular && enableInsightExportScheduling,
    });
    const { InsightMenuButtonComponentProvider, InsightMenuComponentProvider, ErrorComponent, LoadingComponent, } = useDashboardComponentsContext();
    const InsightMenuButtonComponent = useMemo(() => InsightMenuButtonComponentProvider(insight, widget), [InsightMenuButtonComponentProvider, insight, widget]);
    const InsightMenuComponent = useMemo(() => InsightMenuComponentProvider(insight, widget), [InsightMenuComponentProvider, insight, widget]);
    const settings = useDashboardSelector(selectSettings);
    return (React.createElement(DashboardItem, { className: cx(dashboardItemClasses, "type-visualization", "gd-dashboard-view-widget", getVisTypeCssClass(widget.type, visType)), screen: screen },
        React.createElement(DashboardItemVisualization, { renderHeadline: (clientHeight) => {
                var _a;
                return !((_a = widget.configuration) === null || _a === void 0 ? void 0 : _a.hideTitle) && (React.createElement(DashboardItemHeadline, { title: widget.title, clientHeight: clientHeight }));
            }, renderBeforeVisualization: () => (React.createElement("div", { className: "gd-absolute-row" },
                (settings === null || settings === void 0 ? void 0 : settings.enableDescriptions) ? (React.createElement(InsightWidgetDescriptionTrigger, { insight: insight, widget: widget, screen: screen })) : null,
                React.createElement(InsightMenuButtonComponent, { insight: insight, widget: widget, isOpen: isMenuOpen, onClick: openMenu, items: menuItems }))), renderAfterContent: () => {
                if (!isMenuOpen) {
                    return null;
                }
                return (React.createElement(InsightMenuComponent, { insight: insight, widget: widget, isOpen: isMenuOpen, onClose: closeMenu, items: menuItems }));
            } }, ({ clientHeight, clientWidth }) => (React.createElement(DashboardInsight, { clientHeight: clientHeight, clientWidth: clientWidth, insight: insight, widget: widget, onExportReady: onExportReady, onLoadingChanged: onLoadingChanged, onError: onError, ErrorComponent: ErrorComponent, LoadingComponent: LoadingComponent })))));
};
//# sourceMappingURL=DefaultDashboardInsightWidget.js.map