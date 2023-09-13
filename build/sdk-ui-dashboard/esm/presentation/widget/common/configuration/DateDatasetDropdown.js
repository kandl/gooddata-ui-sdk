// (C) 2007-2023 GoodData Corporation
import React, { useCallback, useEffect, useState } from "react";
import { objRefToString } from "@gooddata/sdk-model";
import { defineMessages, useIntl } from "react-intl";
import cx from "classnames";
import { Dropdown, DropdownButton, DropdownList, sortDateDatasets, isDateDatasetHeader, ShortenedText, ScrollableItem, } from "@gooddata/sdk-ui-kit";
import { stringUtils } from "@gooddata/util";
import { removeDateFromTitle } from "./utils.js";
const DEFAULT_HYPHEN_CHAR = "-";
const alignPoints = [{ align: "bl tl" }, { align: "tl bl" }];
const tooltipAlignPoints = [
    { align: "cl cr", offset: { x: -10, y: 0 } },
    { align: "cr cl", offset: { x: 10, y: 0 } },
];
// work around the evil DateDatasetsListItem from kit that magically translates SOME of the items' titles
// this way the i18n actually has a chance to detect these
const dateDatasetHeaderMessages = defineMessages({
    "gs.date.date-dataset.recommended": { id: "gs.date.date-dataset.recommended" },
    "gs.date.date-dataset.other": { id: "gs.date.date-dataset.other" },
    "gs.date.date-dataset.related": { id: "gs.date.date-dataset.related" },
    "gs.date.date-dataset.unrelated": { id: "gs.date.date-dataset.unrelated" },
});
const DateDatasetsListItem = ({ id, title = "", isHeader, isSelected, isUnrelated, onClick, }) => {
    if (isHeader) {
        return React.createElement("div", { className: "gd-list-item gd-list-item-header" }, title);
    }
    const classNames = cx("gd-list-item", "gd-list-item-shortened", `s-${id}`, `s-${stringUtils.simplifyText(title)}`, {
        "is-selected": isSelected,
        "is-unrelated": isUnrelated,
    });
    return (React.createElement("div", { className: classNames, onClick: onClick },
        React.createElement(ShortenedText, { tooltipAlignPoints: tooltipAlignPoints }, title)));
};
function catalogDateDatasetToDateDataset(ds) {
    return {
        id: ds.dataSet.id,
        title: ds.dataSet.title,
        relevance: ds.relevance,
    };
}
export const DateDatasetDropdown = (props) => {
    const { className = "s-date-dataset-switch", isLoading = false, autoOpen = false, onDateDatasetChange, activeDateDataset, unrelatedDateDataset, width, dateFromVisualization, relatedDateDatasets, widgetRef, } = props;
    const intl = useIntl();
    const { onItemScroll, closeOnParentScroll } = useAutoScroll(autoOpen);
    const unrelatedDateDataSetId = unrelatedDateDataset ? unrelatedDateDataset.dataSet.id : null;
    let activeDateDataSetId;
    let activeDateDataSetTitle = DEFAULT_HYPHEN_CHAR;
    let activeDateDataSetUri;
    let recommendedDateDataSet = null;
    if (!isLoading && activeDateDataset) {
        activeDateDataSetId = activeDateDataset.dataSet.id;
        activeDateDataSetTitle = activeDateDataset.dataSet.title;
        activeDateDataSetUri = activeDateDataset.dataSet.uri;
    }
    if (dateFromVisualization) {
        recommendedDateDataSet = relatedDateDatasets.find((d) => d.dataSet.uri === dateFromVisualization.dataSet.uri);
    }
    const sortedItems = sortDateDatasets(relatedDateDatasets.map(catalogDateDatasetToDateDataset), recommendedDateDataSet ? catalogDateDatasetToDateDataset(recommendedDateDataSet) : undefined, unrelatedDateDataset ? catalogDateDatasetToDateDataset(unrelatedDateDataset) : undefined);
    return (React.createElement(Dropdown
    // We want to open the dropdown, when user selects a metric
    // without a recommended data set
    , { 
        // We want to open the dropdown, when user selects a metric
        // without a recommended data set
        key: `${objRefToString(widgetRef)}_${autoOpen}`, openOnInit: autoOpen, ignoreClicksOnByClass: [".dash-content"], renderButton: ({ isOpen, toggleDropdown }) => {
            const buttonClassName = cx("s-date-dataset-button", isOpen ? "s-expanded" : "s-collapsed", {
                "is-loading": isLoading,
                "is-unrelated": !isLoading &&
                    unrelatedDateDataset &&
                    unrelatedDateDataset.dataSet.uri === activeDateDataSetUri,
            });
            const buttonValue = isLoading
                ? intl.formatMessage({ id: "loading" })
                : removeDateFromTitle(activeDateDataSetTitle);
            return (React.createElement(ScrollableItem, { scrollIntoView: autoOpen, onItemScrolled: onItemScroll },
                React.createElement(DropdownButton, { className: buttonClassName, value: buttonValue, isOpen: isOpen, onClick: toggleDropdown, disabled: isLoading })));
        }, className: className, closeOnParentScroll: closeOnParentScroll, closeOnMouseDrag: true, alignPoints: alignPoints, renderBody: ({ closeDropdown }) => {
            if (isLoading) {
                return null;
            }
            return (React.createElement(DropdownList, { className: "configuration-dropdown dataSets-list", width: width, items: sortedItems, itemsCount: sortedItems.length, renderItem: ({ item }) => {
                    const isHeader = isDateDatasetHeader(item);
                    const isSelected = !isDateDatasetHeader(item) && activeDateDataSetId === item.id;
                    const isUnrelated = !isDateDatasetHeader(item) && unrelatedDateDataSetId === item.id;
                    return (React.createElement(DateDatasetsListItem, { title: isHeader
                            ? intl.formatMessage(dateDatasetHeaderMessages[item.title])
                            : removeDateFromTitle(item.title), isHeader: isHeader, isSelected: isSelected, isUnrelated: isUnrelated, onClick: (e) => {
                            e.preventDefault();
                            if (isDateDatasetHeader(item)) {
                                return;
                            }
                            closeDropdown();
                            onDateDatasetChange(item.id);
                        } }));
                } }));
        } }));
};
/**
 * Purpose of this hook is keep value of closeOnParentScroll derived from autoOpen
 * We need set closeOnParentScroll to false and after item scrolled return to true
 * otherwise dropdown is immediately closed when item is scrolled to view
 */
export function useAutoScroll(autoOpen) {
    const [closeOnParentScroll, setCloseOnParentScroll] = useState(!autoOpen);
    useEffect(() => {
        setCloseOnParentScroll(!autoOpen);
    }, [autoOpen]);
    const onItemScroll = useCallback(() => {
        setTimeout(() => {
            setCloseOnParentScroll(true);
        }, 300);
    }, []);
    return {
        onItemScroll,
        closeOnParentScroll,
    };
}
//# sourceMappingURL=DateDatasetDropdown.js.map