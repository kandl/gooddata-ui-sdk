import { IExecutionDefinition, IResultWarning } from "@gooddata/sdk-model";
import { IDataView, IExecutionResult } from "@gooddata/sdk-backend-spi";
import { DataAccessConfig } from "./dataAccessConfig.js";
import { IExecutionDefinitionMethods } from "./internal/definitionMethods.js";
import { IResultMetaMethods } from "./internal/resultMetaMethods.js";
import { IResultDataMethods } from "./internal/resultDataMethods.js";
import { IDataAccessMethods } from "./dataAccess.js";
/**
 * Wrapper for {@link @gooddata/sdk-backend-spi#IDataView}.
 *
 * @remarks
 * This provides various convenience methods to work with data and metadata stored inside
 * the provided instance of {@link @gooddata/sdk-backend-spi#IDataView}.
 *
 * The facade keeps an ephemeral state - such as calculated indexes on top of the headers in the {@link @gooddata/sdk-backend-spi#IDataView} -
 * to optimize performance of often-used lookups at the cost of extra memory.
 *
 * The facade is part of the public API and we strongly recommend to use it whenever client code needs to work with
 * data view; ideally, single instance of data view facade
 *
 * @public
 */
export declare class DataViewFacade {
    readonly dataView: IDataView;
    private static Facades;
    private static FacadesForResult;
    readonly definition: IExecutionDefinition;
    private definitionMethods;
    private resultMetaMethods;
    private resultDataMethods;
    private dataAccessMethods;
    protected constructor(dataView: IDataView);
    /**
     * @param dataView - instance of data view to create the facade for
     * @public
     */
    static for(dataView: IDataView): DataViewFacade;
    /**
     * Creates a DataViewFacade with provided execution result.
     *
     * @remarks
     * Only use this when execution result is unable to load data and some
     * form of DataViewFacade is still needed. Beware that the calculated data view is empty after the creation. Only execution
     * definition and result is defined.
     *
     * @param result - instance of execution result to create the facade for
     * @public
     */
    static forResult(result: IExecutionResult): DataViewFacade;
    /**
     * @returns result of execution which returned this data view
     * @public
     */
    result(): IExecutionResult;
    /**
     * @returns execution result warnings
     * @public
     */
    warnings(): IResultWarning[];
    /**
     * @remarks see {@link @gooddata/sdk-backend-spi#IDataView.fingerprint} for more contractual information
     * @returns fingerprint of the data view
     * @public
     */
    fingerprint(): string;
    /**
     * @returns methods to access data in a curated fashion using data slices and data series iterators
     * @public
     */
    data(config?: DataAccessConfig): IDataAccessMethods;
    /**
     * @returns methods to work with execution definition
     * @internal
     */
    def(): IExecutionDefinitionMethods;
    /**
     * @returns methods to work with result metadata
     * @internal
     */
    meta(): IResultMetaMethods;
    /**
     * @returns methods to work with the raw data included in the result
     * @internal
     */
    rawData(): IResultDataMethods;
}
/**
 * Constructs an empty data view with given execution result.
 *
 * @param result - execution result
 * @returns data view
 * @public
 */
export declare function emptyDataViewForResult(result: IExecutionResult): IDataView;
//# sourceMappingURL=facade.d.ts.map