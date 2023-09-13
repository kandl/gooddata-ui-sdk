// (C) 2019-2022 GoodData Corporation
import { defFingerprint } from "@gooddata/sdk-model";
import { newExecutionDefinitonMethods } from "./internal/definitionMethods.js";
import { newResultMetaMethods } from "./internal/resultMetaMethods.js";
import { newResultDataMethods } from "./internal/resultDataMethods.js";
import { newDataAccessMethods } from "./internal/dataAccessMethods.js";
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
class DataViewFacade {
    constructor(dataView) {
        this.dataView = dataView;
        this.definition = dataView.definition;
    }
    //
    // Own methods
    //
    /**
     * @param dataView - instance of data view to create the facade for
     * @public
     */
    static for(dataView) {
        if (!DataViewFacade.Facades.has(dataView)) {
            DataViewFacade.Facades.set(dataView, new DataViewFacade(dataView));
        }
        return DataViewFacade.Facades.get(dataView);
    }
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
    static forResult(result) {
        if (!DataViewFacade.FacadesForResult.has(result)) {
            const emptyView = emptyDataViewForResult(result);
            DataViewFacade.FacadesForResult.set(result, new DataViewFacade(emptyView));
        }
        return DataViewFacade.FacadesForResult.get(result);
    }
    /**
     * @returns result of execution which returned this data view
     * @public
     */
    result() {
        return this.dataView.result;
    }
    /**
     * @returns execution result warnings
     * @public
     */
    warnings() {
        var _a;
        return (_a = this.dataView.warnings) !== null && _a !== void 0 ? _a : [];
    }
    /**
     * @remarks see {@link @gooddata/sdk-backend-spi#IDataView.fingerprint} for more contractual information
     * @returns fingerprint of the data view
     * @public
     */
    fingerprint() {
        return this.dataView.fingerprint();
    }
    /**
     * @returns methods to access data in a curated fashion using data slices and data series iterators
     * @public
     */
    data(config) {
        if (!this.dataAccessMethods) {
            this.dataAccessMethods = newDataAccessMethods(this.dataView, config);
        }
        return this.dataAccessMethods;
    }
    //
    //
    //
    /**
     * @returns methods to work with execution definition
     * @internal
     */
    def() {
        if (!this.definitionMethods) {
            this.definitionMethods = newExecutionDefinitonMethods(this.dataView.definition);
        }
        return this.definitionMethods;
    }
    /**
     * @returns methods to work with result metadata
     * @internal
     */
    meta() {
        if (!this.resultMetaMethods) {
            this.resultMetaMethods = newResultMetaMethods(this.dataView);
        }
        return this.resultMetaMethods;
    }
    /**
     * @returns methods to work with the raw data included in the result
     * @internal
     */
    rawData() {
        if (!this.resultDataMethods) {
            this.resultDataMethods = newResultDataMethods(this.dataView);
        }
        return this.resultDataMethods;
    }
}
DataViewFacade.Facades = new WeakMap();
DataViewFacade.FacadesForResult = new WeakMap();
export { DataViewFacade };
/**
 * Constructs an empty data view with given execution result.
 *
 * @param result - execution result
 * @returns data view
 * @public
 */
export function emptyDataViewForResult(result) {
    const { definition } = result;
    const fp = defFingerprint(definition) + "/emptyView";
    return {
        definition,
        result,
        headerItems: [],
        data: [],
        offset: [0, 0],
        count: [0, 0],
        totalCount: [0, 0],
        fingerprint() {
            return fp;
        },
        equals(other) {
            return fp === other.fingerprint();
        },
    };
}
//# sourceMappingURL=facade.js.map