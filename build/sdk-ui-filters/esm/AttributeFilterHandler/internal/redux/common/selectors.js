/**
 * @internal
 */
export const selectState = (state) => state;
/**
 * @internal
 */
export const getElementCacheKey = (state, element) => state.elementsForm === "uris" ? element.uri : element.title;
/**
 * @internal
 */
export const selectElementsForm = (state) => state.elementsForm;
//# sourceMappingURL=selectors.js.map