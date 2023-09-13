// (C) 2019-2023 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography } from "@gooddata/sdk-ui-kit";
import { useInsightDrillConfigPanel } from "./useInsightDrillConfigPanel.js";
import { InsightDrillConfigList } from "../InsightDrillConfigList.js";
import { DrillOriginSelector } from "../DrillOriginSelector/DrillOriginSelector.js";
import { ZoomInsightConfiguration } from "../ZoomInsightConfiguration.js";
/**
 * @internal
 */
export const InsightDrillConfigPanel = ({ widgetRef }) => {
    const { widget, enableKDZooming, drillConfigItems, originSelectorItems, isOriginSelectorVisible, isLoaded, onChangeItem, onOriginSelect, onSetupItem, onDeleteItem, } = useInsightDrillConfigPanel({ widgetRef });
    return (React.createElement(React.Fragment, null,
        !!enableKDZooming && React.createElement(ZoomInsightConfiguration, { widget: widget }),
        React.createElement("div", { className: "configuration-category s-drill-config-panel" },
            React.createElement(Typography, { tagName: "h3" },
                React.createElement("span", null,
                    React.createElement(FormattedMessage, { id: "configurationPanel.drillConfig.interactions" }))),
            React.createElement(InsightDrillConfigList, { drillConfigItems: drillConfigItems, onDelete: onDeleteItem, onSetup: onSetupItem, onIncompleteChange: onChangeItem }),
            isOriginSelectorVisible ? (React.createElement(DrillOriginSelector, { items: originSelectorItems, onSelect: onOriginSelect })) : !isLoaded ? (React.createElement("div", { className: "gd-spinner small" })) : null)));
};
//# sourceMappingURL=InsightDrillConfigPanel.js.map