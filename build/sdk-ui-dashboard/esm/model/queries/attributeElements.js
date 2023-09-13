/**
 * Creates action through which you can query attribute elements for given display form
 *
 * @param displayForm - attribute display form
 * @param limit - desired max number of elements to retrieve
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @returns attribute elements for given display form
 *
 * @internal
 */
export function queryAttributeElements(displayForm, limit, correlationId) {
    return {
        type: "GDC.DASH/QUERY.ELEMENTS.ATTRIBUTE",
        correlationId,
        payload: {
            displayForm,
            limit,
        },
    };
}
//# sourceMappingURL=attributeElements.js.map