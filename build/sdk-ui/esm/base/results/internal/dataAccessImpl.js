// (C) 2019-2023 GoodData Corporation
var _a, _b;
import { isResultTotalHeader, resultHeaderName, } from "@gooddata/sdk-model";
import { createDataAccessDigest } from "./dataAccessDigest.js";
import { LazyInitArray } from "./lazyInitArray.js";
import { invariant, InvariantError } from "ts-invariant";
import { getTotalInfo, measureFormat, measureName } from "./utils.js";
import partial from "lodash/partial.js";
import isArray from "lodash/isArray.js";
/**
 * Iterates over single-dimensional result and returns values as data points.
 */
class SingleDimIterator {
    constructor(seriesIdx, accessors, config) {
        this.seriesIdx = seriesIdx;
        this.accessors = accessors;
        this.config = config;
        this.next = () => {
            if (this.returned) {
                return {
                    done: true,
                    value: undefined,
                };
            }
            /*
             * Set series and slices indexes accordingly. If iterator is over series, then base
             * is index of series and offset is index of slice. Similar for slice..
             */
            const { rawValue, coordinates } = this.accessors.dataAt(this.seriesIdx);
            const { valueFormatter } = this.config;
            const seriesDesc = this.accessors.seriesDescriptors(this.seriesIdx);
            const measureFormat = seriesDesc.measureFormat();
            this.returned = true;
            return {
                done: false,
                value: {
                    rawValue,
                    seriesDesc,
                    coordinates,
                    total: false,
                    formattedValue() {
                        return valueFormatter(rawValue, measureFormat);
                    },
                },
            };
        };
        this.returned = false;
    }
}
/**
 * Iterates over two-dimensional data and returns values as data points.
 */
class TwoDimIterator {
    constructor(type, baseIdx, digest, accessors, config) {
        this.type = type;
        this.baseIdx = baseIdx;
        this.digest = digest;
        this.accessors = accessors;
        this.config = config;
        this.next = () => {
            if (this.offset >= this.offsetEnd) {
                return {
                    done: true,
                    value: undefined,
                };
            }
            /*
             * Set series and slices indexes accordingly. If iterator is over series, then base
             * is index of series and offset is index of slice. Similar for type "slice".
             */
            const seriesIdx = this.type === "series" ? this.baseIdx : this.offset;
            const sliceIdx = this.type === "slice" ? this.baseIdx : this.offset;
            const { rawValue, coordinates } = this.accessors.dataAt(this.baseIdx, this.offset);
            const { valueFormatter } = this.config;
            const seriesDesc = this.accessors.seriesDescriptors(seriesIdx);
            const sliceDesc = this.accessors.sliceDescriptors(sliceIdx);
            const measureFormat = seriesDesc.measureFormat();
            this.offset += 1;
            return {
                done: false,
                value: {
                    rawValue,
                    seriesDesc,
                    sliceDesc,
                    coordinates,
                    total: sliceDesc.isTotal,
                    formattedValue() {
                        return valueFormatter(rawValue, measureFormat);
                    },
                },
            };
        };
        this.offset = 0;
        if (this.type === "series") {
            this.offsetEnd = this.digest.slices.count;
        }
        else {
            this.offsetEnd = this.digest.series.count;
        }
    }
}
class DataSeries {
    constructor(seriesIdx, digest, accessors, config) {
        this.seriesIdx = seriesIdx;
        this.digest = digest;
        this.accessors = accessors;
        this.config = config;
        this.measureFormat = () => {
            return this.descriptor.measureFormat();
        };
        this.measureTitle = () => {
            return this.descriptor.measureTitle();
        };
        this.scopeTitles = () => {
            return this.descriptor.scopeTitles();
        };
        this.rawData = () => {
            if (!this.rawDataValues) {
                this.rawDataValues = this.accessors.rawData(this.seriesIdx);
            }
            return this.rawDataValues;
        };
        this.dataPoints = () => {
            if (!this.dataPointsArray) {
                this.dataPointsArray = Array.from(this);
            }
            return this.dataPointsArray;
        };
        this[_a] = () => {
            const { slices } = this.digest;
            /*
             * Note here: code accounts for two invariants:
             *
             * 1. truly a single-dim result - data is array of values
             * 2. weird single-dim result - the slices dimension is empty, contains no attributes to slice by. in that case
             *    the data view is an array-in-array. the result is essentially single-dimensional however is wrapped
             *    in another array. the dataAt accessor impl can handle this
             */
            if (slices === undefined || (slices.dimIdx >= 0 && slices.count === 0)) {
                return new SingleDimIterator(this.seriesIdx, this.accessors, this.config);
            }
            return new TwoDimIterator("series", this.seriesIdx, this.digest, this.accessors, this.config);
        };
        this.descriptor = this.accessors.seriesDescriptors(this.seriesIdx);
        this.id = this.descriptor.id;
    }
}
_a = Symbol.iterator;
class DataSlice {
    constructor(sliceIdx, digest, accessors, config) {
        this.sliceIdx = sliceIdx;
        this.digest = digest;
        this.accessors = accessors;
        this.config = config;
        this.sliceTitles = () => {
            return this.descriptor.sliceTitles();
        };
        this.rawData = () => {
            if (!this.rawDataValues) {
                this.rawDataValues = this.accessors.rawData(this.sliceIdx);
            }
            return this.rawDataValues;
        };
        // eslint-disable-next-line sonarjs/no-identical-functions
        this.dataPoints = () => {
            if (!this.dataPointsArray) {
                this.dataPointsArray = Array.from(this);
            }
            return this.dataPointsArray;
        };
        this[_b] = () => {
            if (!this.digest.series) {
                /*
                 * If there are no data series, there are no measures and therefore there
                 * are no data points to iterate over.
                 */
                return [][Symbol.iterator]();
            }
            return new TwoDimIterator("slice", this.sliceIdx, this.digest, this.accessors, this.config);
        };
        this.descriptor = this.accessors.sliceDescriptors(this.sliceIdx);
        this.id = this.descriptor.id;
    }
}
_b = Symbol.iterator;
function illegalState(message) {
    return () => {
        throw new InvariantError(message);
    };
}
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
export class DataAccessImpl {
    constructor(dataView, config) {
        var _c, _d;
        this.getDataAccessPointers = () => {
            return this.digest;
        };
        this.getDataSeriesIterator = () => {
            return this.series[Symbol.iterator]();
        };
        this.getDataSlicesIterator = () => {
            return this.slices[Symbol.iterator]();
        };
        this.getDataSeries = (idx) => {
            return this.series.get(idx);
        };
        this.findDataSeriesIndexes = (localId) => {
            const { series: seriesDigest } = this.digest;
            if (!seriesDigest) {
                return [];
            }
            return seriesDigest.measureIndexes[localId] || [];
        };
        this.getRawData = (fromDimIdx, idx) => {
            if (fromDimIdx === 1) {
                /*
                 * Need to extract data from particular columns of two-dim data. Go through all rows, from
                 * each row take value at the desired column's index.
                 */
                return this.dataView.data.map((row) => {
                    return row[idx];
                });
            }
            else {
                /*
                 * Either extracting row from two-dim result or extracting single value from one-dim result
                 */
                const value = this.dataView.data[idx];
                if (isArray(value)) {
                    /*
                     * Two-dim result, return as-is
                     */
                    return value;
                }
                else {
                    /*
                     * Single-dim result, return wrapped
                     */
                    return [value];
                }
            }
        };
        this.getDataAt = (fromDimIdx, idx, seq = 0) => {
            if (fromDimIdx === 1) {
                /*
                 * Want data from column. Get `idx` column value in of `seq` row
                 */
                const twoDimData = this.dataView.data;
                return { rawValue: twoDimData[seq][idx], coordinates: [seq, idx] };
            }
            else {
                const value = this.dataView.data[idx];
                if (isArray(value)) {
                    return { rawValue: value[seq], coordinates: [idx, seq] };
                }
                else {
                    invariant(seq === 0, "trying to get row-col from single dim result");
                    return { rawValue: value, coordinates: [idx] };
                }
            }
        };
        this.createDataSeriesDescriptor = (seriesIdx) => {
            var _c, _d;
            const { series: seriesDigest } = this.digest;
            invariant(seriesDigest, "trying to create data series descriptor when there are no data series");
            const { fromMeasures, fromMeasuresDef, measureHeaders, allAttributeHeaders, scopingAttributes, scopingAttributesDef, } = seriesDigest;
            const measureHeader = measureHeaders[seriesIdx];
            let measureIndex = ((_c = measureHeader === null || measureHeader === void 0 ? void 0 : measureHeader.measureHeaderItem) === null || _c === void 0 ? void 0 : _c.order) || 0;
            if (isResultTotalHeader(measureHeader)) {
                // total headers are mixed with measure headers, linking to measure index
                measureIndex = ((_d = measureHeader === null || measureHeader === void 0 ? void 0 : measureHeader.totalHeaderItem) === null || _d === void 0 ? void 0 : _d.measureIndex) || 0;
            }
            const attributeHeaders = allAttributeHeaders.map((headers) => headers[seriesIdx]);
            const measureDescriptor = fromMeasures[measureIndex];
            const measureDefinition = fromMeasuresDef[measureIndex];
            const { headerTranslator } = this.config;
            const { isTotal, isSubtotal } = getTotalInfo(attributeHeaders);
            return {
                id: `${seriesIdx}`,
                measureDescriptor,
                measureDefinition,
                attributeDescriptors: scopingAttributes,
                attributeDefinitions: scopingAttributesDef,
                measureHeader,
                attributeHeaders,
                isTotal,
                isSubtotal,
                measureFormat: () => {
                    return measureFormat(measureDescriptor);
                },
                measureTitle: () => {
                    return measureName(measureDescriptor);
                },
                scopeTitles: () => {
                    if (!headerTranslator) {
                        return attributeHeaders.map(resultHeaderName);
                    }
                    return attributeHeaders.map((h) => headerTranslator(resultHeaderName(h)));
                },
            };
        };
        this.createDataSliceDescriptor = (sliceIdx) => {
            const { slices: slicesDigest } = this.digest;
            invariant(slicesDigest, "trying to create data slice descriptor when there are no data slices");
            const { descriptors, headerItems, descriptorsDef } = slicesDigest;
            const headers = [];
            const { headerTranslator } = this.config;
            let total = false;
            headerItems.forEach((h) => {
                const header = h[sliceIdx];
                headers.push(header);
                if (isResultTotalHeader(header)) {
                    total = true;
                }
            });
            return {
                id: `${sliceIdx}`,
                descriptors,
                definitions: descriptorsDef,
                headers,
                isTotal: total,
                sliceTitles: () => {
                    if (!headerTranslator) {
                        return headers.map(resultHeaderName);
                    }
                    return headers.map((h) => headerTranslator(resultHeaderName(h)));
                },
            };
        };
        this.createDataSeries = (seriesIdx) => {
            return new DataSeries(seriesIdx, this.digest, this.accessors[0], this.config);
        };
        this.createDataSlice = (sliceIdx) => {
            return new DataSlice(sliceIdx, this.digest, this.accessors[1], this.config);
        };
        this.dataView = dataView;
        this.config = config;
        this.digest = createDataAccessDigest(this.dataView);
        const { series, slices } = this.digest;
        const seriesCount = (_c = series === null || series === void 0 ? void 0 : series.count) !== null && _c !== void 0 ? _c : 0;
        const slicesCount = (_d = slices === null || slices === void 0 ? void 0 : slices.count) !== null && _d !== void 0 ? _d : 0;
        this.seriesDescriptors = new LazyInitArray(seriesCount, this.createDataSeriesDescriptor);
        this.series = new LazyInitArray(seriesCount, this.createDataSeries);
        this.slicesDescriptors = new LazyInitArray(slicesCount, this.createDataSliceDescriptor);
        this.slices = new LazyInitArray(slicesCount, this.createDataSlice);
        this.accessors = [
            {
                rawData: series
                    ? partial(this.getRawData, series.dimIdx)
                    : illegalState("there are no data series"),
                dataAt: series
                    ? partial(this.getDataAt, series.dimIdx)
                    : illegalState("there are no data series"),
                seriesDescriptors: this.seriesDescriptors.get,
                sliceDescriptors: this.slicesDescriptors.get,
            },
            {
                rawData: slices
                    ? partial(this.getRawData, slices.dimIdx)
                    : illegalState("there are no data slices"),
                dataAt: slices
                    ? partial(this.getDataAt, slices.dimIdx)
                    : illegalState("there are no data slices"),
                seriesDescriptors: this.seriesDescriptors.get,
                sliceDescriptors: this.slicesDescriptors.get,
            },
        ];
    }
}
//# sourceMappingURL=dataAccessImpl.js.map