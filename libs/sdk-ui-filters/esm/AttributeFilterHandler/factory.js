import { MultiSelectAttributeFilterHandler, SingleSelectAttributeFilterHandler } from "./internal/index.js";
/**
 * @public
 */
export function newAttributeFilterHandler(backend, workspace, attributeFilter, options = { selectionMode: "multi" }) {
    const { selectionMode, hiddenElements, staticElements, attribute } = options;
    if (selectionMode === "multi") {
        return new MultiSelectAttributeFilterHandler({
            backend,
            workspace,
            attributeFilter,
            hiddenElements,
            staticElements,
            attribute,
        });
    }
    return new SingleSelectAttributeFilterHandler({
        backend,
        workspace,
        attributeFilter,
        hiddenElements,
        staticElements,
        attribute,
    });
}
//# sourceMappingURL=factory.js.map