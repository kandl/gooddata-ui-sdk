// (C) 2022 GoodData Corporation
import { IElementsQueryResult } from "@gooddata/sdk-backend-spi";
import { IAttributeElements, ObjRef } from "@gooddata/sdk-model";

import { AttributeFilterStoreContext } from "../types";

/**
 * @internal
 */
interface ILoadAttributeElementsOptions {
    displayFormRef: ObjRef;
    elements?: IAttributeElements;
    offset?: number;
    limit?: number;
}

/**
 * @internal
 */
export async function loadAttributeElements(
    context: AttributeFilterStoreContext,
    { displayFormRef, elements, offset, limit }: ILoadAttributeElementsOptions,
): Promise<IElementsQueryResult> {
    let elementsLoader = context.backend
        .workspace(context.workspace)
        .attributes()
        .elements()
        .forDisplayForm(displayFormRef);

    if (elements) {
        elementsLoader = elementsLoader.withOptions({
            elements,
        });
    }

    if (offset) {
        elementsLoader = elementsLoader.withOffset(offset);
    }

    if (limit) {
        elementsLoader = elementsLoader.withLimit(limit);
    }

    return elementsLoader.query();
}

// const defaultElementsLoad: ElementsLoad = (config) => {
//     const {
//         backend,
//         displayForm,
//         limit,
//         offset,
//         workspace,
//         limitingAttributeFilters,
//         limitingDateFilters,
//         limitingMeasures,
//         search,
//         elements,
//     } = config;
//     let loader = backend.workspace(workspace).attributes().elements().forDisplayForm(displayForm);
//     if (limit) {
//         loader = loader.withLimit(limit);
//     }
//     if (offset) {
//         loader = loader.withOffset(limit);
//     }
//     if (search || elements) {
//         loader = loader.withOptions({ filter: search, elements });
//     }
//     if (limitingDateFilters) {
//         loader = loader.withDateFilters(limitingDateFilters);
//     }
//     if (limitingAttributeFilters) {
//         loader = loader.withAttributeFilters(limitingAttributeFilters);
//     }
//     if (limitingMeasures) {
//         loader = loader.withMeasures(limitingMeasures);
//     }

//     return loader.query().then((res) => ({
//         items: res.items,
//         limit: res.limit,
//         offset: res.offset,
//         totalCount: res.totalCount,
//     }));
// };
