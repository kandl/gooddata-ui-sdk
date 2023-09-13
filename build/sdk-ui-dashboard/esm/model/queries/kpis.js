/**
 * Creates action through which you can query dashboard component for information about the date data sets
 * that are applicable for filtering of the provided measure. measures are typically used to obtain value to render on KPIs.
 *
 * @param measureRef - reference to measure
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @alpha
 */
export function queryDateDatasetsForMeasure(measureRef, correlationId) {
    return {
        type: "GDC.DASH/QUERY.MEASURE.DATE.DATASETS",
        correlationId,
        payload: {
            measureRef,
        },
    };
}
//# sourceMappingURL=kpis.js.map