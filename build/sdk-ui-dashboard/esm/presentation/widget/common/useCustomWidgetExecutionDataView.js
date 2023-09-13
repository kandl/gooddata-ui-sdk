// (C) 2022 GoodData Corporation
import { useEffect, useMemo } from "react";
import { UnexpectedSdkError, useExecutionDataView, } from "@gooddata/sdk-ui";
import { useWidgetFilters } from "./useWidgetFilters.js";
/**
 * This hook provides an easy way to read a data view from a custom widget. It resolves the appropriate filters
 * for the widget based on the filters currently set on the whole dashboard.
 *
 * @public
 */
export function useCustomWidgetExecutionDataView({ widget, execution, onCancel, onError, onLoading, onPending, onSuccess, }) {
    var _a;
    const filterQueryTask = useWidgetFilters(widget);
    const dataViewTask = useExecutionDataView({
        execution: execution
            ? Object.assign(Object.assign({}, execution), { filters: filterQueryTask.result }) : undefined,
        onCancel,
        onError,
        onLoading,
        onPending,
        onSuccess,
    });
    const rejectError = useMemo(() => {
        if (filterQueryTask.status === "rejected") {
            return new UnexpectedSdkError("The widget filter query was rejected");
        }
        return undefined;
    }, [filterQueryTask.status]);
    useEffect(() => {
        if (filterQueryTask.status === "rejected" && rejectError) {
            onError === null || onError === void 0 ? void 0 : onError(rejectError);
        }
    }, [filterQueryTask.status, onError, rejectError]);
    useEffect(() => {
        if (filterQueryTask.status === "error") {
            onError === null || onError === void 0 ? void 0 : onError(filterQueryTask.error);
        }
    }, [filterQueryTask.error, filterQueryTask.status, onError]);
    if (filterQueryTask.status === "pending" || dataViewTask.status === "pending") {
        return {
            error: undefined,
            result: undefined,
            status: "pending",
        };
    }
    if (filterQueryTask.status === "running" || dataViewTask.status === "loading") {
        return {
            error: undefined,
            result: undefined,
            status: "loading",
        };
    }
    if (filterQueryTask.status === "error" || dataViewTask.status === "error") {
        return {
            error: ((_a = filterQueryTask.error) !== null && _a !== void 0 ? _a : dataViewTask.error),
            result: undefined,
            status: "error",
        };
    }
    if (filterQueryTask.status === "rejected") {
        return {
            error: rejectError,
            result: undefined,
            status: "error",
        };
    }
    return {
        error: undefined,
        result: dataViewTask.result,
        status: "success",
    };
}
//# sourceMappingURL=useCustomWidgetExecutionDataView.js.map