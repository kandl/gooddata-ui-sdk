// (C) 2007-2022 GoodData Corporation
import SparkMD5 from "spark-md5";
import { invariant } from "ts-invariant";
import cloneDeep from "lodash/cloneDeep.js";
import compact from "lodash/compact.js";
import filter from "lodash/filter.js";
import first from "lodash/first.js";
import find from "lodash/find.js";
import map from "lodash/map.js";
import merge from "lodash/merge.js";
import every from "lodash/every.js";
import isEmpty from "lodash/isEmpty.js";
import negate from "lodash/negate.js";
import partial from "lodash/partial.js";
import flatten from "lodash/flatten.js";
import set from "lodash/set.js";
import { getAttributesDisplayForms, isVisualizationObjectAttribute, isVisualizationObjectAttributeFilter, isVisualizationObjectMeasure, } from "@gooddata/api-model-bear";
import { Rules } from "../utils/rules.js";
import { sortDefinitions } from "../utils/definitions.js";
import { getMissingUrisInAttributesMap } from "../utils/attributesMapLoader.js";
const notEmpty = negate(isEmpty);
function findHeaderForMappingFn(mapping, header) {
    return ((mapping.element === header.id || mapping.element === header.uri) && header.measureIndex === undefined);
}
function wrapMeasureIndexesFromMappings(metricMappings, headers) {
    if (metricMappings) {
        metricMappings.forEach((mapping) => {
            const header = find(headers, partial(findHeaderForMappingFn, mapping));
            if (header) {
                header.measureIndex = mapping.measureIndex;
                header.isPoP = mapping.isPoP;
            }
        });
    }
    return headers;
}
const emptyResult = {
    extendedTabularDataResult: {
        values: [],
        warnings: [],
    },
};
const MAX_TITLE_LENGTH = 1000;
function getMetricTitle(suffix, title) {
    const maxLength = MAX_TITLE_LENGTH - suffix.length;
    if (title && title.length > maxLength) {
        if (title[title.length - 1] === ")") {
            return `${title.substring(0, maxLength - 2)}…)${suffix}`;
        }
        return `${title.substring(0, maxLength - 1)}…${suffix}`;
    }
    return `${title}${suffix}`;
}
const getBaseMetricTitle = partial(getMetricTitle, "");
const CONTRIBUTION_METRIC_FORMAT = "#,##0.00%";
function getPoPDefinition(measure) {
    var _a, _b;
    return (_b = (_a = measure === null || measure === void 0 ? void 0 : measure.definition) === null || _a === void 0 ? void 0 : _a.popMeasureDefinition) !== null && _b !== void 0 ? _b : {};
}
function getAggregation(measure) {
    var _a, _b;
    return ((_b = (_a = getDefinition(measure)) === null || _a === void 0 ? void 0 : _a.aggregation) !== null && _b !== void 0 ? _b : "").toLowerCase();
}
function isEmptyFilter(metricFilter) {
    var _a, _b, _c, _d, _e, _f;
    if (metricFilter === null || metricFilter === void 0 ? void 0 : metricFilter.positiveAttributeFilter) {
        return isEmpty((_a = metricFilter.positiveAttributeFilter) === null || _a === void 0 ? void 0 : _a.in);
    }
    if (metricFilter === null || metricFilter === void 0 ? void 0 : metricFilter.negativeAttributeFilter) {
        return isEmpty((_b = metricFilter.negativeAttributeFilter) === null || _b === void 0 ? void 0 : _b.notIn);
    }
    if (metricFilter === null || metricFilter === void 0 ? void 0 : metricFilter.absoluteDateFilter) {
        return (((_c = metricFilter === null || metricFilter === void 0 ? void 0 : metricFilter.absoluteDateFilter) === null || _c === void 0 ? void 0 : _c.from) === undefined &&
            ((_d = metricFilter === null || metricFilter === void 0 ? void 0 : metricFilter.absoluteDateFilter) === null || _d === void 0 ? void 0 : _d.to) === undefined);
    }
    return (((_e = metricFilter === null || metricFilter === void 0 ? void 0 : metricFilter.relativeDateFilter) === null || _e === void 0 ? void 0 : _e.from) === undefined &&
        ((_f = metricFilter === null || metricFilter === void 0 ? void 0 : metricFilter.relativeDateFilter) === null || _f === void 0 ? void 0 : _f.to) === undefined);
}
function allFiltersEmpty(item) {
    return every(map(getMeasureFilters(item), (f) => isEmptyFilter(f)));
}
function isDerived(measure) {
    const aggregation = getAggregation(measure);
    return aggregation !== "" || !allFiltersEmpty(measure);
}
function getAttrTypeFromMap(dfUri, attributesMap) {
    var _a, _b, _c;
    return (_c = (_b = (_a = attributesMap === null || attributesMap === void 0 ? void 0 : attributesMap[dfUri]) === null || _a === void 0 ? void 0 : _a.attribute) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.type;
}
function getAttrUriFromMap(dfUri, attributesMap) {
    var _a, _b, _c;
    return (_c = (_b = (_a = attributesMap === null || attributesMap === void 0 ? void 0 : attributesMap[dfUri]) === null || _a === void 0 ? void 0 : _a.attribute) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.uri;
}
function isAttrFilterNegative(attributeFilter) {
    return (attributeFilter === null || attributeFilter === void 0 ? void 0 : attributeFilter.negativeAttributeFilter) !== undefined;
}
function getAttrFilterElements(attributeFilter) {
    var _a, _b;
    const isNegative = isAttrFilterNegative(attributeFilter);
    const elements = isNegative
        ? (_a = attributeFilter === null || attributeFilter === void 0 ? void 0 : attributeFilter.negativeAttributeFilter) === null || _a === void 0 ? void 0 : _a.notIn
        : (_b = attributeFilter === null || attributeFilter === void 0 ? void 0 : attributeFilter.positiveAttributeFilter) === null || _b === void 0 ? void 0 : _b.in;
    return elements !== null && elements !== void 0 ? elements : [];
}
function getAttrFilterExpression(measureFilter, attributesMap) {
    var _a, _b;
    const isNegative = !!(measureFilter === null || measureFilter === void 0 ? void 0 : measureFilter.negativeAttributeFilter);
    const detailPath = isNegative ? "negativeAttributeFilter" : "positiveAttributeFilter";
    const attributeUri = getAttrUriFromMap((_b = (_a = measureFilter === null || measureFilter === void 0 ? void 0 : measureFilter[detailPath]) === null || _a === void 0 ? void 0 : _a.displayForm) === null || _b === void 0 ? void 0 : _b.uri, attributesMap);
    const elements = getAttrFilterElements(measureFilter);
    if (isEmpty(elements)) {
        return null;
    }
    const elementsForQuery = map(elements, (e) => `[${e}]`);
    const negative = isNegative ? "NOT " : "";
    return `[${attributeUri}] ${negative}IN (${elementsForQuery.join(",")})`;
}
function getDateFilterExpression() {
    // measure date filter was never supported
    return "";
}
function getFilterExpression(attributesMap, measureFilter) {
    if (isVisualizationObjectAttributeFilter(measureFilter)) {
        return getAttrFilterExpression(measureFilter, attributesMap);
    }
    return getDateFilterExpression();
}
function getGeneratedMetricExpression(item, attributesMap) {
    var _a, _b;
    const aggregation = getAggregation(item).toUpperCase();
    const objectUri = (_b = (_a = getDefinition(item)) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.uri;
    const where = filter(map(getMeasureFilters(item), partial(getFilterExpression, attributesMap)), (e) => !!e);
    return [
        "SELECT",
        aggregation ? `${aggregation}([${objectUri}])` : `[${objectUri}]`,
        notEmpty(...where) && `WHERE ${where.join(" AND ")}`,
    ]
        .filter(Boolean)
        .join(" ");
}
function getPercentMetricExpression(category, attributesMap, measure) {
    var _a, _b, _c;
    let metricExpressionWithoutFilters = `SELECT [${(_b = (_a = getDefinition(measure)) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.uri}]`;
    if (isDerived(measure)) {
        metricExpressionWithoutFilters = getGeneratedMetricExpression(set(cloneDeep(measure), ["definition", "measureDefinition", "filters"], []), attributesMap);
    }
    const attributeUri = getAttrUriFromMap((_c = category === null || category === void 0 ? void 0 : category.displayForm) === null || _c === void 0 ? void 0 : _c.uri, attributesMap);
    const whereFilters = filter(map(getMeasureFilters(measure), partial(getFilterExpression, attributesMap)), (e) => !!e);
    const byAllExpression = attributeUri ? ` BY ALL [${attributeUri}]` : "";
    const whereExpression = notEmpty(...whereFilters) ? ` WHERE ${whereFilters.join(" AND ")}` : "";
    return `SELECT (${metricExpressionWithoutFilters}${whereExpression}) / (${metricExpressionWithoutFilters}${byAllExpression}${whereExpression})`;
}
function getPoPExpression(attributeUri, metricExpression) {
    return `SELECT ${metricExpression} FOR PREVIOUS ([${attributeUri}])`;
}
function getGeneratedMetricHash(title, format, expression) {
    return SparkMD5.hash(`${expression}#${title}#${format}`);
}
function getMeasureType(measure) {
    const aggregation = getAggregation(measure);
    if (aggregation === "") {
        return "metric";
    }
    else if (aggregation === "count") {
        return "attribute";
    }
    return "fact";
}
function getGeneratedMetricIdentifier(item, aggregation, expressionCreator, hasher, attributesMap) {
    var _a, _b, _c;
    const [, , , prjId, , id] = ((_c = (_b = (_a = getDefinition(item)) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.uri) !== null && _c !== void 0 ? _c : "").split("/");
    const identifier = `${prjId}_${id}`;
    const hash = hasher(expressionCreator(item, attributesMap));
    const hasNoFilters = isEmpty(getMeasureFilters(item));
    const type = getMeasureType(item);
    const prefix = hasNoFilters || allFiltersEmpty(item) ? "" : "_filtered";
    return `${type}_${identifier}.generated.${hash}${prefix}_${aggregation}`;
}
function isDateAttribute(attribute, attributesMap = {}) {
    var _a;
    return getAttrTypeFromMap((_a = attribute === null || attribute === void 0 ? void 0 : attribute.displayForm) === null || _a === void 0 ? void 0 : _a.uri, attributesMap) !== undefined;
}
function getMeasureSorting(measure, mdObj) {
    var _a, _b, _c, _d;
    const sorting = (_b = (_a = mdObj === null || mdObj === void 0 ? void 0 : mdObj.properties) === null || _a === void 0 ? void 0 : _a.sortItems) !== null && _b !== void 0 ? _b : [];
    const matchedSorting = sorting.find((sortItem) => {
        var _a, _b, _c;
        const measureSortItem = sortItem === null || sortItem === void 0 ? void 0 : sortItem.measureSortItem;
        if (measureSortItem) {
            // only one item now, we support only 2D data
            const identifier = (_c = (_b = (_a = measureSortItem.locators) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.measureLocatorItem) === null || _c === void 0 ? void 0 : _c.measureIdentifier;
            return identifier === (measure === null || measure === void 0 ? void 0 : measure.localIdentifier);
        }
        return false;
    });
    return (_d = (_c = matchedSorting === null || matchedSorting === void 0 ? void 0 : matchedSorting.measureSortItem) === null || _c === void 0 ? void 0 : _c.direction) !== null && _d !== void 0 ? _d : null;
}
function getCategorySorting(category, mdObj) {
    var _a, _b, _c, _d;
    const sorting = (_b = (_a = mdObj === null || mdObj === void 0 ? void 0 : mdObj.properties) === null || _a === void 0 ? void 0 : _a.sortItems) !== null && _b !== void 0 ? _b : [];
    const matchedSorting = sorting.find((sortItem) => {
        const attributeSortItem = sortItem === null || sortItem === void 0 ? void 0 : sortItem.attributeSortItem;
        if (attributeSortItem) {
            const identifier = attributeSortItem === null || attributeSortItem === void 0 ? void 0 : attributeSortItem.attributeIdentifier;
            return identifier === (category === null || category === void 0 ? void 0 : category.localIdentifier);
        }
        return false;
    });
    return (_d = (_c = matchedSorting === null || matchedSorting === void 0 ? void 0 : matchedSorting.attributeSortItem) === null || _c === void 0 ? void 0 : _c.direction) !== null && _d !== void 0 ? _d : null;
}
const createPureMetric = (measure, mdObj, measureIndex) => {
    var _a, _b, _c;
    return ({
        element: (_c = (_b = (_a = measure === null || measure === void 0 ? void 0 : measure.definition) === null || _a === void 0 ? void 0 : _a.measureDefinition) === null || _b === void 0 ? void 0 : _b.item) === null || _c === void 0 ? void 0 : _c.uri,
        sort: getMeasureSorting(measure, mdObj),
        meta: { measureIndex },
    });
};
function createDerivedMetric(measure, mdObj, measureIndex, attributesMap) {
    const { format } = measure;
    const sort = getMeasureSorting(measure, mdObj);
    const title = getBaseMetricTitle(measure.title);
    const hasher = partial(getGeneratedMetricHash, title, format);
    const aggregation = getAggregation(measure);
    const element = getGeneratedMetricIdentifier(measure, aggregation.length ? aggregation : "base", getGeneratedMetricExpression, hasher, attributesMap);
    const definition = {
        metricDefinition: {
            identifier: element,
            expression: getGeneratedMetricExpression(measure, attributesMap),
            title,
            format,
        },
    };
    return {
        element,
        definition,
        sort,
        meta: {
            measureIndex,
        },
    };
}
function createContributionMetric(measure, mdObj, measureIndex, attributesMap) {
    const attribute = first(getAttributes(mdObj));
    const getMetricExpression = partial(getPercentMetricExpression, attribute, attributesMap);
    const title = getBaseMetricTitle(measure === null || measure === void 0 ? void 0 : measure.title);
    const hasher = partial(getGeneratedMetricHash, title, CONTRIBUTION_METRIC_FORMAT);
    const identifier = getGeneratedMetricIdentifier(measure, "percent", getMetricExpression, hasher, attributesMap);
    return {
        element: identifier,
        definition: {
            metricDefinition: {
                identifier,
                expression: getMetricExpression(measure),
                title,
                format: CONTRIBUTION_METRIC_FORMAT,
            },
        },
        sort: getMeasureSorting(measure, mdObj),
        meta: {
            measureIndex,
        },
    };
}
function getOriginalMeasureForPoP(popMeasure, mdObj) {
    return getMeasures(mdObj).find((measure) => { var _a; return (measure === null || measure === void 0 ? void 0 : measure.localIdentifier) === ((_a = getPoPDefinition(popMeasure)) === null || _a === void 0 ? void 0 : _a.measureIdentifier); });
}
function createPoPMetric(popMeasure, mdObj, measureIndex, attributesMap) {
    var _a, _b, _c, _d, _e;
    const title = getBaseMetricTitle(popMeasure === null || popMeasure === void 0 ? void 0 : popMeasure.title);
    const format = popMeasure === null || popMeasure === void 0 ? void 0 : popMeasure.format;
    const hasher = partial(getGeneratedMetricHash, title, format);
    const attributeUri = (_c = (_b = (_a = popMeasure === null || popMeasure === void 0 ? void 0 : popMeasure.definition) === null || _a === void 0 ? void 0 : _a.popMeasureDefinition) === null || _b === void 0 ? void 0 : _b.popAttribute) === null || _c === void 0 ? void 0 : _c.uri;
    const originalMeasure = getOriginalMeasureForPoP(popMeasure, mdObj);
    const originalMeasureExpression = `[${(_e = (_d = getDefinition(originalMeasure)) === null || _d === void 0 ? void 0 : _d.item) === null || _e === void 0 ? void 0 : _e.uri}]`;
    let metricExpression = getPoPExpression(attributeUri, originalMeasureExpression);
    if (isDerived(originalMeasure)) {
        const generated = createDerivedMetric(originalMeasure, mdObj, measureIndex, attributesMap);
        const generatedMeasureExpression = `(${generated.definition.metricDefinition.expression})`;
        metricExpression = getPoPExpression(attributeUri, generatedMeasureExpression);
    }
    const identifier = getGeneratedMetricIdentifier(originalMeasure, "pop", () => metricExpression, hasher, attributesMap);
    return {
        element: identifier,
        definition: {
            metricDefinition: {
                identifier,
                expression: metricExpression,
                title,
                format,
            },
        },
        sort: getMeasureSorting(popMeasure, mdObj),
        meta: {
            measureIndex,
            isPoP: true,
        },
    };
}
function createContributionPoPMetric(popMeasure, mdObj, measureIndex, attributesMap) {
    var _a, _b, _c;
    const attributeUri = (_c = (_b = (_a = popMeasure === null || popMeasure === void 0 ? void 0 : popMeasure.definition) === null || _a === void 0 ? void 0 : _a.popMeasureDefinition) === null || _b === void 0 ? void 0 : _b.popAttribute) === null || _c === void 0 ? void 0 : _c.uri;
    const originalMeasure = getOriginalMeasureForPoP(popMeasure, mdObj);
    const generated = createContributionMetric(originalMeasure, mdObj, measureIndex, attributesMap);
    const title = getBaseMetricTitle(popMeasure === null || popMeasure === void 0 ? void 0 : popMeasure.title);
    const format = CONTRIBUTION_METRIC_FORMAT;
    const hasher = partial(getGeneratedMetricHash, title, format);
    const generatedMeasureExpression = `(${generated.definition.metricDefinition.expression})`;
    const metricExpression = getPoPExpression(attributeUri, generatedMeasureExpression);
    const identifier = getGeneratedMetricIdentifier(originalMeasure, "pop", () => metricExpression, hasher, attributesMap);
    return {
        element: identifier,
        definition: {
            metricDefinition: {
                identifier,
                expression: metricExpression,
                title,
                format,
            },
        },
        sort: getMeasureSorting(),
        meta: {
            measureIndex,
            isPoP: true,
        },
    };
}
function categoryToElement(attributesMap, mdObj, category) {
    var _a;
    const element = getAttrUriFromMap((_a = category === null || category === void 0 ? void 0 : category.displayForm) === null || _a === void 0 ? void 0 : _a.uri, attributesMap);
    return {
        element,
        sort: getCategorySorting(category, mdObj),
    };
}
function isPoP({ definition }) {
    return (definition === null || definition === void 0 ? void 0 : definition.popMeasureDefinition) !== undefined;
}
function isContribution({ definition }) {
    var _a;
    return (_a = definition === null || definition === void 0 ? void 0 : definition.measureDefinition) === null || _a === void 0 ? void 0 : _a.computeRatio;
}
function isPoPContribution(popMeasure, mdObj) {
    if (isPoP(popMeasure)) {
        const originalMeasure = getOriginalMeasureForPoP(popMeasure, mdObj);
        return isContribution(originalMeasure);
    }
    return false;
}
function isCalculatedMeasure({ definition }) {
    var _a;
    return ((_a = definition === null || definition === void 0 ? void 0 : definition.measureDefinition) === null || _a === void 0 ? void 0 : _a.aggregation) === undefined;
}
const rules = new Rules();
rules.addRule([isPoPContribution], createContributionPoPMetric);
rules.addRule([isPoP], createPoPMetric);
rules.addRule([isContribution], createContributionMetric);
rules.addRule([isDerived], createDerivedMetric);
rules.addRule([isCalculatedMeasure], createPureMetric);
function getMetricFactory(measure, mdObj) {
    const factory = rules.match(measure, mdObj);
    invariant(factory, `Unknown metric factory for: ${measure}`);
    return factory;
}
function getExecutionDefinitionsAndColumns(mdObj, options, attributesMap) {
    const measures = getMeasures(mdObj);
    let attributes = getAttributes(mdObj);
    const metrics = flatten(map(measures, (measure, index) => getMetricFactory(measure, mdObj)(measure, mdObj, index, attributesMap)));
    if (options.removeDateItems) {
        attributes = filter(attributes, (attribute) => !isDateAttribute(attribute, attributesMap));
    }
    attributes = map(attributes, partial(categoryToElement, attributesMap, mdObj));
    const columns = compact(map([...attributes, ...metrics], "element"));
    return {
        columns,
        definitions: sortDefinitions(compact(map(metrics, "definition"))),
    };
}
function getBuckets(mdObj) {
    var _a;
    return (_a = mdObj === null || mdObj === void 0 ? void 0 : mdObj.buckets) !== null && _a !== void 0 ? _a : [];
}
function getAttributesInBucket(bucket) {
    return bucket.items.reduce((list, bucketItem) => {
        if (isVisualizationObjectAttribute(bucketItem)) {
            list.push(bucketItem.visualizationAttribute);
        }
        return list;
    }, []);
}
function getAttributes(mdObject) {
    const buckets = getBuckets(mdObject);
    return buckets.reduce((categoriesList, bucket) => {
        categoriesList.push(...getAttributesInBucket(bucket));
        return categoriesList;
    }, []);
}
function getDefinition(measure) {
    var _a, _b;
    return (_b = (_a = measure === null || measure === void 0 ? void 0 : measure.definition) === null || _a === void 0 ? void 0 : _a.measureDefinition) !== null && _b !== void 0 ? _b : {};
}
function getMeasuresInBucket(bucket) {
    return bucket.items.reduce((list, bucketItem) => {
        if (isVisualizationObjectMeasure(bucketItem)) {
            list.push(bucketItem.measure);
        }
        return list;
    }, []);
}
function getMeasures(mdObject) {
    const buckets = getBuckets(mdObject);
    return buckets.reduce((categoriesList, bucket) => {
        categoriesList.push(...getMeasuresInBucket(bucket));
        return categoriesList;
    }, []);
}
function getMeasureFilters(measure) {
    var _a, _b;
    return (_b = (_a = getDefinition(measure)) === null || _a === void 0 ? void 0 : _a.filters) !== null && _b !== void 0 ? _b : [];
}
/**
 * Module for execution on experimental execution resource
 *
 * @deprecated The module is in maintenance mode only (just the the compilation issues are being fixed when
 *      referenced utilities and interfaces are being changed) and is not being extended when AFM executor
 *      have new functionality added.
 */
export class ExperimentalExecutionsModule {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(xhr, loadAttributesMap) {
        this.xhr = xhr;
        this.loadAttributesMap = loadAttributesMap;
    }
    /**
     * For the given projectId it returns table structure with the given
     * elements in column headers.
     *
     * @param projectId - GD project identifier
     * @param columns - An array of attribute or metric identifiers.
     * @param executionConfiguration - Execution configuration - can contain for example
     *                 property "where" containing query-like filters
     *                 property "orderBy" contains array of sorted properties to order in form
     *                      `[{column: 'identifier', direction: 'asc|desc'}]`
     * @param settings - Supports additional settings accepted by the underlying
     *                             xhr.ajax() calls
     *
     * @returns Structure with `headers` and `rawData` keys filled with values from execution.
     */
    getData(projectId, columns, executionConfiguration = {}, settings = {}) {
        if (process.env.NODE_ENV !== "test") {
            console.warn("ExperimentalExecutionsModule is deprecated and is no longer being maintained. " +
                "Please migrate to the ExecuteAfmModule.");
        }
        const executedReport = {
            isLoaded: false,
        };
        // Create request and result structures
        const request = {
            execution: { columns },
        };
        // enrich configuration with supported properties such as
        // where clause with query-like filters
        ["where", "orderBy", "definitions"].forEach((property) => {
            if (executionConfiguration[property]) {
                request.execution[property] = executionConfiguration[property];
            }
        });
        // Execute request
        return this.xhr
            .post(`/gdc/internal/projects/${projectId}/experimental/executions`, Object.assign(Object.assign({}, settings), { body: JSON.stringify(request) }))
            .then((r) => r.getData())
            .then((response) => {
            var _a, _b;
            executedReport.headers = wrapMeasureIndexesFromMappings(executionConfiguration === null || executionConfiguration === void 0 ? void 0 : executionConfiguration.metricMappings, (_b = (_a = response === null || response === void 0 ? void 0 : response.executionResult) === null || _a === void 0 ? void 0 : _a.headers) !== null && _b !== void 0 ? _b : []);
            // Start polling on url returned in the executionResult for tabularData
            return this.loadExtendedDataResults(response.executionResult.extendedTabularDataResult, settings);
        })
            .then((r) => {
            var _a, _b, _c, _d;
            const { result, status } = r;
            return Object.assign(Object.assign({}, executedReport), { rawData: (_b = (_a = result === null || result === void 0 ? void 0 : result.extendedTabularDataResult) === null || _a === void 0 ? void 0 : _a.values) !== null && _b !== void 0 ? _b : [], warnings: (_d = (_c = result === null || result === void 0 ? void 0 : result.extendedTabularDataResult) === null || _c === void 0 ? void 0 : _c.warnings) !== null && _d !== void 0 ? _d : [], isLoaded: true, isEmpty: status === 204 });
        });
    }
    mdToExecutionDefinitionsAndColumns(projectId, mdObj, options = {}) {
        const allDfUris = getAttributesDisplayForms(mdObj);
        const attributesMapPromise = this.getAttributesMap(options, allDfUris, projectId);
        return attributesMapPromise.then((attributesMap) => {
            return getExecutionDefinitionsAndColumns(mdObj, options, attributesMap);
        });
    }
    getAttributesMap(options = {}, displayFormUris, projectId) {
        var _a;
        const attributesMap = (_a = options.attributesMap) !== null && _a !== void 0 ? _a : {};
        const missingUris = getMissingUrisInAttributesMap(displayFormUris, attributesMap);
        return this.loadAttributesMap(projectId, missingUris).then((result) => {
            return Object.assign(Object.assign({}, attributesMap), result);
        });
    }
    loadExtendedDataResults(uri, settings, prevResult = emptyResult) {
        return new Promise((resolve, reject) => {
            this.xhr
                .ajax(uri, settings)
                .then((r) => {
                const { response } = r;
                if (response.status === 204) {
                    return {
                        status: response.status,
                        result: "",
                    };
                }
                return {
                    status: response.status,
                    result: r.getData(),
                };
            })
                .then(({ status, result }) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                const values = [
                    ...((_b = (_a = prevResult === null || prevResult === void 0 ? void 0 : prevResult.extendedTabularDataResult) === null || _a === void 0 ? void 0 : _a.values) !== null && _b !== void 0 ? _b : []),
                    ...((_d = (_c = result === null || result === void 0 ? void 0 : result.extendedTabularDataResult) === null || _c === void 0 ? void 0 : _c.values) !== null && _d !== void 0 ? _d : []),
                ];
                const warnings = [
                    ...((_f = (_e = prevResult === null || prevResult === void 0 ? void 0 : prevResult.extendedTabularDataResult) === null || _e === void 0 ? void 0 : _e.warnings) !== null && _f !== void 0 ? _f : []),
                    ...((_h = (_g = result === null || result === void 0 ? void 0 : result.extendedTabularDataResult) === null || _g === void 0 ? void 0 : _g.warnings) !== null && _h !== void 0 ? _h : []),
                ];
                const updatedResult = merge({}, prevResult, {
                    extendedTabularDataResult: {
                        values,
                        warnings,
                    },
                });
                const nextUri = (_k = (_j = result === null || result === void 0 ? void 0 : result.extendedTabularDataResult) === null || _j === void 0 ? void 0 : _j.paging) === null || _k === void 0 ? void 0 : _k.next;
                if (nextUri) {
                    resolve(this.loadExtendedDataResults(nextUri, settings, updatedResult));
                }
                else {
                    resolve({ status, result: updatedResult });
                }
            }, reject);
        });
    }
}
//# sourceMappingURL=experimental-executions.js.map