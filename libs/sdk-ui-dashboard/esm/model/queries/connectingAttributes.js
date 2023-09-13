// (C) 2022-2023 GoodData Corporation
/**
 * Creates action through which you can query connecting attributes for the information about
 * possibility of parent-child attribute filter relationship.
 *
 * @param refs - references of the attributes
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @returns connecting attributes for given array of references
 *
 * @alpha
 */
export function queryConnectingAttributes(refs, correlationId) {
    return {
        type: "GDC.DASH/QUERY.CONNECTING.ATTRIBUTES",
        correlationId,
        payload: {
            refs,
        },
    };
}
//# sourceMappingURL=connectingAttributes.js.map