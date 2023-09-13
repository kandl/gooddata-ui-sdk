import { isNoDataError, isUnexpectedResponseError, } from "@gooddata/sdk-backend-spi";
import { COLS_PER_PAGE } from "./base/constants.js";
import { getAvailableDrillTargets } from "./drilling/drillTargets.js";
import { convertError, DataViewFacade } from "@gooddata/sdk-ui";
import { invariant } from "ts-invariant";
import { TableFacade } from "./tableFacade.js";
export class TableFacadeInitializer {
    constructor(execution, tableMethods, props) {
        this.execution = execution;
        this.tableMethods = tableMethods;
        this.props = props;
        this.abandoned = false;
        /**
         * Abandon the initialization. This will not cancel any requests that may be already in-flight. It will
         * ensure though that no events will be emitted and that the initalization ends with `undefined` result.
         */
        this.abandon = () => {
            invariant(!this.abandoned);
            this.abandoned = true;
        };
        /**
         * Drives initialization of the table facade. The initialization will emit all the essential
         * loading, error, onExportReady and pushData events using the callback functions specified in the {@link TableDataCallbacks}.
         *
         * If the initialization was abandoned at the right time, the result is 'undefined'. Otherwise the result
         * contains pointer to the initializer instance and the table facade itself.
         *
         * To prevent race conditions in situations when caller may create, start and abandon multiple initializations,
         * it is essential for the caller to check that the initialization result belongs to the currently active
         * initializer.
         */
        this.initialize = () => {
            const { execution, tableMethods } = this;
            tableMethods.onLoadingChanged({ isLoading: true });
            return execution
                .execute()
                .then((result) => {
                return result
                    .readWindow([0, 0], [this.props.pageSize, COLS_PER_PAGE])
                    .then((dataView) => {
                    if (this.abandoned) {
                        /*
                         * Stop right now if the component gets unmounted while it is still being
                         * initialized.
                         */
                        return undefined;
                    }
                    const table = this.createTableFacade(result, dataView);
                    tableMethods.onLoadingChanged({ isLoading: false });
                    tableMethods.onExportReady(table.createExportFunction(this.props.exportTitle));
                    const availableDrillTargets = table.getAvailableDrillTargets();
                    tableMethods.pushData({ dataView, availableDrillTargets });
                    return {
                        initializer: this,
                        table,
                    };
                })
                    .catch((error) => {
                    if (this.abandoned) {
                        return undefined;
                    }
                    /**
                     * When execution result is received successfully,
                     * but data load fails with unexpected http response,
                     * we still want to push availableDrillTargets
                     */
                    if (isUnexpectedResponseError(error)) {
                        const availableDrillTargets = getAvailableDrillTargets(DataViewFacade.forResult(result), tableMethods.getMeasureGroupDimension(), tableMethods.getColumnHeadersPosition());
                        this.props.pushData({ availableDrillTargets });
                    }
                    /*
                     * There can be situations, where there is no data to visualize but the result / dataView contains
                     * metadata essential for setup of drilling. Look for that and if available push up.
                     */
                    if (isNoDataError(error) && error.dataView) {
                        const availableDrillTargets = getAvailableDrillTargets(DataViewFacade.for(error.dataView), tableMethods.getMeasureGroupDimension(), tableMethods.getColumnHeadersPosition());
                        tableMethods.pushData({ availableDrillTargets });
                        tableMethods.onLoadingChanged({ isLoading: false });
                    }
                    tableMethods.onError(convertError(error), this.execution);
                });
            })
                .catch((error) => {
                if (this.abandoned) {
                    return undefined;
                }
                tableMethods.onError(convertError(error), this.execution);
            });
        };
        this.createTableFacade = (result, dataView) => {
            return new TableFacade(result, dataView, this.tableMethods, this.props);
        };
    }
    /**
     * Tests whether the other execution is the same as the one used by the initializer.
     *
     * @param other - other execution to test
     */
    isSameExecution(other) {
        return this.execution.fingerprint() === other.fingerprint();
    }
}
//# sourceMappingURL=tableFacadeInitializer.js.map