// (C) 2022-2023 GoodData Corporation
import React, { useCallback, useState } from "react";
import { DateFilterCheckbox } from "./DateFilterCheckbox.js";
import { useDashboardSelector, selectAllCatalogDateDatasetsMap } from "../../../../model/index.js";
import { DateDatasetPicker } from "./DateDatasetPicker.js";
import { getUnrelatedDateDataset } from "./utils.js";
import { useDateFilterConfigurationHandling } from "./useDateFilterConfigurationHandling.js";
import { useIsSelectedDatasetHidden } from "./useIsSelectedDatasetHidden.js";
export const DateDatasetFilter = (props) => {
    const { relatedDateDatasets, widget, dateFilterCheckboxDisabled, dateFromVisualization, isDatasetsLoading, shouldPickDateDataset, shouldOpenDateDatasetPicker, onDateDatasetChanged, isLoadingAdditionalData, } = props;
    const catalogDatasetsMap = useDashboardSelector(selectAllCatalogDateDatasetsMap);
    const selectedDateDataset = widget.dateDataSet && catalogDatasetsMap.get(widget.dateDataSet);
    const { selectedDateDatasetHiddenByObjectAvailability, status: visibleDateDatasetsStatus } = useIsSelectedDatasetHidden(selectedDateDataset === null || selectedDateDataset === void 0 ? void 0 : selectedDateDataset.dataSet.ref);
    const [isDateFilterEnabled, setIsDateFilterEnabled] = useState(!!widget.dateDataSet || shouldPickDateDataset || isLoadingAdditionalData);
    const { handleDateDatasetChanged: handleDateDatasetChangedCore, handleDateFilterEnabled, status, } = useDateFilterConfigurationHandling(widget, relatedDateDatasets, setIsDateFilterEnabled);
    const handleDateDatasetChanged = useCallback((id) => {
        onDateDatasetChanged === null || onDateDatasetChanged === void 0 ? void 0 : onDateDatasetChanged(id);
        handleDateDatasetChangedCore(id);
    }, [handleDateDatasetChangedCore, onDateDatasetChanged]);
    const isFilterLoading = status === "loading";
    const isDropdownLoading = isDatasetsLoading || visibleDateDatasetsStatus === "loading";
    const shouldRenderDateDataSetsDropdown = !dateFilterCheckboxDisabled &&
        !(!isDateFilterEnabled || isFilterLoading) &&
        ((relatedDateDatasets === null || relatedDateDatasets === void 0 ? void 0 : relatedDateDatasets.length) || isDropdownLoading || selectedDateDatasetHiddenByObjectAvailability);
    const unrelatedDateDataset = relatedDateDatasets &&
        getUnrelatedDateDataset(relatedDateDatasets, selectedDateDataset, selectedDateDatasetHiddenByObjectAvailability);
    return (React.createElement("div", null,
        React.createElement(DateFilterCheckbox, { relatedDateDatasets: relatedDateDatasets, widget: widget, dateFilterCheckboxDisabled: dateFilterCheckboxDisabled, dateFilterEnabled: isDateFilterEnabled, isDropdownLoading: isDropdownLoading, isFilterLoading: isFilterLoading, selectedDateDataset: selectedDateDataset, selectedDateDatasetHidden: selectedDateDatasetHiddenByObjectAvailability, onDateDatasetFilterEnabled: handleDateFilterEnabled }),
        !!shouldRenderDateDataSetsDropdown && (React.createElement(DateDatasetPicker, { relatedDateDatasets: relatedDateDatasets, dateFromVisualization: dateFromVisualization, widget: widget, selectedDateDataset: selectedDateDataset, selectedDateDatasetHidden: selectedDateDatasetHiddenByObjectAvailability, unrelatedDateDataset: unrelatedDateDataset, onDateDatasetChange: handleDateDatasetChanged, autoOpen: shouldOpenDateDatasetPicker, isLoading: isDropdownLoading }))));
};
//# sourceMappingURL=DateDatasetFilter.js.map