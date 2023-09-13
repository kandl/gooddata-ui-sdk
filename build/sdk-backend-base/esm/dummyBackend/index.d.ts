import { IAnalyticalBackendConfig, IAnalyticalBackend, IDataView, IExecutionResult } from "@gooddata/sdk-backend-spi";
import { IExecutionDefinition } from "@gooddata/sdk-model";
/**
 * @internal
 */
export type DummyBackendConfig = IAnalyticalBackendConfig & {
    /**
     * Influences whether readAll() / readWindow() should throw NoDataError() or return empty data view.
     *
     * The empty data view is returned by default - and can be used in tests that verify definition parts of
     * the returned data view.
     *
     * Throwing NoDataError is closer to how normal backends behave.
     *
     * If set to "without-data-view", it will throw NoDataErrors without a DataView.
     * If set to "with-data-view", it will throw NoDataErrors with a DataView.
     */
    raiseNoDataExceptions: false | "without-data-view" | "with-data-view";
};
/**
 *
 */
export declare const defaultDummyBackendConfig: DummyBackendConfig;
/**
 * Returns dummy backend - this backend focuses on the execution 'branch' of the SPI. it implements
 * execution factory and prepared execution so that clients receive NoData exception when trying to obtain
 * results.
 *
 * This implementation is suitable when testing code which builds and configures an instance of IPreparedExecution or
 * testing component behavior when backend returns no results.
 *
 * @remarks see {@link dummyBackendEmptyData} for a variant of dummy backend
 * @param config - Provide configuration of the backend (host/user)
 * @internal
 */
export declare function dummyBackend(config?: DummyBackendConfig): IAnalyticalBackend;
/**
 * Convenience function to create a dummy backend configured to NOT throw exceptions when client requests
 * data view. Instead, it returns an empty data view (which does not follow the SPI contract...)
 *
 * While this behavior violates contract of the SPI, a backend configured in this way is suitable for
 * particular test scenarios - for instance in tests that exercise logic which only works with IDataView's
 * execution definition.
 *
 * @internal
 */
export declare function dummyBackendEmptyData(): IAnalyticalBackend;
/**
 * Creates a new, empty data view for the provided execution definition. The definition will be retained as-is, data
 * will be empty.
 *
 * @param definition - execution definition
 * @param result - A result to link with the data view, if not provided an execution result will be
 *  created
 * @param config - Override config that will be passed to exec result that may be created for the
 *  data view (it is needed there in order to correctly handle readAll() and read()); config will not be used
 *  if the `result` parameter is provided explicitly
 * @returns new instance of data view
 * @internal
 */
export declare function dummyDataView(definition: IExecutionDefinition, result?: IExecutionResult, config?: DummyBackendConfig): IDataView;
//# sourceMappingURL=index.d.ts.map