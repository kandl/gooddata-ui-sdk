import { IAttribute, IAttributeOrMeasure, INullableFilter, ISortItem, ITotal } from "@gooddata/sdk-model";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { DataViewWindow } from "./withExecutionLoading.js";
import { DataViewFacade } from "../base/index.js";
/**
 * DataViewLoader allows you to speficy, load and access data results with convenient series and slices API.
 *
 * @alpha
 */
export declare class DataViewLoader {
    private readonly backend;
    private readonly workspace;
    private readonly options;
    private constructor();
    /**
     * Creates a new instance of the DataViewLoader for particular backend and workspace.
     *
     * @alpha
     */
    static for(backend: IAnalyticalBackend, workspace: string): DataViewLoader;
    /**
     * Data series will be built using the provided measures that are further scoped for
     * elements of the specified attributes.
     *
     * @remarks
     * You must define at least 1 measure for the series.
     *
     * @alpha
     */
    seriesFrom: (...measuresAndScopingAttributes: IAttributeOrMeasure[]) => DataViewLoader;
    /**
     * Slice all data series by elements of these attributes.
     *
     * @alpha
     */
    slicesFrom: (...attributes: IAttribute[]) => DataViewLoader;
    /**
     * Filters to apply on server side.
     *
     * @alpha
     */
    filterBy: (...filters: INullableFilter[]) => DataViewLoader;
    /**
     * Sorting to apply on server side.
     *
     * @alpha
     */
    sortBy: (...sorts: ISortItem[]) => DataViewLoader;
    /**
     * Include these totals among the data slices.
     *
     * @alpha
     */
    withTotals: (...totals: ITotal[]) => DataViewLoader;
    /**
     * Loads subset of the result data and wraps them in {@link DataViewFacade}.
     *
     * @alpha
     */
    loadWindow: (dataWindow: DataViewWindow) => Promise<DataViewFacade>;
    /**
     * Loads all the result data and wraps them in {@link DataViewFacade}.
     *
     * @alpha
     */
    loadAll: () => Promise<DataViewFacade>;
    private loadResult;
    private newLoaderWithOptions;
}
//# sourceMappingURL=DataViewLoader.d.ts.map