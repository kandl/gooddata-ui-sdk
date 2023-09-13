// (C) 2022-2023 GoodData Corporation
import React, { useState, useRef, useEffect, useCallback } from "react";
import cx from "classnames";
import { isMeasureLocator, sortDirection, isMeasureSort, newAttributeAreaSort, newMeasureSort, objRefToString, isAttributeAreaSort, } from "@gooddata/sdk-model";
import { stringUtils } from "@gooddata/util";
import { Bubble, BubbleHoverTrigger } from "../../Bubble/index.js";
import { DropdownButton, Dropdown, DropdownList } from "../../Dropdown/index.js";
const getItems = (intl, measures, measureNames, areaSortEnabled, availableId) => {
    const measureValues = [];
    if (areaSortEnabled) {
        measureValues.push({
            id: "aggregation",
            title: intl.formatMessage({
                id: "sorting.sum.of.all.measure",
            }),
            localIdentifier: objRefToString(availableId),
        });
    }
    if (measures) {
        measures.forEach((measure) => {
            const measureLocator = measure.locators.find(isMeasureLocator);
            const bucketItem = measureNames[measureLocator.measureLocatorItem.measureIdentifier];
            if (bucketItem) {
                measureValues.push({
                    id: measureLocator.measureLocatorItem.measureIdentifier,
                    title: bucketItem === null || bucketItem === void 0 ? void 0 : bucketItem.name,
                    sequenceNumber: bucketItem === null || bucketItem === void 0 ? void 0 : bucketItem.sequenceNumber,
                    localIdentifier: measureLocator.measureLocatorItem.measureIdentifier,
                });
            }
        });
    }
    return measureValues;
};
const getButtonValue = (currentItem, intl, measureNames) => {
    var _a, _b, _c;
    let buttonValue;
    if (isAttributeAreaSort(currentItem)) {
        buttonValue = {
            id: "aggregation",
            title: intl.formatMessage({ id: "sorting.sum.of.all.measure" }),
        };
    }
    else if (isMeasureSort(currentItem)) {
        const measureLocator = currentItem.measureSortItem.locators.find(isMeasureLocator);
        buttonValue = {
            id: (_a = measureNames[measureLocator.measureLocatorItem.measureIdentifier]) === null || _a === void 0 ? void 0 : _a.name,
            title: (_b = measureNames[measureLocator.measureLocatorItem.measureIdentifier]) === null || _b === void 0 ? void 0 : _b.name,
            sequenceNumber: (_c = measureNames[measureLocator.measureLocatorItem.measureIdentifier]) === null || _c === void 0 ? void 0 : _c.sequenceNumber,
        };
    }
    return buttonValue;
};
const getMeasureIconClassNameBySelected = (id, enableRenamingMeasureToMetric) => {
    if (id === "aggregation") {
        return "gd-icon-aggregation";
    }
    else if (enableRenamingMeasureToMetric) {
        return "gd-icon-metric";
    }
    else {
        return "gd-icon-measure";
    }
};
export const MeasureDropdown = ({ currentItem, availableSorts, bucketItems, intl, onSelect, index, enableRenamingMeasureToMetric, disabledExplanationTooltip, }) => {
    const [width, setWidth] = useState(0);
    const buttonRef = useRef();
    const measures = availableSorts.metricSorts;
    const areaSortEnabled = availableSorts.attributeSort.areaSortEnabled;
    const items = getItems(intl, measures, bucketItems, areaSortEnabled, availableSorts.itemId);
    const disableDropdown = items.length === 1;
    const buttonValue = getButtonValue(currentItem, intl, bucketItems);
    const measureName = buttonValue.sequenceNumber
        ? `${buttonValue.title} (${buttonValue.sequenceNumber})`
        : buttonValue.title;
    useEffect(() => {
        if (buttonRef === null || buttonRef === void 0 ? void 0 : buttonRef.current) {
            setWidth(buttonRef.current.getBoundingClientRect().width);
        }
    }, []);
    const onMeasureSelectHandler = useCallback((item) => {
        const direction = sortDirection(currentItem);
        if (item.id === "aggregation" && areaSortEnabled) {
            onSelect(newAttributeAreaSort(item.localIdentifier, direction));
        }
        else {
            onSelect(newMeasureSort(item.localIdentifier, direction));
        }
    }, [currentItem, onSelect, areaSortEnabled]);
    return (React.createElement("div", { className: "sort-measure-section" },
        React.createElement("span", { className: "select-label" },
            React.createElement("span", null, intl.formatMessage({ id: "sorting.by" }))),
        React.createElement("div", { className: "measure-sorting-dropdown" }, disableDropdown ? (React.createElement(BubbleHoverTrigger, null,
            React.createElement(DropdownButton, { className: "s-inner-aggregation-disabled-button s-measure-dropdown-button", value: measureName, disabled: true, iconLeft: getMeasureIconClassNameBySelected(buttonValue.id, enableRenamingMeasureToMetric) }),
            disabledExplanationTooltip ? (React.createElement(Bubble, { alignPoints: [{ align: "cr cl" }, { align: "cl cr" }] })) : null)) : (React.createElement(Dropdown, { className: "gd-measure-sorting-dropdown-body s-measure-sorting-dropdown-body", closeOnMouseDrag: true, closeOnParentScroll: true, renderButton: ({ isOpen, toggleDropdown }) => (React.createElement("div", { ref: buttonRef },
                React.createElement(DropdownButton, { className: `s-sort-type-measure-button s-measure-dropdown-button-${index}`, value: measureName, isOpen: isOpen, disabled: disableDropdown, onClick: toggleDropdown, iconLeft: getMeasureIconClassNameBySelected(buttonValue.id, enableRenamingMeasureToMetric) }))), renderBody: ({ closeDropdown }) => (React.createElement(DropdownList, { width: width, items: items, className: "gd-measure-sorting-dropdown-body s-measure-sorting-dropdown-body", renderItem: ({ item, rowIndex }) => {
                    const isSelected = item.title === buttonValue.title &&
                        item.sequenceNumber === buttonValue.sequenceNumber;
                    const className = cx("gd-list-item", "gd-list-item-shortened", "gd-sorting-measure", "gd-button-link", getMeasureIconClassNameBySelected(item.id, enableRenamingMeasureToMetric), {
                        "is-selected": isSelected,
                    }, `s-sorting-measure-${stringUtils.simplifyText(item.title)}`, `s-sorting-measure-${rowIndex}`);
                    return (React.createElement("div", { className: "gd-measure-dropdown-list" },
                        React.createElement("button", { className: className, onClick: () => {
                                onMeasureSelectHandler(item);
                                closeDropdown();
                            }, title: item.title },
                            React.createElement("span", { className: "gd-sorting-measure-title" }, item.title),
                            item.sequenceNumber ? (React.createElement("span", { className: "gd-sorting-sequence-number" }, item.sequenceNumber)) : null)));
                } })) })))));
};
//# sourceMappingURL=MeasureDropdown.js.map