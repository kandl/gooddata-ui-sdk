// (C) 2021-2022 GoodData Corporation
import { NotSupported, } from "@gooddata/sdk-backend-spi";
import { useBackendStrict, useCancelablePromise, useWorkspaceStrict, } from "@gooddata/sdk-ui";
import { isAttributeElementsByRef, objRefToString, } from "@gooddata/sdk-model";
import { isBrokenAlertAttributeFilterInfo } from "../../../../model/index.js";
/**
 * the amount of elements to load, this should be small enough to be efficient,
 * and large enough to always be longer than the broken alert filters display
 */
const DEFAULT_ATTRIBUTE_ELEMENT_COUNT = 20;
/**
 * @internal
 */
export function useBrokenAlertFiltersMeta({ backend, brokenAlertFilters, dateDatasets, workspace, onCancel, onError, onLoading, onPending, onSuccess, }) {
    const effectiveBackend = useBackendStrict(backend, "useBrokenAlertFiltersMeta");
    const effectiveWorkspace = useWorkspaceStrict(workspace, "useBrokenAlertFiltersMeta");
    const promise = brokenAlertFilters
        ? async () => {
            const filtersToLoad = brokenAlertFilters.filter(isBrokenAlertAttributeFilterInfo);
            const filterDataPromise = Promise.all(filtersToLoad.map(async (filter) => {
                const { attributeFilter } = filter.alertFilter;
                if (!isAttributeElementsByRef(attributeFilter.attributeElements)) {
                    throw new NotSupported("Only URI attribute filters are supported in useBrokenAlertFiltersMeta");
                }
                const displayForm = attributeFilter.displayForm;
                const attributesService = effectiveBackend.workspace(effectiveWorkspace).attributes();
                const elementsQueryOptions = {
                    elements: attributeFilter.negativeSelection
                        ? undefined // for negative filters we need to load the items NOT selected, however there is no way of doing that, so we load everything
                        : effectiveBackend.capabilities.supportsElementUris
                            ? {
                                uris: attributeFilter.attributeElements.uris,
                            }
                            : {
                                primaryValues: attributeFilter.attributeElements.uris,
                            },
                    includeTotalCountWithoutFilters: true,
                };
                const [elements, displayFormData] = await Promise.all([
                    attributesService
                        .elements()
                        .forDisplayForm(displayForm)
                        .withLimit(DEFAULT_ATTRIBUTE_ELEMENT_COUNT)
                        .withOptions(elementsQueryOptions)
                        .query(),
                    attributesService.getAttributeDisplayForm(displayForm),
                ]);
                const attribute = await attributesService.getAttribute(displayFormData.attribute);
                return {
                    elements,
                    displayForm,
                    title: attribute.title,
                };
            }));
            const filterData = await filterDataPromise;
            const attributeFiltersMeta = filterData.reduce((acc, curr) => {
                acc[objRefToString(curr.displayForm)] = {
                    title: curr.title,
                    totalElementsCount: curr.elements.totalCount,
                    validElements: curr.elements.items,
                };
                return acc;
            }, {});
            return {
                attributeFiltersMeta,
                dateDatasets: dateDatasets.map((ds) => ds.dataSet),
            };
        }
        : null;
    return useCancelablePromise({ promise, onCancel, onError, onLoading, onPending, onSuccess }, [
        effectiveBackend,
        effectiveWorkspace,
        brokenAlertFilters,
    ]);
}
//# sourceMappingURL=useBrokenAlertFiltersMeta.js.map