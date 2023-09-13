// (C) 2022 GoodData Corporation
import React from "react";
import { insightIsLocked, insightTitle, insightUpdated, insightVisualizationType, insightCreated, } from "@gooddata/sdk-model";
import { DraggableInsightListItemBody } from "../../dashboard/DashboardSidebar/DraggableInsightList/index.js";
/*
 * @internal
 */
export function InsightDraggingComponent({ item }) {
    var _a;
    const insight = item.insight;
    const visualizationType = insightVisualizationType(insight);
    return (React.createElement(DraggableInsightListItemBody, { className: "move-insight-placeholder", type: visualizationType, title: insightTitle(insight), updated: (_a = insightUpdated(insight)) !== null && _a !== void 0 ? _a : insightCreated(insight), isLocked: insightIsLocked(insight) }));
}
//# sourceMappingURL=InsightDraggingComponent.js.map