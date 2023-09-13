// (C) 2007-2022 GoodData Corporation
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import { Dropdown, DropdownButton, DropdownList } from "@gooddata/sdk-ui-kit";
import cx from "classnames";
import debounce from "lodash/debounce.js";
import { useDashboardSelector, selectCatalogMeasures, selectEnableRenamingMeasureToMetric, } from "../../../../../model/index.js";
import { CONFIG_PANEL_INNER_WIDTH } from "../constants.js";
import { MetricDropdownItem } from "./MetricDropdownItem.js";
const alignPoints = [{ align: "bl tl" }];
const LIST_EXTRAS = 58; // search field + top/bottom borders
const LIST_ITEM_HEIGHT = 28;
const MAX_LIST_HEIGHT = 294;
export const MetricDropdown = (props) => {
    var _a, _b;
    const { onSelect, bodyClassName, selectedItems, openOnInit } = props;
    const intl = useIntl();
    const buttonRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const measures = useDashboardSelector(selectCatalogMeasures);
    const shouldRenameMeasureToMetric = useDashboardSelector(selectEnableRenamingMeasureToMetric);
    const debouncedOnSearch = useRef(debounce((newSearchQuery) => {
        setSearchQuery(newSearchQuery);
    }, 250));
    const [selectedRef] = selectedItems;
    const selectedItem = selectedRef
        ? measures.find((m) => areObjRefsEqual(m.measure.ref, selectedItems[0]))
        : undefined;
    const buttonValue = (_b = (_a = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.measure) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : intl.formatMessage({ id: "configurationPanel.selectMeasurePlaceholder" });
    const onOpenStateChanged = useCallback((isOpen) => {
        if (isOpen && searchQuery) {
            setSearchQuery("");
        }
    }, [searchQuery]);
    const filteredMeasures = useMemo(() => searchQuery
        ? measures.filter((m) => m.measure.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : measures, [measures, searchQuery]);
    const calculateHeight = (itemsCount) => {
        const winHeight = window.innerHeight;
        const dropdownButtonBottom = buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom : 0;
        const minHeight = Math.min(winHeight - dropdownButtonBottom - LIST_EXTRAS, MAX_LIST_HEIGHT, LIST_ITEM_HEIGHT * itemsCount);
        return Math.max(LIST_ITEM_HEIGHT, minHeight);
    };
    const height = calculateHeight(filteredMeasures.length) || MAX_LIST_HEIGHT;
    return (React.createElement(Dropdown, { alignPoints: alignPoints, className: "s-metric_select", closeOnMouseDrag: true, closeOnParentScroll: true, openOnInit: openOnInit, ignoreClicksOnByClass: [".dash-content"], onOpenStateChanged: onOpenStateChanged, renderButton: ({ isOpen, toggleDropdown }) => (React.createElement("div", { ref: buttonRef },
            React.createElement(DropdownButton, { className: shouldRenameMeasureToMetric ? "type-metric" : "type-measure", isSmall: true, value: buttonValue, isOpen: isOpen, onClick: toggleDropdown }))), renderBody: ({ closeDropdown }) => (React.createElement("div", { className: cx(bodyClassName, "metrics-dropdown") },
            React.createElement(DropdownList, { items: filteredMeasures, searchFieldSize: "small", showSearch: true, onSearch: debouncedOnSearch.current, searchString: searchQuery, height: height, width: CONFIG_PANEL_INNER_WIDTH, 
                // disabling autofocus for now as it causes the page to scroll to top for no reason
                disableAutofocus: true, renderItem: ({ item }) => {
                    return (React.createElement(MetricDropdownItem, { item: item.measure, isSelected: !!selectedRef && areObjRefsEqual(selectedRef, item.measure.ref), unlistedTitle: intl.formatMessage({
                            id: "configurationPanel.unlistedMetric",
                        }), unlistedIconTitle: intl.formatMessage({
                            id: "configurationPanel.unlistedMetricIconTitle",
                        }), onClick: () => {
                            onSelect(item.measure);
                            closeDropdown();
                        } }));
                } }))) }));
};
//# sourceMappingURL=MetricDropdown.js.map