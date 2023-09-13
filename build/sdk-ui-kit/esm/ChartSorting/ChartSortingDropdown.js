// (C) 2022 GoodData Corporation
import React, { useCallback } from "react";
import { AttributeDropdown } from "./AttributeDropdown/AttributeDropdown.js";
const getAttributeName = (bucketItemNames, available) => bucketItemNames[available.itemId.localIdentifier].name;
export const ChartSortingDropdown = ({ currentSort, availableSorts, bucketItems, intl, onSelect, enableRenamingMeasureToMetric, }) => {
    const onSortChanged = useCallback((newSort, index) => {
        const newSortItems = [...currentSort];
        newSortItems[index] = newSort;
        onSelect(newSortItems);
    }, [onSelect, currentSort]);
    return (React.createElement("div", { className: "gd-sort-attribute-section" }, availableSorts === null || availableSorts === void 0 ? void 0 : availableSorts.map((availableSort, index) => {
        // Obtain current sort item with the same id as current index
        const currentSortItem = currentSort[index];
        if (!currentSortItem) {
            return null;
        }
        return (React.createElement("div", { "aria-label": `sort-attribute-${index}`, key: index, className: `gd-sort-attribute-item s-sort-attribute-item-${index}` },
            availableSorts.length > 1 && (React.createElement("div", { className: "attribute-sorting-title" }, getAttributeName(bucketItems, availableSort))),
            React.createElement(AttributeDropdown, { index: index, currentSortItem: currentSortItem, availableSorts: availableSort, bucketItems: bucketItems, intl: intl, onSelect: (newSort) => {
                    onSortChanged(newSort, index);
                }, enableRenamingMeasureToMetric: enableRenamingMeasureToMetric })));
    })));
};
//# sourceMappingURL=ChartSortingDropdown.js.map