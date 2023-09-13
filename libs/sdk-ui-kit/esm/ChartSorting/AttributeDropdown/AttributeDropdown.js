// (C) 2022-2023 GoodData Corporation
import React, { useState, useRef, useEffect, useCallback } from "react";
import { isAttributeSort, sortDirection, isAttributeAreaSort, newAttributeSort, newAttributeAreaSort, newMeasureSort, isMeasureLocator, } from "@gooddata/sdk-model";
import { SORT_TARGET_TYPE } from "../types.js";
import { Dropdown, DropdownButton, DropdownList } from "../../Dropdown/index.js";
import { SingleSelectListItem } from "../../List/index.js";
import { MeasureDropdown } from "../MeasureDropdown/MeasureDropdown.js";
const icons = {
    [SORT_TARGET_TYPE.ALPHABETICAL_ASC]: `gd-icon-sort-alphabetical-asc`,
    [SORT_TARGET_TYPE.ALPHABETICAL_DESC]: `gd-icon-sort-alphabetical-desc`,
    [SORT_TARGET_TYPE.DATE_ASC]: `gd-icon-sort-date-asc`,
    [SORT_TARGET_TYPE.DATE_DESC]: `gd-icon-sort-date-desc`,
    [SORT_TARGET_TYPE.DEFAULT]: `gd-icon-sort-default`,
    [SORT_TARGET_TYPE.NUMERICAL_ASC]: `gd-icon-sort-numerical-asc`,
    [SORT_TARGET_TYPE.NUMERICAL_DESC]: `gd-icon-sort-numerical-desc`,
};
const getIconClassName = (sortType) => icons[sortType];
const getSortTypeItems = (available, bucketItems, intl) => {
    var _a;
    const sortTypeItems = [];
    const bucketItem = bucketItems[available.itemId.localIdentifier];
    if (available.attributeSort.normalSortEnabled && bucketItem.type === "attribute") {
        sortTypeItems.push({
            id: SORT_TARGET_TYPE.ALPHABETICAL_ASC,
            title: intl.formatMessage({ id: "sorting.type.alphabetical.asc" }),
            sortDirection: "asc",
            type: "alphabetical",
            localIdentifier: available.itemId.localIdentifier,
        }, {
            id: SORT_TARGET_TYPE.ALPHABETICAL_DESC,
            title: intl.formatMessage({ id: "sorting.type.alphabetical.desc" }),
            sortDirection: "desc",
            type: "alphabetical",
            localIdentifier: available.itemId.localIdentifier,
        });
    }
    if (available.attributeSort.normalSortEnabled && bucketItem.type === "chronologicalDate") {
        sortTypeItems.push({
            id: SORT_TARGET_TYPE.DATE_ASC,
            title: intl.formatMessage({ id: "sorting.type.date.asc" }),
            sortDirection: "asc",
            type: "date",
            localIdentifier: available.itemId.localIdentifier,
        }, {
            id: SORT_TARGET_TYPE.DATE_DESC,
            title: intl.formatMessage({ id: "sorting.type.date.desc" }),
            sortDirection: "desc",
            type: "date",
            localIdentifier: available.itemId.localIdentifier,
        });
    }
    if (available.attributeSort.areaSortEnabled || ((_a = available.metricSorts) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        sortTypeItems.push({
            id: SORT_TARGET_TYPE.NUMERICAL_ASC,
            title: intl.formatMessage({ id: "sorting.type.numerical.asc" }),
            sortDirection: "asc",
            type: "numerical",
            localIdentifier: available.itemId.localIdentifier,
        }, {
            id: SORT_TARGET_TYPE.NUMERICAL_DESC,
            title: intl.formatMessage({ id: "sorting.type.numerical.desc" }),
            sortDirection: "desc",
            type: "numerical",
            localIdentifier: available.itemId.localIdentifier,
        });
    }
    if (available.attributeSort.normalSortEnabled && bucketItem.type === "genericDate") {
        sortTypeItems.push({
            id: SORT_TARGET_TYPE.DEFAULT,
            title: intl.formatMessage({ id: "sorting.type.default" }),
            sortDirection: "asc",
            type: "default",
            localIdentifier: available.itemId.localIdentifier,
        });
    }
    return sortTypeItems;
};
const getNumericSortTargetType = (currentItem) => sortDirection(currentItem) === "asc" ? SORT_TARGET_TYPE.NUMERICAL_ASC : SORT_TARGET_TYPE.NUMERICAL_DESC;
const getAlphabeticalSortTargetType = (currentItem) => sortDirection(currentItem) === "asc"
    ? SORT_TARGET_TYPE.ALPHABETICAL_ASC
    : SORT_TARGET_TYPE.ALPHABETICAL_DESC;
const getDateSortTargetType = (currentItem) => sortDirection(currentItem) === "asc" ? SORT_TARGET_TYPE.DATE_ASC : SORT_TARGET_TYPE.DATE_DESC;
const getSelectedItemId = (currentItem, bucketItems) => {
    if (isAttributeSort(currentItem)) {
        const bucketItem = bucketItems[currentItem.attributeSortItem.attributeIdentifier];
        if (isAttributeAreaSort(currentItem)) {
            return getNumericSortTargetType(currentItem);
        }
        if ((bucketItem === null || bucketItem === void 0 ? void 0 : bucketItem.type) === "chronologicalDate") {
            return getDateSortTargetType(currentItem);
        }
        if ((bucketItem === null || bucketItem === void 0 ? void 0 : bucketItem.type) === "genericDate") {
            return SORT_TARGET_TYPE.DEFAULT;
        }
        return getAlphabeticalSortTargetType(currentItem);
    }
    return getNumericSortTargetType(currentItem);
};
const getButtonValue = (sortTypeItems, type) => {
    const foundItem = sortTypeItems.find((sortTypeItems) => sortTypeItems.id === type);
    return foundItem ? foundItem.title : "";
};
const buildSortItem = ({ type, localIdentifier, sortDirection }, availableSorts) => {
    if (type === "alphabetical" || type === "date" || type === "default") {
        return newAttributeSort(localIdentifier, sortDirection);
    }
    else if (availableSorts.attributeSort.areaSortEnabled) {
        return newAttributeAreaSort(localIdentifier, sortDirection);
    }
    else {
        const { measureLocatorItem } = availableSorts.metricSorts[0].locators.find(isMeasureLocator);
        return newMeasureSort(measureLocatorItem.measureIdentifier, sortDirection);
    }
};
export const AttributeDropdown = ({ currentSortItem, availableSorts, bucketItems, intl, index, onSelect, enableRenamingMeasureToMetric, }) => {
    const [width, setWidth] = useState(0);
    const buttonRef = useRef(null);
    useEffect(() => {
        if (buttonRef === null || buttonRef === void 0 ? void 0 : buttonRef.current) {
            setWidth(buttonRef.current.getBoundingClientRect().width);
        }
    }, []);
    const attributeSelectHandler = useCallback((selectedSortType) => {
        const newCurrentItem = buildSortItem(selectedSortType, availableSorts);
        onSelect(newCurrentItem);
    }, [onSelect, availableSorts]);
    const measureSelectHandler = useCallback((newCurrentItem) => {
        onSelect(newCurrentItem);
    }, [onSelect]);
    const sortTypeItems = getSortTypeItems(availableSorts, bucketItems, intl);
    const selectedSortType = getSelectedItemId(currentSortItem, bucketItems);
    const buttonValue = getButtonValue(sortTypeItems, selectedSortType);
    const renderMeasureDropdown = selectedSortType === SORT_TARGET_TYPE.NUMERICAL_ASC ||
        selectedSortType === SORT_TARGET_TYPE.NUMERICAL_DESC;
    return (React.createElement(React.Fragment, null,
        React.createElement(Dropdown, { closeOnMouseDrag: true, closeOnParentScroll: true, renderButton: ({ isOpen, toggleDropdown }) => (React.createElement("div", { ref: buttonRef },
                React.createElement(DropdownButton, { className: `s-sort-type-attribute-button-${index} s-${selectedSortType}-dropdown-button s-attribute-dropdown-button`, value: buttonValue, isOpen: isOpen, onClick: toggleDropdown, iconLeft: getIconClassName(selectedSortType) }))), renderBody: ({ closeDropdown }) => (React.createElement(DropdownList, { className: "gd-attribute-sorting-dropdown-body s-attribute-sorting-dropdown-body", items: sortTypeItems, width: width, renderItem: ({ item }) => {
                    const { id, title } = item;
                    const isSelected = id === selectedSortType;
                    const iconClass = getIconClassName(id);
                    const tooltip = id === SORT_TARGET_TYPE.DEFAULT
                        ? intl.formatMessage({ id: "sorting.default.tooltip" })
                        : undefined;
                    return (React.createElement(SingleSelectListItem, { isSelected: isSelected, className: iconClass, title: title, onClick: () => {
                            attributeSelectHandler(item);
                            closeDropdown();
                        }, info: tooltip }));
                } })) }),
        renderMeasureDropdown ? (React.createElement(MeasureDropdown, { currentItem: currentSortItem, intl: intl, availableSorts: availableSorts, bucketItems: bucketItems, onSelect: measureSelectHandler, disabledExplanationTooltip: availableSorts.explanation, enableRenamingMeasureToMetric: enableRenamingMeasureToMetric, index: index })) : null));
};
//# sourceMappingURL=AttributeDropdown.js.map