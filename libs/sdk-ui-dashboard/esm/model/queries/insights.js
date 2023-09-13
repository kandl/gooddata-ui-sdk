/**
 * Creates action through which you can query dashboard component for information about the date data sets
 * that are applicable for the provided insight.
 *
 * @param insightOrRef - insight body or a reference to an insight. if the reference is provided, then it is expected
 *  to be a reference of an insight that is already placed on a dashboard
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @alpha
 */
export function queryDateDatasetsForInsight(insightOrRef, correlationId) {
    return {
        type: "GDC.DASH/QUERY.INSIGHT.DATE.DATASETS",
        correlationId,
        payload: {
            insightOrRef,
        },
    };
}
/**
 * Given results of a query of date datasets available to use for filtering an insight, this function will
 * pick a single date dataset to use.
 *
 * @param queryResult - insight date datasets query result
 * @alpha
 */
export function insightSelectDateDataset(queryResult) {
    const { mostImportantFromInsight, dateDatasetsOrdered } = queryResult;
    return mostImportantFromInsight !== null && mostImportantFromInsight !== void 0 ? mostImportantFromInsight : dateDatasetsOrdered[0];
}
/**
 * Creates action thought which you can query dashboard component for information about display forms and
 * attributes used by an insight.
 *
 * @param insightOrRef - insight body or a reference to an insight on the dashboard
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @alpha
 */
export function queryInsightAttributesMeta(insightOrRef, correlationId) {
    return {
        type: "GDC.DASH/QUERY.INSIGHT.ATTRIBUTE.META",
        correlationId,
        payload: {
            insightOrRef,
        },
    };
}
//# sourceMappingURL=insights.js.map