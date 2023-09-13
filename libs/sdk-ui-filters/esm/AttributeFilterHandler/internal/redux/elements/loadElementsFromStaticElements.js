// (C) 2022 GoodData Corporation
import { isElementsQueryOptionsElementsByPrimaryDisplayFormValue, isElementsQueryOptionsElementsByValue, NotImplemented, } from "@gooddata/sdk-backend-spi";
import { attributeElementsIsEmpty, isAttributeElementsByRef, } from "@gooddata/sdk-model";
import flow from "lodash/flow.js";
import { InMemoryPaging } from "./InMemoryPaging.js";
const resolveHiddenElements = (hiddenElements) => (staticElements) => {
    if (attributeElementsIsEmpty(hiddenElements)) {
        return staticElements;
    }
    return isAttributeElementsByRef(hiddenElements)
        ? staticElements.filter((item) => !hiddenElements.uris.includes(item.uri))
        : staticElements.filter((item) => !hiddenElements.values.includes(item.title));
};
const resolveSelectedElements = (selectedElements) => (staticElements) => {
    if (!selectedElements) {
        return staticElements;
    }
    if (isElementsQueryOptionsElementsByPrimaryDisplayFormValue(selectedElements)) {
        throw new NotImplemented("Elements by primary display form value are not supported yet");
    }
    return isElementsQueryOptionsElementsByValue(selectedElements)
        ? staticElements.filter((element) => selectedElements.values.includes(element.title))
        : staticElements.filter((element) => selectedElements.uris.includes(element.uri));
};
const resolveStringFilter = (filter) => (staticElements) => {
    return filter
        ? staticElements.filter((item) => item.title.toLowerCase().includes(filter.toLowerCase()))
        : staticElements;
};
/**
 * @internal
 */
export async function loadElementsFromStaticElements(options, hiddenElementsInfo, staticElements) {
    let resolvedElements = flow(resolveHiddenElements(hiddenElementsInfo.hiddenElements), resolveSelectedElements(options.elements), resolveStringFilter(options.search))(staticElements);
    if (options.order === "desc") {
        resolvedElements = [...resolvedElements].reverse();
    }
    return new InMemoryPaging(resolvedElements, options.limit, options.offset);
}
//# sourceMappingURL=loadElementsFromStaticElements.js.map