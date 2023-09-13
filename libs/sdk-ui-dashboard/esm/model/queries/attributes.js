// (C) 2022-2023 GoodData Corporation
/**
 * Creates action through which you can query attributes for given display forms
 *
 * @param displayForms - attribute display forms
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @returns attribute metadata for given display forms
 *
 * @alpha
 */
export function queryAttributeByDisplayForm(displayForms, correlationId) {
    return {
        type: "GDC.DASH/QUERY.DISPLAY.FORM.ATTRIBUTE",
        correlationId,
        payload: {
            displayForms,
        },
    };
}
//# sourceMappingURL=attributes.js.map