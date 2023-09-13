import { IDataView } from "@gooddata/sdk-backend-spi";
import { IDataSeries, IDataSlice } from "../dataAccess.js";
import { DataAccessDigest } from "./dataAccessDigest.js";
import { DataAccessConfig } from "../dataAccessConfig.js";
/**
 * This class holds the underlying implementation of data access methods. The code is designed to follow
 * lazy initialization principles. The various data structures (slices, series, their descriptors etc) are
 * only created when needed.
 *
 * The responsibilities of this class is to operate on top of digest & data stored in the data view and
 * from information therein create descriptors for series, slices and then series and slices itself. It also
 * makes access to underlying data transparent - hiding the detail whether series and slices have their
 * data organized in row→col or col→row.
 */
export declare class DataAccessImpl {
    private readonly dataView;
    private readonly config;
    private readonly digest;
    private readonly seriesDescriptors;
    private readonly slicesDescriptors;
    private readonly series;
    private readonly slices;
    private readonly accessors;
    constructor(dataView: IDataView, config: DataAccessConfig);
    getDataAccessPointers: () => DataAccessDigest;
    getDataSeriesIterator: () => Iterator<IDataSeries>;
    getDataSlicesIterator: () => Iterator<IDataSlice>;
    getDataSeries: (idx: number) => IDataSeries;
    findDataSeriesIndexes: (localId: string) => number[];
    private getRawData;
    private getDataAt;
    private createDataSeriesDescriptor;
    private createDataSliceDescriptor;
    private createDataSeries;
    private createDataSlice;
}
//# sourceMappingURL=dataAccessImpl.d.ts.map