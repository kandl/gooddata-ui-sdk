/**
 * Creates action through which you can query attribute data set for given display form
 *
 * @param displayForm - attribute display form
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @returns attribute data set for given display form
 *
 * @internal
 */
export function queryAttributeDataSet(displayForm, correlationId) {
    return {
        type: "GDC.DASH/QUERY.DATA.SET.ATTRIBUTE",
        correlationId,
        payload: {
            displayForm,
        },
    };
}
//# sourceMappingURL=attributeDataSet.js.map