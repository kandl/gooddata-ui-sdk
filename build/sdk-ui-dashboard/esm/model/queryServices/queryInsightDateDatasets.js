import { call, select } from "redux-saga/effects";
import compact from "lodash/compact.js";
import fromPairs from "lodash/fromPairs.js";
import uniqBy from "lodash/uniqBy.js";
import { invariant } from "ts-invariant";
import { filterObjRef, insightFilters, insightRef, isDateFilter, isObjRef, objRefToString, serializeObjRef, isCatalogDateDataset, } from "@gooddata/sdk-model";
import { createCachedQueryService } from "../store/_infra/queryService.js";
import { queryInsightAttributesMeta, } from "../queries/index.js";
import { selectInsightByRef } from "../store/insights/insightsSelectors.js";
import { invalidQueryArguments } from "../events/general.js";
import { query } from "../store/_infra/queryCall.js";
import { selectAllCatalogDateDatasetsMap, selectCatalogDateAttributeToDataset, } from "../store/catalog/catalogSelectors.js";
import { selectBackendCapabilities } from "../store/backendCapabilities/backendCapabilitiesSelectors.js";
import { newDisplayFormMap } from "../../_staging/metadata/objRefMap.js";
import { sanitizeDateDatasetTitle, sortByRelevanceAndTitle, } from "../../_staging/catalog/dateDatasetOrdering.js";
import { loadDateDatasetsForInsight } from "./loadAvailableDateDatasets.js";
export const QueryDateDatasetsForInsightService = createCachedQueryService("GDC.DASH/QUERY.INSIGHT.DATE.DATASETS", queryService, (query) => {
    const { payload: { insightOrRef }, } = query;
    const ref = isObjRef(insightOrRef) ? insightOrRef : insightRef(insightOrRef);
    return serializeObjRef(ref);
});
/**
 * Selector that will return date datasets for insight. The input to the selector is the dashboard query that is used
 * to obtain and cache the data.
 *
 * This selector will return undefined if the query to obtain the data for particular insight was not yet fired or
 * processed. Otherwise will return object containing `status` of the data retrieval; if the `status` is
 * `'success'` then the `result` prop will contain the data.
 *
 * @remarks see {@link QueryInsightDateDatasets}
 * @internal
 */
export const selectDateDatasetsForInsight = QueryDateDatasetsForInsightService.cache.selectQueryResult;
//
// Query implementation
//
/**
 * Given insight and a list of available cataloged date datasets, this function looks up date datasets that are used
 * in insight's global date filters. Date datasets
 *
 * @param insight - insight to lookup date dataset for
 * @param datasets - all cataloged date datasets
 */
function lookupDatasetsUsedInDateFilters(insight, datasets) {
    const dateFilters = insightFilters(insight).filter(isDateFilter);
    return dateFilters.map((filter) => {
        const datasetRef = filterObjRef(filter);
        const dateDataset = datasets.get(datasetRef);
        // if this happens then either component is using wrong catalog or metadata is inconsistent (and insight thus un-renderable)
        invariant(dateDataset, `cannot find metadata for date dataset ${objRefToString(datasetRef)}`);
        return dateDataset;
    });
}
/**
 * Given insight and list of available cataloged date datasets, this generator will first query usage & metadata about
 * used display forms and attributes. With this, the function will lookup date datasets for each display form
 * used in insight's attribute buckets and attribute filters.
 *
 * Note: that cataloged date datasets already contain mapping of dataset → attribute → default display form. However
 * this cannot be used because the code cannot expect that the insights only use date dataset's default display forms.
 *
 * @param insight - insight work with
 * @param attributeToDataset - lookup table of date attributes to datasets
 */
function* lookupDatasetsUsedInAttributesAndFilters(insight, attributeToDataset) {
    const insightAttributes = yield call(query, queryInsightAttributesMeta(insight));
    const { usage: { inAttributes, inFilters }, displayForms, } = insightAttributes;
    const capabilities = yield select(selectBackendCapabilities);
    const displayFormsMap = newDisplayFormMap(displayForms, capabilities.hasTypeScopedIdentifiers);
    const datasetLookup = (ref) => {
        var _a;
        const displayForm = displayFormsMap.get(ref);
        // if this bombs then the query insight attributes is messed up as it does not include display forms meta
        // for some display form used in the insight
        invariant(displayForm);
        const attributeRef = displayForm.attribute;
        return (_a = attributeToDataset.get(attributeRef)) === null || _a === void 0 ? void 0 : _a.dataset;
    };
    return {
        usedInAttributes: compact(inAttributes.map(datasetLookup)),
        usedInAttributeFilters: compact(inFilters.map(datasetLookup)),
    };
}
function* lookupDatasetsInInsight(insight) {
    /*
     * TODO: need to investigate whether the catalogDateDatasets are needed here. the theory is, loading available
     *  date datasets using catalog _likely_ gives everything this code should ever need. The query processor
     *  does the call to load available date datasets first.. so then instead of selecting the whole catalog from
     *  state this generator could receive date datasets as an argument. Note that KD used to get all date datasets
     *  from catalog so this matches the previous behavior.
     */
    const catalogDateDatasets = yield select(selectAllCatalogDateDatasetsMap);
    const catalogDateAttributeToDatasets = yield select(selectCatalogDateAttributeToDataset);
    const usedInDateFilters = lookupDatasetsUsedInDateFilters(insight, catalogDateDatasets);
    const usedInAttributesAndFilters = yield call(lookupDatasetsUsedInAttributesAndFilters, insight, catalogDateAttributeToDatasets);
    const { usedInAttributes, usedInAttributeFilters } = usedInAttributesAndFilters;
    return {
        usedInDateFilters,
        usedInAttributes,
        usedInAttributeFilters,
    };
}
function* queryService(ctx, query) {
    var _a, _b;
    const { payload: { insightOrRef }, correlationId, } = query;
    let insight;
    if (isObjRef(insightOrRef)) {
        insight = yield select(selectInsightByRef(insightOrRef));
        if (!insight) {
            throw invalidQueryArguments(ctx, `Insight with ref ${objRefToString(insightOrRef)} does not exist on the dashboard`, correlationId);
        }
    }
    else {
        insight = insightOrRef;
    }
    /*
     * first use the catalog's availability APIs to obtain date datasets relevant for this insight from the
     * backend
     */
    const dateDatasets = yield call(loadDateDatasetsForInsight, ctx, insight);
    /*
     * then inspect the insight itself and get categorized information about the usage of date datasets by
     * the insight itself.
     */
    const usedInInsight = yield call(lookupDatasetsInInsight, insight);
    const { usedInDateFilters, usedInAttributes, usedInAttributeFilters } = usedInInsight;
    const mostImportantFromInsight = (_b = (_a = usedInDateFilters[0]) !== null && _a !== void 0 ? _a : usedInAttributes[0]) !== null && _b !== void 0 ? _b : usedInAttributeFilters[0];
    const allAvailableDateDatasets = uniqBy([...dateDatasets, ...usedInDateFilters, ...usedInAttributes, ...usedInAttributeFilters].filter(isCatalogDateDataset), (d) => serializeObjRef(d.dataSet.ref));
    const dateDatasetDisplayNames = fromPairs(allAvailableDateDatasets.map((d) => [d.dataSet.title, sanitizeDateDatasetTitle(d)]));
    return {
        dateDatasets,
        dateDatasetsOrdered: sortByRelevanceAndTitle(dateDatasets, dateDatasetDisplayNames),
        usedInDateFilters,
        usedInAttributes,
        usedInAttributeFilters,
        dateDatasetDisplayNames,
        mostImportantFromInsight,
        allAvailableDateDatasets,
    };
}
//# sourceMappingURL=queryInsightDateDatasets.js.map