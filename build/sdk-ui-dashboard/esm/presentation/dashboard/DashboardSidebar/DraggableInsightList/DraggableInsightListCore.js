import { __rest } from "tslib";
// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { insightIsLocked, insightTitle, insightSummary, insightUpdated, insightVisualizationType, insightCreated, } from "@gooddata/sdk-model";
import { InsightListItem } from "@gooddata/sdk-ui-kit";
import { InsightList } from "../../../insightList/index.js";
import { useDashboardUserInteraction, useDashboardSelector, selectSettings, } from "../../../../model/index.js";
import { DraggableInsightListItemWrapper } from "./DraggableInsightListItemWrapper.js";
export const DraggableInsightListCore = (props) => {
    const { enableDescriptions, WrapInsightListItemWithDragComponent } = props, remainingProps = __rest(props, ["enableDescriptions", "WrapInsightListItemWithDragComponent"]);
    const userInteraction = useDashboardUserInteraction();
    const settings = useDashboardSelector(selectSettings);
    return (React.createElement(InsightList, Object.assign({}, remainingProps, { renderItem: ({ item: insight, width, isFirst, isLast }) => {
            var _a, _b;
            if (!insight) {
                return React.createElement(InsightListItem, { isLoading: true });
            }
            const visualizationType = insightVisualizationType(insight);
            const classNames = cx("gd-visualizations-list-item-wrap", {
                "is-first": isFirst,
                "is-last": isLast,
            });
            const description = (_a = insightSummary(insight)) === null || _a === void 0 ? void 0 : _a.trim();
            const eventPayload = {
                from: "insight",
                type: "inherit",
                description,
            };
            return (React.createElement(DraggableInsightListItemWrapper, { WrapInsightListItemWithDragComponent: WrapInsightListItemWithDragComponent, title: insightTitle(insight), description: description, showDescriptionPanel: enableDescriptions, type: visualizationType, width: width, className: classNames, updated: (_b = insightUpdated(insight)) !== null && _b !== void 0 ? _b : insightCreated(insight), isLocked: insightIsLocked(insight), insight: insight, onDescriptionPanelOpen: () => {
                    userInteraction.descriptionTooltipOpened(eventPayload);
                }, metadataTimeZone: settings === null || settings === void 0 ? void 0 : settings.metadataTimeZone }));
        } })));
};
//# sourceMappingURL=DraggableInsightListCore.js.map