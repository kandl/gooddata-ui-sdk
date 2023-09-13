// (C) 2007-2023 GoodData Corporation
import React, { useEffect, useMemo } from "react";
import { DateDatasetFilter } from "../../common/index.js";
import { insightMeasures, isDateFilter, isSimpleMeasure, measureFilters, widgetRef, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import { queryDateDatasetsForInsight, selectInsightByRef, selectIsWidgetLoadingAdditionalDataByWidgetRef, useDashboardQueryProcessing, useDashboardSelector, } from "../../../../model/index.js";
import { useDateDatasetFilter } from "../../common/configuration/useDateDatasetFilter.js";
import isEmpty from "lodash/isEmpty.js";
export default function InsightDateDataSetFilter({ widget }) {
    const { status, run: queryDateDatasets, result, } = useDashboardQueryProcessing({
        queryCreator: queryDateDatasetsForInsight,
    });
    const isLoadingAdditionalData = useDashboardSelector(selectIsWidgetLoadingAdditionalDataByWidgetRef(widgetRef(widget)));
    const insight = useDashboardSelector(selectInsightByRef(widget.insight));
    invariant(insight, "inconsistent state in InsightDateDataSetFilter");
    useEffect(() => {
        // use the whole insight to improve cache hits: other calls to this query also use whole insights
        queryDateDatasets(insight);
    }, [queryDateDatasets, insight]);
    const { handleDateDatasetChanged, shouldOpenDateDatasetPicker } = useDateDatasetFilter(result === null || result === void 0 ? void 0 : result.dateDatasets);
    const dateOptionsDisabled = useMemo(() => {
        const measures = insightMeasures(insight);
        return isEmpty(measures) ? false : measures.every(isDateFiltered);
    }, [insight]);
    return (React.createElement(DateDatasetFilter, { widget: widget, dateFilterCheckboxDisabled: dateOptionsDisabled, isDatasetsLoading: status === "running" || status === "pending" || isLoadingAdditionalData, relatedDateDatasets: result === null || result === void 0 ? void 0 : result.dateDatasetsOrdered, isLoadingAdditionalData: isLoadingAdditionalData, shouldOpenDateDatasetPicker: shouldOpenDateDatasetPicker, onDateDatasetChanged: handleDateDatasetChanged }));
}
function isDateFiltered(measure) {
    var _a;
    if (isSimpleMeasure(measure)) {
        const filters = (_a = measureFilters(measure)) !== null && _a !== void 0 ? _a : [];
        return filters.some(isDateFilter);
    }
    return true;
}
//# sourceMappingURL=InsightDateDataSetFilter.js.map