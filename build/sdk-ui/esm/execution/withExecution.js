// (C) 2019-2022 GoodData Corporation
import { isNoDataError } from "@gooddata/sdk-backend-spi";
import { withExecutionLoading, } from "./withExecutionLoading.js";
import { DataViewFacade } from "../base/index.js";
/**
 * A React HOC that for driving an execution to get data view that can be visualized.
 *
 * Note that if the resulting data is empty this will NOT throw a NoDataError.
 *
 * @internal
 */
export function withExecution(params) {
    const { execution, events, loadOnMount, shouldRefetch, window, exportTitle } = params;
    return (WrappedComponent) => {
        const withLoadingParams = {
            promiseFactory: async (props, window) => {
                const _execution = typeof execution === "function" ? await execution(props) : execution;
                const executionResult = await _execution.execute();
                try {
                    const dataView = !window
                        ? await executionResult.readAll()
                        : await executionResult.readWindow(window.offset, window.size);
                    return DataViewFacade.for(dataView);
                }
                catch (err) {
                    // do not treat no data as error here to give the user a chance to decide if no data is ok or not
                    if (isNoDataError(err) && err.dataView) {
                        return DataViewFacade.for(err.dataView);
                    }
                    throw err;
                }
            },
            exportTitle,
            loadOnMount,
            events,
            shouldRefetch,
            window,
        };
        return withExecutionLoading(withLoadingParams)(WrappedComponent);
    };
}
//# sourceMappingURL=withExecution.js.map