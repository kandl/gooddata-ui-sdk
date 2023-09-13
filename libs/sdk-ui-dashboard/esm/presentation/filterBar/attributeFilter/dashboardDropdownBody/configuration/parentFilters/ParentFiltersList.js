// (C) 2022-2023 GoodData Corporation
import React from "react";
import { ParentFiltersListItem } from "./ParentFiltersListItem.js";
import { useDashboardSelector, selectSupportsElementsQueryParentFiltering, } from "../../../../../../model/index.js";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
const ARROW_OFFSETS = { "cr cl": [20, 0], "cl cr": [-10, 0] };
const ALIGN_POINTS = [{ align: "cr cl" }, { align: "cl cr" }];
export const ParentFiltersList = (props) => {
    const { parents, currentFilterLocalId, setParents, onConnectingAttributeChanged, connectingAttributes, attributes, disabled, disabledTooltip, } = props;
    const isDependentFiltersEnabled = useDashboardSelector(selectSupportsElementsQueryParentFiltering);
    if (!isDependentFiltersEnabled || parents.length < 1) {
        return null;
    }
    return (React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
        React.createElement("div", { className: "gd-infinite-list" }, parents.map((item, index) => {
            var _a;
            return (React.createElement(ParentFiltersListItem, { key: item.localIdentifier, currentFilterLocalId: currentFilterLocalId, item: item, disabled: disabled, onClick: setParents, onConnectingAttributeSelect: onConnectingAttributeChanged, connectingAttributes: connectingAttributes[index], title: (_a = item.title) !== null && _a !== void 0 ? _a : attributes[index].title }));
        })),
        Boolean(disabled) && (React.createElement(Bubble, { arrowOffsets: ARROW_OFFSETS, alignPoints: ALIGN_POINTS },
            React.createElement("div", null, disabledTooltip)))));
};
//# sourceMappingURL=ParentFiltersList.js.map