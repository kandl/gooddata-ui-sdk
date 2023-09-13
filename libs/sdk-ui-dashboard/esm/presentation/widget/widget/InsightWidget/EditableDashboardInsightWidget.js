// (C) 2020-2022 GoodData Corporation
import React, { useMemo } from "react";
import cx from "classnames";
import { insightVisualizationType, widgetRef } from "@gooddata/sdk-model";
import { DashboardItem, DashboardItemVisualization, getVisTypeCssClass, } from "../../../presentationComponents/index.js";
import { DashboardInsight } from "../../insight/index.js";
import { useDashboardComponentsContext } from "../../../dashboardContexts/index.js";
import { selectIsDashboardSaving, useDashboardSelector, useWidgetSelection, } from "../../../../model/index.js";
import { useEditableInsightMenu } from "./useEditableInsightMenu.js";
import { DashboardWidgetInsightGuard } from "./DashboardWidgetInsightGuard.js";
import { EditableDashboardInsightWidgetHeader } from "./EditableDashboardInsightWidgetHeader.js";
export const EditableDashboardInsightWidget = (props) => {
    return React.createElement(DashboardWidgetInsightGuard, Object.assign({}, props, { Component: EditableDashboardInsightWidgetCore }));
};
/**
 * @internal
 */
const EditableDashboardInsightWidgetCore = ({ widget, insight, screen, onError, onExportReady, onLoadingChanged, dashboardItemClasses }) => {
    const visType = insightVisualizationType(insight);
    const { isSelectable, isSelected, onSelected, closeConfigPanel, hasConfigPanelOpen } = useWidgetSelection(widgetRef(widget));
    const { menuItems } = useEditableInsightMenu({ closeMenu: closeConfigPanel, insight, widget });
    const { InsightMenuComponentProvider, ErrorComponent, LoadingComponent } = useDashboardComponentsContext();
    const InsightMenuComponent = useMemo(() => InsightMenuComponentProvider(insight, widget), [InsightMenuComponentProvider, insight, widget]);
    const isSaving = useDashboardSelector(selectIsDashboardSaving);
    const isEditable = !isSaving;
    return (React.createElement(DashboardItem, { className: cx(dashboardItemClasses, "type-visualization", "gd-dashboard-view-widget", "is-edit-mode", getVisTypeCssClass(widget.type, visType), { "is-selected": isSelected }), screen: screen },
        React.createElement(DashboardItemVisualization, { isSelectable: isSelectable, isSelected: isSelected, onSelected: onSelected, renderHeadline: (clientHeight) => {
                var _a;
                return !((_a = widget.configuration) === null || _a === void 0 ? void 0 : _a.hideTitle) && (React.createElement(EditableDashboardInsightWidgetHeader, { clientHeight: clientHeight, widget: widget, insight: insight }));
            }, renderAfterContent: () => {
                return (React.createElement(React.Fragment, null,
                    !!isSelected && (React.createElement("div", { className: "dash-item-action dash-item-action-lw-options", onClick: onSelected })),
                    !!hasConfigPanelOpen && (React.createElement(InsightMenuComponent, { insight: insight, widget: widget, isOpen: hasConfigPanelOpen, onClose: closeConfigPanel, items: menuItems }))));
            }, contentClassName: cx({ "is-editable": isEditable }), visualizationClassName: cx({ "is-editable": isEditable }) }, ({ clientHeight, clientWidth }) => (React.createElement(DashboardInsight, { clientHeight: clientHeight, clientWidth: clientWidth, insight: insight, widget: widget, onExportReady: onExportReady, onLoadingChanged: onLoadingChanged, onError: onError, ErrorComponent: ErrorComponent, LoadingComponent: LoadingComponent })))));
};
//# sourceMappingURL=EditableDashboardInsightWidget.js.map