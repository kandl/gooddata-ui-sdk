// (C) 2007-2023 GoodData Corporation
import React from "react";
import { isInsightWidget } from "@gooddata/sdk-model";
import { FormattedMessage } from "react-intl";
import DefaultMeasure from "react-measure";
import { DateDatasetDropdown } from "./DateDatasetDropdown.js";
import { getUnrelatedDateDataset, removeDateFromTitle } from "./utils.js";
import { defaultImport } from "default-import";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const Measure = defaultImport(DefaultMeasure);
export const DateDatasetPicker = (props) => {
    const { relatedDateDatasets, selectedDateDataset, selectedDateDatasetHidden, widget, dateFromVisualization, autoOpen, isLoading, onDateDatasetChange, } = props;
    const unrelatedDateDataset = relatedDateDatasets &&
        getUnrelatedDateDataset(relatedDateDatasets, selectedDateDataset, selectedDateDatasetHidden);
    const getDateFilter = (measureRef, width) => (React.createElement("div", { className: "subcategory-dropdown", ref: measureRef },
        React.createElement(DateDatasetDropdown, { autoOpen: autoOpen, widgetRef: widget.ref, className: "s-filter-date-dropdown", relatedDateDatasets: relatedDateDatasets !== null && relatedDateDatasets !== void 0 ? relatedDateDatasets : [], activeDateDataset: selectedDateDatasetHidden ? undefined : selectedDateDataset, unrelatedDateDataset: unrelatedDateDataset, dateFromVisualization: dateFromVisualization, onDateDatasetChange: onDateDatasetChange, isLoading: isLoading, width: width })));
    return (React.createElement("div", null,
        React.createElement("div", { className: "configuration-subcategory" },
            React.createElement("label", { className: "s-filter-date-dropdown-heading subcategory-label", htmlFor: "s-filter-date-dropdown" },
                React.createElement(FormattedMessage, { id: "configurationPanel.dateAs" })),
            React.createElement(Measure, null, ({ measureRef, contentRect }) => getDateFilter(measureRef, contentRect.entry.width || 0))),
        !!(unrelatedDateDataset && !isLoading) && (React.createElement("div", { className: "gd-message error s-unrelated-date" }, isInsightWidget(widget) ? (React.createElement(FormattedMessage, { id: "configurationPanel.unrelatedVizDateInfo", values: { dateDataSet: removeDateFromTitle(unrelatedDateDataset.dataSet.title) } })) : (React.createElement(FormattedMessage, { id: "configurationPanel.unrelatedKpiDateInfo", values: { dateDataSet: removeDateFromTitle(unrelatedDateDataset.dataSet.title) } }))))));
};
//# sourceMappingURL=DateDatasetPicker.js.map