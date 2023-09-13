// (C) 2019-2022 GoodData Corporation
var _a, _b;
import { DataAccessImpl } from "./dataAccessImpl.js";
import { DefaultDataAccessConfig } from "../dataAccessConfig.js";
import { measureLocalId, } from "@gooddata/sdk-model";
class FilteredIterator {
    constructor(indexes, itemProvider) {
        this.indexes = indexes;
        this.itemProvider = itemProvider;
        this.idx = 0;
        this.next = () => {
            if (this.idx >= this.indexes.length) {
                return {
                    done: true,
                    value: undefined,
                };
            }
            const value = this.itemProvider(this.indexes[this.idx]);
            this.idx += 1;
            return {
                done: false,
                value,
            };
        };
    }
}
class DataSeriesCollection {
    constructor(dataAccess) {
        this.dataAccess = dataAccess;
        this.count = 0;
        this.fromMeasures = [];
        this.fromMeasuresDef = [];
        this.scopingAttributes = [];
        this.scopingAttributesDef = [];
        this[_a] = () => {
            return this.dataAccess.getDataSeriesIterator();
        };
        this.allForMeasure = (localIdOrMeasure) => {
            if (!this.count) {
                return [];
            }
            const localId = typeof localIdOrMeasure === "string" ? localIdOrMeasure : measureLocalId(localIdOrMeasure);
            const indexes = this.dataAccess.findDataSeriesIndexes(localId);
            if (!indexes.length) {
                return [];
            }
            return {
                [Symbol.iterator]: () => {
                    return new FilteredIterator(indexes, this.dataAccess.getDataSeries);
                },
            };
        };
        this.firstForMeasure = (localIdOrMeasure) => {
            if (!this.count) {
                throw new Error("there are no data series");
            }
            const localId = typeof localIdOrMeasure === "string" ? localIdOrMeasure : measureLocalId(localIdOrMeasure);
            const indexes = this.dataAccess.findDataSeriesIndexes(localId);
            if (!indexes.length) {
                throw new Error(`there are no data series for measure with local id: ${localId}`);
            }
            return this.dataAccess.getDataSeries(indexes[0]);
        };
        this.toArray = () => {
            return Array.from(this);
        };
        const seriesDigest = this.dataAccess.getDataAccessPointers().series;
        if (!seriesDigest) {
            return;
        }
        this.count = seriesDigest.count;
        this.fromMeasures = seriesDigest.fromMeasures;
        this.fromMeasuresDef = seriesDigest.fromMeasuresDef;
        this.scopingAttributes = seriesDigest.scopingAttributes;
        this.scopingAttributesDef = seriesDigest.scopingAttributesDef;
    }
}
_a = Symbol.iterator;
class DataSliceCollection {
    constructor(dataAccess) {
        this.dataAccess = dataAccess;
        this.count = 0;
        this.descriptors = [];
        this[_b] = () => {
            return this.dataAccess.getDataSlicesIterator();
        };
        this.toArray = () => {
            return Array.from(this);
        };
        const slicesDigest = this.dataAccess.getDataAccessPointers().slices;
        if (!slicesDigest) {
            return;
        }
        this.count = slicesDigest.count;
        this.descriptors = slicesDigest.descriptors;
    }
}
_b = Symbol.iterator;
class DataAccessMethods {
    constructor(dataView, config) {
        this.dataAccess = new DataAccessImpl(dataView, config);
        this.seriesCollection = new DataSeriesCollection(this.dataAccess);
        this.slicesCollection = new DataSliceCollection(this.dataAccess);
    }
    series() {
        return this.seriesCollection;
    }
    slices() {
        return this.slicesCollection;
    }
}
/**
 * @internal
 */
export function newDataAccessMethods(dataView, config = DefaultDataAccessConfig) {
    return new DataAccessMethods(dataView, config);
}
//# sourceMappingURL=dataAccessMethods.js.map