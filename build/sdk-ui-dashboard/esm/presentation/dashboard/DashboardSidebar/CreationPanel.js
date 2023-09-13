// (C) 2007-2022 GoodData Corporation
import React, { useMemo } from "react";
import { Typography } from "@gooddata/sdk-ui-kit";
import compact from "lodash/compact.js";
import sortBy from "lodash/sortBy.js";
import { FormattedMessage } from "react-intl";
import { DraggableInsightList } from "./DraggableInsightList/index.js";
import { selectSupportsKpiWidgetCapability, selectIsAnalyticalDesignerEnabled, useDashboardSelector, selectIsNewDashboard, selectSettings, } from "../../../model/index.js";
import cx from "classnames";
export const CreationPanel = (props) => {
    const { className, WrapCreatePanelItemWithDragComponent, WrapInsightListItemWithDragComponent } = props;
    const supportsKpis = useDashboardSelector(selectSupportsKpiWidgetCapability);
    const isAnalyticalDesignerEnabled = useDashboardSelector(selectIsAnalyticalDesignerEnabled);
    const isNewDashboard = useDashboardSelector(selectIsNewDashboard);
    const settings = useDashboardSelector(selectSettings);
    const KpiWidgetComponentSet = props.KpiWidgetComponentSet;
    const AttributeFilterComponentSet = props.AttributeFilterComponentSet;
    const InsightWidgetComponentSet = props.InsightWidgetComponentSet;
    const addItemPanelItems = useMemo(() => {
        const items = compact([
            supportsKpis && KpiWidgetComponentSet.creating,
            AttributeFilterComponentSet.creating,
            InsightWidgetComponentSet.creating,
        ]);
        return sortBy(items, (item) => { var _a; return (_a = item.priority) !== null && _a !== void 0 ? _a : 0; }).map(({ CreatePanelListItemComponent, type }) => {
            return (React.createElement(CreatePanelListItemComponent, { key: type, WrapCreatePanelItemWithDragComponent: WrapCreatePanelItemWithDragComponent }));
        });
    }, [AttributeFilterComponentSet, KpiWidgetComponentSet, InsightWidgetComponentSet, supportsKpis]);
    return (React.createElement("div", { className: cx("configuration-panel creation-panel", className) },
        React.createElement("div", { className: "configuration-panel-content" },
            React.createElement(Typography, { tagName: "h2", className: "flex-panel-item-nostretch" },
                React.createElement(FormattedMessage, { id: "visualizationsList.dragToAdd" })),
            React.createElement("div", { className: "configuration-category drag-to-add" },
                React.createElement(Typography, { tagName: "h3" },
                    React.createElement(FormattedMessage, { id: "addPanel.newItem" })),
                React.createElement("div", { className: "add-item-panel" }, addItemPanelItems)),
            isAnalyticalDesignerEnabled ? (React.createElement("div", { className: "configuration-category configuration-category-vis drag-to-add flex-panel-item-stretch" },
                React.createElement(Typography, { tagName: "h3" },
                    React.createElement(FormattedMessage, { id: "visualizationsList.savedVisualizations" })),
                React.createElement(DraggableInsightList, { WrapInsightListItemWithDragComponent: WrapInsightListItemWithDragComponent, recalculateSizeReference: className, searchAutofocus: !isNewDashboard, enableDescriptions: settings === null || settings === void 0 ? void 0 : settings.enableDescriptions }))) : null)));
};
//# sourceMappingURL=CreationPanel.js.map