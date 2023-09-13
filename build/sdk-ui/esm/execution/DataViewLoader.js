// (C) 2019-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { createExecution } from "./createExecution.js";
import { DataViewFacade } from "../base/index.js";
/**
 * DataViewLoader allows you to speficy, load and access data results with convenient series and slices API.
 *
 * @alpha
 */
export class DataViewLoader {
    constructor(backend, workspace, options = {}) {
        this.backend = backend;
        this.workspace = workspace;
        this.options = options;
        /**
         * Data series will be built using the provided measures that are further scoped for
         * elements of the specified attributes.
         *
         * @remarks
         * You must define at least 1 measure for the series.
         *
         * @alpha
         */
        this.seriesFrom = (...measuresAndScopingAttributes) => {
            return this.newLoaderWithOptions({ seriesBy: measuresAndScopingAttributes });
        };
        /**
         * Slice all data series by elements of these attributes.
         *
         * @alpha
         */
        this.slicesFrom = (...attributes) => {
            return this.newLoaderWithOptions({ slicesBy: attributes });
        };
        /**
         * Filters to apply on server side.
         *
         * @alpha
         */
        this.filterBy = (...filters) => {
            return this.newLoaderWithOptions({ filters });
        };
        /**
         * Sorting to apply on server side.
         *
         * @alpha
         */
        this.sortBy = (...sorts) => {
            return this.newLoaderWithOptions({ sortBy: sorts });
        };
        /**
         * Include these totals among the data slices.
         *
         * @alpha
         */
        this.withTotals = (...totals) => {
            return this.newLoaderWithOptions({ totals });
        };
        /**
         * Loads subset of the result data and wraps them in {@link DataViewFacade}.
         *
         * @alpha
         */
        this.loadWindow = async (dataWindow) => {
            const result = await this.loadResult();
            const dataView = await result.readWindow(dataWindow.offset, dataWindow.size);
            return DataViewFacade.for(dataView);
        };
        /**
         * Loads all the result data and wraps them in {@link DataViewFacade}.
         *
         * @alpha
         */
        this.loadAll = async () => {
            const result = await this.loadResult();
            const dataView = await result.readAll();
            return DataViewFacade.for(dataView);
        };
        this.loadResult = async () => {
            invariant(this.options.seriesBy, "You need to specify series before loading the results.");
            const execution = createExecution(Object.assign({ backend: this.backend, workspace: this.workspace, seriesBy: this.options.seriesBy, componentName: "DataViewLoader" }, this.options));
            return execution.execute();
        };
        this.newLoaderWithOptions = (options) => {
            return new DataViewLoader(this.backend, this.workspace, Object.assign(Object.assign({}, this.options), options));
        };
    }
    /**
     * Creates a new instance of the DataViewLoader for particular backend and workspace.
     *
     * @alpha
     */
    static for(backend, workspace) {
        return new DataViewLoader(backend, workspace);
    }
}
//# sourceMappingURL=DataViewLoader.js.map