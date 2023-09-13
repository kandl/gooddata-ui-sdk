// (C) 2019-2022 GoodData Corporation
import React from "react";
import InsightDrillConfigItem from "./InsightDrillConfigItem.js";
import { useDrillTargetTypeItems } from "./useDrillTargetTypeItems.js";
import { ScrollableItem } from "@gooddata/sdk-ui-kit";
export const InsightDrillConfigList = (props) => {
    const { drillConfigItems = [], onDelete, onSetup, onIncompleteChange } = props;
    const enabledDrillTargetTypeItems = useDrillTargetTypeItems();
    const shouldScrollToContainer = (item, isLast) => {
        return !item.complete && isLast;
    };
    const isLast = (index) => {
        return index === drillConfigItems.length - 1;
    };
    return (React.createElement("div", { className: "s-drill-config-list" }, drillConfigItems.map((item, index) => {
        const shouldScroll = shouldScrollToContainer(item, isLast(index));
        return (React.createElement(ScrollableItem, { scrollIntoView: shouldScroll, key: item.localIdentifier + item.drillTargetType },
            React.createElement(InsightDrillConfigItem, { item: item, key: item.localIdentifier + item.drillTargetType, onDelete: onDelete, onSetup: onSetup, onIncompleteChange: onIncompleteChange, enabledDrillTargetTypeItems: enabledDrillTargetTypeItems })));
    })));
};
//# sourceMappingURL=InsightDrillConfigList.js.map