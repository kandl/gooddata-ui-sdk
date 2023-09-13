// (C) 2022 GoodData Corporation
import { useMemo } from "react";
import { isNoDataError } from "@gooddata/sdk-backend-spi";
import { DataViewFacade, isNoDataSdkError, useExecutionDataView, } from "@gooddata/sdk-ui";
import compact from "lodash/compact.js";
/**
 * Wrapper around useExecutionDataView that does not treat no data errors as errors.
 * This allows formats for empty values to come into play when no data is returned.
 */
export function useKpiExecutionDataView(config) {
    const { primaryMeasure, backend, effectiveFilters, secondaryMeasure, workspace, shouldLoad } = config;
    const response = useExecutionDataView({
        backend,
        workspace,
        execution: shouldLoad
            ? {
                seriesBy: compact([primaryMeasure, secondaryMeasure]),
                filters: effectiveFilters,
            }
            : undefined,
    });
    return useMemo(() => {
        // do not treat no data as error here to give the user a chance to decide if no data is ok or not
        // instead return facade for the empty dataView provided by the error (it still has useful info
        // like measure format, name, etc.)
        if (response.status === "error" &&
            isNoDataSdkError(response.error) &&
            isNoDataError(response.error.cause) &&
            response.error.cause.dataView) {
            return {
                result: DataViewFacade.for(response.error.cause.dataView),
                error: undefined,
                status: "success",
            };
        }
        return response;
    }, [response]);
}
//# sourceMappingURL=useKpiExecutionDataView.js.map