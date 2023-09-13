/// <reference types="react" />
import { IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { IWithLoadingEvents, WithLoadingResult, DataViewWindow } from "./withExecutionLoading.js";
/**
 * Configuration for the withExecution HOC. All configuration parameters can be either actual parameter values
 * or functions to obtain them from the wrapped component props.
 *
 * If functions are specified, the HOC will call them with the wrapped component props as parameter and then use
 * the resulting values as if they were passed directly.
 *
 * @internal
 */
export interface IWithExecution<T> {
    /**
     * Specify execution that the HOC will drive.
     */
    execution: IPreparedExecution | ((props: T) => IPreparedExecution) | ((props: T) => Promise<IPreparedExecution>);
    /**
     * Specify export title that will be used unless the export function caller sends their own custom title.
     *
     * @param props - props to retrieve export title from
     */
    exportTitle: string | ((props: T) => string);
    /**
     * Customize data window to load.
     *
     * By default the HOC loads all the data available in the execution's result.
     */
    window?: DataViewWindow | ((props: T) => DataViewWindow | undefined);
    /**
     * Specify event callbacks which the HOC will trigger in different situations.
     */
    events?: IWithLoadingEvents<T> | ((props: T) => IWithLoadingEvents<T>);
    /**
     * Customize, whether execution & data loading should start as soon as component is mounted.
     *
     * @remarks
     * Default is true. When not loading on mount, the wrapped component can trigger the load by calling the
     * reload() function which the HOC injects into its props.
     */
    loadOnMount?: boolean | ((props: T) => boolean);
    /**
     * Specify function that will be called during component prop updates and will be used to
     * determine whether execution should be re-run and data reloaded.
     *
     * @param prevProps - previous props
     * @param nextProps - next props
     */
    shouldRefetch?: (prevProps: T, nextProps: T) => boolean;
}
/**
 * A React HOC that for driving an execution to get data view that can be visualized.
 *
 * Note that if the resulting data is empty this will NOT throw a NoDataError.
 *
 * @internal
 */
export declare function withExecution<T>(params: IWithExecution<T>): (WrappedComponent: React.ComponentType<T & WithLoadingResult>) => React.ComponentClass<T, any>;
//# sourceMappingURL=withExecution.d.ts.map