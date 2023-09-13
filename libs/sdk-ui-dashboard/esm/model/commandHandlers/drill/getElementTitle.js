export async function getElementTitle(projectId, dfRef, attrElementUriOrPrimaryLabel, ctx) {
    const queryOptions = {
        elements: ctx.backend.capabilities.supportsElementUris
            ? {
                uris: [attrElementUriOrPrimaryLabel],
            }
            : {
                primaryValues: [attrElementUriOrPrimaryLabel],
            },
    };
    const validElementsQuery = await ctx.backend
        .workspace(projectId)
        .attributes()
        .elements()
        .forDisplayForm(dfRef)
        .withLimit(1)
        .withOptions(queryOptions)
        .query();
    return validElementsQuery.items[0].title;
}
//# sourceMappingURL=getElementTitle.js.map