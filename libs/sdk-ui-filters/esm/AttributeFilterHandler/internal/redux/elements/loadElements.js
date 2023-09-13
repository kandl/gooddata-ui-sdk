import { loadElementsFromStaticElements } from "./loadElementsFromStaticElements.js";
import { loadElementsFromBackend } from "./loadElementsFromBackend.js";
/**
 * @internal
 */
export async function loadElements(context, options, hiddenElementsInfo, staticElements) {
    return (staticElements === null || staticElements === void 0 ? void 0 : staticElements.length)
        ? loadElementsFromStaticElements(options, hiddenElementsInfo, staticElements)
        : loadElementsFromBackend(context, options, hiddenElementsInfo);
}
//# sourceMappingURL=loadElements.js.map