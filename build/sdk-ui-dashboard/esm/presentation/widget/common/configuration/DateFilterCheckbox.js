// (C) 2022 GoodData Corporation
import React, { useCallback } from "react";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
import { isInsightWidget } from "@gooddata/sdk-model";
import { getUnrelatedDateDataset } from "./utils.js";
export const DateFilterCheckbox = (props) => {
    const { isDropdownLoading, isFilterLoading, dateFilterEnabled, selectedDateDataset, selectedDateDatasetHidden, dateFilterCheckboxDisabled, relatedDateDatasets, widget, onDateDatasetFilterEnabled, } = props;
    const unrelatedDateDataset = relatedDateDatasets &&
        getUnrelatedDateDataset(relatedDateDatasets, selectedDateDataset, selectedDateDatasetHidden);
    const hasRelatedDateDataSets = !!(relatedDateDatasets === null || relatedDateDatasets === void 0 ? void 0 : relatedDateDatasets.length);
    const showNoRelatedDate = !hasRelatedDateDataSets &&
        !selectedDateDatasetHidden &&
        dateFilterEnabled &&
        !isDropdownLoading &&
        !dateFilterCheckboxDisabled;
    const showError = (!!unrelatedDateDataset || showNoRelatedDate) &&
        !isDropdownLoading &&
        !isFilterLoading &&
        dateFilterEnabled &&
        !selectedDateDatasetHidden &&
        !dateFilterCheckboxDisabled;
    const classes = cx("s-date-filter-by-item", "input-checkbox-label", "filter-by-item", {
        "date-filter-error": showError,
    });
    const handleChange = useCallback((e) => {
        const { checked } = e.target;
        const dateDataSetRef = selectedDateDataset ? selectedDateDataset.dataSet.ref : undefined;
        // convert to non-immutable
        onDateDatasetFilterEnabled(checked, dateDataSetRef);
    }, [onDateDatasetFilterEnabled, selectedDateDataset]);
    return (React.createElement("div", null,
        React.createElement("label", { className: classes, htmlFor: "configurationPanel.date.input" },
            React.createElement("input", { className: "input-checkbox s-date-filter-checkbox", id: "configurationPanel.date.input", type: "checkbox", checked: !dateFilterCheckboxDisabled && dateFilterEnabled, disabled: dateFilterCheckboxDisabled, onChange: handleChange }),
            React.createElement("span", { className: "input-label-text title" },
                React.createElement(FormattedMessage, { id: "configurationPanel.date" })),
            isFilterLoading ? React.createElement("div", { className: "gd-spinner small" }) : null),
        !isFilterLoading && showNoRelatedDate ? (React.createElement("div", { className: "gd-message error s-no-related-date" }, isInsightWidget(widget) ? (React.createElement(FormattedMessage, { id: "configurationPanel.vizCantBeFilteredByDate" })) : (React.createElement(FormattedMessage, { id: "configurationPanel.kpiCantBeFilteredByDate" })))) : null));
};
//# sourceMappingURL=DateFilterCheckbox.js.map