import { dataViewDimensionItems, dataViewHeaders, measureGroupItems } from "./utils.js";
import { attributeLocalId, measureLocalId, isAttributeDescriptor, isMeasureGroupDescriptor, isResultAttributeHeader, isResultMeasureHeader, } from "@gooddata/sdk-model";
import keyBy from "lodash/keyBy.js";
/**
 * Given data view dimensions, this function identifies dimensions where data series and
 * data slices are laid out. The returned result always contains two elements. First being
 * the index to data series dimension, second to data slices dimension. If series / slices
 * are not present, then the respective element contains -1.
 */
function findSlicesAndSeriesDims(dimensions) {
    if (dimensions.length === 0) {
        return {
            locations: [-1, -1],
        };
    }
    /*
     * possible valid locations of series and slices. rows and cols OR cols and rows.
     */
    const possibleLocations = [
        [0, 1],
        [1, 0],
    ];
    for (const locations of possibleLocations) {
        const [seriesIdx, slicesIdx] = locations;
        const dimension = dimensions[seriesIdx];
        if (!dimension) {
            continue;
        }
        const measureGroup = dimension.headers.find(isMeasureGroupDescriptor);
        if (measureGroup) {
            if (!dimensions[slicesIdx]) {
                return {
                    locations: [seriesIdx, -1],
                    measureGroup,
                };
            }
            return {
                locations,
                measureGroup,
            };
        }
    }
    /*
     * The only possibility at this point is there are no data series.
     */
    return {
        locations: [-1, 0],
    };
}
function createMeasureIndexes(measureDescriptors, measureHeaders) {
    var _a;
    const measureAndIndex = (_a = measureHeaders === null || measureHeaders === void 0 ? void 0 : measureHeaders.filter(isResultMeasureHeader).map((m, idx) => {
        const measure = measureDescriptors[m.measureHeaderItem.order].measureHeaderItem.localIdentifier;
        return [measure, idx];
    })) !== null && _a !== void 0 ? _a : [];
    const accumulator = {};
    return measureAndIndex.reduce((res, [localId, seriesIdx]) => {
        if (!res[localId]) {
            res[localId] = [];
        }
        res[localId].push(seriesIdx);
        return res;
    }, accumulator);
}
function createDataSeriesDigest(dataView, resultDesc, def) {
    var _a, _b;
    const { measureGroup, locations } = resultDesc;
    if (!measureGroup) {
        return;
    }
    const dimIdx = locations[0];
    const headerItems = dataViewHeaders(dataView, dimIdx);
    const measureHeaders = (_a = headerItems.find((headers) => isResultMeasureHeader(headers[0]))) !== null && _a !== void 0 ? _a : [];
    const allAttributeHeaders = (_b = headerItems.filter((headers) => isResultAttributeHeader(headers[0]))) !== null && _b !== void 0 ? _b : [];
    const count = measureHeaders ? measureHeaders.length : 0;
    const fromMeasures = measureGroupItems(measureGroup);
    const fromMeasuresDef = fromMeasures.map((m) => def.measuresIndex[m.measureHeaderItem.localIdentifier]);
    const scopingAttributes = dataViewDimensionItems(dataView, dimIdx).filter(isAttributeDescriptor);
    const scopingAttributesDef = scopingAttributes.map((a) => def.attributesIndex[a.attributeHeader.localIdentifier]);
    const measureIndexes = createMeasureIndexes(fromMeasures, measureHeaders);
    return {
        dimIdx,
        fromMeasures,
        fromMeasuresDef,
        scopingAttributes,
        scopingAttributesDef,
        measureHeaders,
        allAttributeHeaders,
        measureIndexes,
        count,
    };
}
function createDataSlicesDigest(dataView, resultDesc, def) {
    const { locations } = resultDesc;
    const dimIdx = locations[1];
    if (dimIdx < 0) {
        return;
    }
    const headerItems = dataViewHeaders(dataView, dimIdx);
    const count = headerItems.length > 0 ? headerItems[0].length : 0;
    const descriptors = dataViewDimensionItems(dataView, dimIdx).filter(isAttributeDescriptor);
    const descriptorsDef = descriptors.map((d) => def.attributesIndex[d.attributeHeader.localIdentifier]);
    return {
        dimIdx,
        descriptors,
        descriptorsDef,
        headerItems,
        count,
    };
}
function createExecutionDefinitionDigest(dataView) {
    const { definition } = dataView;
    const attributesIndex = keyBy(definition.attributes, attributeLocalId);
    const measuresIndex = keyBy(definition.measures, measureLocalId);
    return {
        attributesIndex,
        measuresIndex,
    };
}
/**
 * Creates digest for the provided data view. The digest includes references to various parts of the
 * data view. The digest never copies any data from the input data view.
 *
 * @param dataView - data view to calculate digest for
 * @returns new digest
 */
export function createDataAccessDigest(dataView) {
    const resultDesc = findSlicesAndSeriesDims(dataView.result.dimensions);
    const def = createExecutionDefinitionDigest(dataView);
    const series = createDataSeriesDigest(dataView, resultDesc, def);
    const slices = createDataSlicesDigest(dataView, resultDesc, def);
    return {
        series,
        slices,
        def,
    };
}
//# sourceMappingURL=dataAccessDigest.js.map