// (C) 2019-2023 GoodData Corporation
import { FilterByLabelTypeEnum, ElementsRequestSortOrderEnum, } from "@gooddata/api-client-tiger";
import { InMemoryPaging, ServerPaging } from "@gooddata/sdk-backend-base";
import { isElementsQueryOptionsElementsByValue, isValueBasedElementsQueryOptionsElements, NotSupported, UnexpectedError, } from "@gooddata/sdk-backend-spi";
import { filterAttributeElements, isAttributeElementsByRef, isAttributeFilter, isIdentifierRef, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import { getRelativeDateFilterShiftedValues } from "./date.js";
import { toSdkGranularity } from "../../../../convertors/fromBackend/dateGranularityConversions.js";
import { createDateValueFormatter } from "../../../../convertors/fromBackend/dateFormatting/dateValueFormatter.js";
import { TigerCancellationConverter } from "../../../../cancelation/index.js";
export class TigerWorkspaceElements {
    constructor(authCall, workspace, dateFormatter) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.dateFormatter = dateFormatter;
    }
    forDisplayForm(ref) {
        return new TigerWorkspaceElementsQuery(this.authCall, ref, this.workspace, this.dateFormatter);
    }
    forFilter(filter) {
        return new TigerWorkspaceFilterElementsQuery(this.authCall, filter);
    }
}
class TigerWorkspaceElementsQuery {
    constructor(authCall, ref, workspace, dateFormatter) {
        this.authCall = authCall;
        this.ref = ref;
        this.workspace = workspace;
        this.dateFormatter = dateFormatter;
        this.limit = 100;
        this.offset = 0;
        this.signal = null;
    }
    withSignal(signal) {
        this.signal = signal;
        return this;
    }
    withLimit(limit) {
        invariant(limit > 0, `limit must be a positive number, got: ${limit}`);
        this.limit = limit;
        return this;
    }
    withOffset(offset) {
        this.offset = offset;
        return this;
    }
    withAttributeFilters() {
        throw new NotSupported("withAttributeFilters is not supported in sdk-backend-tiger yet");
    }
    withDateFilters() {
        throw new NotSupported("withDateFilters is not supported in sdk-backend-tiger yet");
    }
    withMeasures() {
        throw new NotSupported("withMeasures is not supported in sdk-backend-tiger yet");
    }
    withOptions(options) {
        this.options = options;
        return this;
    }
    async query() {
        return this.queryWorker(this.options);
    }
    getExactFilterSpec(options) {
        const { elements } = options;
        if (elements) {
            invariant(isValueBasedElementsQueryOptionsElements(elements), "Specifying elements by URIs is not supported. Use specification by value instead.");
            return isElementsQueryOptionsElementsByValue(elements)
                ? {
                    exactFilter: elements.values,
                    filterBy: {
                        labelType: FilterByLabelTypeEnum.REQUESTED,
                    },
                }
                : {
                    exactFilter: elements.primaryValues,
                    filterBy: {
                        labelType: FilterByLabelTypeEnum.PRIMARY,
                    },
                };
        }
        return {};
    }
    async queryWorker(options) {
        const { ref } = this;
        if (!isIdentifierRef(ref)) {
            throw new UnexpectedError("Tiger backend does not allow referencing objects by URI");
        }
        return ServerPaging.for(async ({ offset, limit }) => {
            const response = await this.authCall((client) => {
                const elementsRequest = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ label: ref.identifier }, ((options === null || options === void 0 ? void 0 : options.complement) && { complementFilter: options.complement })), ((options === null || options === void 0 ? void 0 : options.filter) && { patternFilter: options.filter })), this.getExactFilterSpec(options !== null && options !== void 0 ? options : {})), ((options === null || options === void 0 ? void 0 : options.excludePrimaryLabel) && {
                    excludePrimaryLabel: options.excludePrimaryLabel,
                })), ((options === null || options === void 0 ? void 0 : options.order) && {
                    sortOrder: options.order === "asc"
                        ? ElementsRequestSortOrderEnum.ASC
                        : ElementsRequestSortOrderEnum.DESC,
                }));
                const elementsRequestWrapped = {
                    limit: limit,
                    offset: offset,
                    elementsRequest,
                    workspaceId: this.workspace,
                };
                return client.labelElements.computeLabelElementsPost(elementsRequestWrapped, Object.assign({}, new TigerCancellationConverter(this.signal).forAxios()));
            });
            const { paging, elements, format, granularity } = response.data;
            const elementsGranularity = granularity;
            const sdkGranularity = toSdkGranularity(elementsGranularity);
            const locale = format === null || format === void 0 ? void 0 : format.locale;
            const pattern = format === null || format === void 0 ? void 0 : format.pattern;
            const shouldFormatTitle = sdkGranularity && format;
            const dateValueFormatter = createDateValueFormatter(this.dateFormatter);
            return {
                items: elements.map((element) => {
                    var _a;
                    const objWithFormattedTitle = shouldFormatTitle
                        ? {
                            formattedTitle: dateValueFormatter(element.title, sdkGranularity, locale, pattern),
                        }
                        : {};
                    return Object.assign({ title: element.title, uri: (_a = element.primaryTitle) !== null && _a !== void 0 ? _a : element.title }, objWithFormattedTitle);
                }),
                totalCount: paging.total,
            };
        }, this.limit, this.offset);
    }
}
class TigerWorkspaceFilterElementsQuery {
    constructor(_authCall, filter) {
        this.filter = filter;
        this.limit = 100;
        this.offset = 0;
    }
    // eslint-disable-next-line sonarjs/no-identical-functions
    withLimit(limit) {
        invariant(limit > 0, `limit must be a positive number, got: ${limit}`);
        this.limit = limit;
        return this;
    }
    withOffset(offset) {
        this.offset = offset;
        return this;
    }
    async query() {
        if (isAttributeFilter(this.filter)) {
            return this.queryAttributeFilterElements();
        }
        else {
            return this.queryDateFilterElements();
        }
    }
    async queryAttributeFilterElements() {
        const selectedElements = filterAttributeElements(this.filter) || { values: [] };
        // Tiger supports only elements by value, but KD sends them in format of elementsByRef so we need to handle both formats in the same way
        const values = isAttributeElementsByRef(selectedElements)
            ? selectedElements.uris
            : selectedElements.values;
        const elements = values.map((element) => ({
            title: element,
            uri: element,
        }));
        return Promise.resolve(new InMemoryPaging(elements, this.limit, this.offset));
    }
    async queryDateFilterElements() {
        const relativeDateFilters = getRelativeDateFilterShiftedValues(new Date(), this.filter);
        const items = relativeDateFilters.map((relativeDateFilter) => ({
            title: relativeDateFilter,
            uri: relativeDateFilter,
        }));
        return Promise.resolve(new InMemoryPaging(items, this.limit, this.offset));
    }
}
//# sourceMappingURL=index.js.map