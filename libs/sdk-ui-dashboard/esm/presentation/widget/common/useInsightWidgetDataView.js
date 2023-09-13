// (C) 2022 GoodData Corporation
import { useBackendStrict, useExecutionDataView, useWorkspaceStrict, } from "@gooddata/sdk-ui";
import { useMemo } from "react";
import { insightSetFilters } from "@gooddata/sdk-model";
import stringify from "json-stable-stringify";
import { selectInsightByRef, useDashboardSelector } from "../../../model/index.js";
import { useWidgetFilters } from "./useWidgetFilters.js";
/**
 * This hook provides an easy way to read a data view from insight widget.
 *
 * @param config - configuration of the hook
 *
 * @public
 */
export function useInsightWidgetDataView(config) {
    const { insightWidget, onCancel, onError, onLoading, onPending, onSuccess } = config;
    const backend = useBackendStrict();
    const workspace = useWorkspaceStrict();
    const insight = useDashboardSelector(selectInsightByRef(insightWidget === null || insightWidget === void 0 ? void 0 : insightWidget.insight));
    const widgetFiltersPromise = useWidgetFilters(insightWidget);
    const insightWithAddedFilters = useMemo(() => insightSetFilters(insight, widgetFiltersPromise.result), [
        insight,
        /**
         * We use stringified value to avoid setting equal filters. This prevents cascading cache invalidation
         * and expensive re-renders down the line. The stringification is worth it as the filters are usually
         * pretty small thus saving more time than it is taking.
         */
        stringify(widgetFiltersPromise.result),
    ]);
    const insightExecution = useMemo(() => {
        return insightWithAddedFilters && insightWidget
            ? backend.workspace(workspace).execution().forInsight(insightWithAddedFilters)
            : undefined;
    }, [backend, workspace, insightWithAddedFilters, insightWidget]);
    return useExecutionDataView({
        execution: insightExecution,
        onCancel,
        onError,
        onLoading,
        onPending,
        onSuccess,
    });
}
//# sourceMappingURL=useInsightWidgetDataView.js.map