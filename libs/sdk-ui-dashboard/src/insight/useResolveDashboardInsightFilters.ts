// (C) 2020-2021 GoodData Corporation
import { useMemo } from "react";
import { FilterContextItem, IAnalyticalBackend, IInsightWidget } from "@gooddata/sdk-backend-spi";
import { isDateFilter, IInsight } from "@gooddata/sdk-model";
import {
    OnError,
    useBackendStrict,
    useCancelablePromise,
    useWorkspaceStrict,
    UseCancelablePromiseState,
    GoodDataSdkError,
} from "@gooddata/sdk-ui";
import {
    filterContextItemsToFiltersForWidget,
    filterContextToFiltersForWidget,
} from "@gooddata/sdk-ui-ext/esm/dashboardView/converters";
import { useDashboardSelector, selectFilterContext } from "../model";
import { addImplicitAllTimeFilter, isDateFilterIgnoredForInsight } from "./utils";

/**
 * @internal
 */
export interface UseResolveDashboardInsightFiltersProps {
    insight: IInsight;
    insightWidget: IInsightWidget;
    filters?: FilterContextItem[];
    workspace?: string;
    backend?: IAnalyticalBackend;
    onError?: OnError;
}

/**
 * @internal
 */
export const useResolveDashboardInsightFilters = (
    props: UseResolveDashboardInsightFiltersProps,
): UseCancelablePromiseState<IInsight, GoodDataSdkError> => {
    const { backend, workspace, insightWidget, insight, filters, onError } = props;
    const effectiveBackend = useBackendStrict(backend);
    const effectiveWorkspace = useWorkspaceStrict(workspace);
    const filterContext = useDashboardSelector(selectFilterContext);

    const inputFilters = useMemo(
        () =>
            filters
                ? filterContextItemsToFiltersForWidget(filters, insightWidget)
                : filterContextToFiltersForWidget(filterContext, insightWidget),
        [filters, filterContext, insightWidget],
    );

    return useCancelablePromise(
        {
            promise: async () => {
                const resolvedFilters = await effectiveBackend
                    .workspace(effectiveWorkspace)
                    .dashboards()
                    .getResolvedFiltersForWidget(insightWidget, inputFilters);

                let resolvedWithImplicitAllTime = addImplicitAllTimeFilter(insightWidget, resolvedFilters);

                if (isDateFilterIgnoredForInsight(insight)) {
                    resolvedWithImplicitAllTime = resolvedWithImplicitAllTime.filter(
                        (filter) => !isDateFilter(filter),
                    );
                }

                return effectiveBackend
                    .workspace(effectiveWorkspace)
                    .insights()
                    .getInsightWithAddedFilters(insight, resolvedWithImplicitAllTime);
            },
            onError,
        },
        [effectiveBackend, effectiveWorkspace, insightWidget, inputFilters],
    );
};