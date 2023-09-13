import { __rest } from "tslib";
// (C) 2019-2023 GoodData Corporation
import { invariant } from "ts-invariant";
import { isValueBasedElementsQueryOptionsElements, } from "@gooddata/sdk-backend-spi";
import { filterObjRef, isAttributeFilter, filterAttributeElements, isAttributeElementsByRef, isRelativeDateFilter, } from "@gooddata/sdk-model";
import { InMemoryPaging, ServerPaging } from "@gooddata/sdk-backend-base";
import { objRefToUri, getObjectIdFromUri } from "../../../../utils/api.js";
import { LimitingAfmFactory } from "./limitingAfmFactory.js";
export class BearWorkspaceElements {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
    }
    forDisplayForm(ref) {
        return new BearWorkspaceElementsQuery(this.authCall, ref, this.workspace);
    }
    forFilter(filter, dateFilterDisplayForm) {
        return new BearWorkspaceFilterElementsQuery(this.authCall, filter, dateFilterDisplayForm, this.workspace);
    }
}
class BearWorkspaceElementsQuery {
    constructor(authCall, displayFormRef, workspace) {
        this.authCall = authCall;
        this.displayFormRef = displayFormRef;
        this.workspace = workspace;
        this.limit = 50;
        this.offset = 0;
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
    withAttributeFilters(filters) {
        this.attributeFilters = filters;
        return this;
    }
    withDateFilters(filters) {
        this.dateFilters = filters;
        return this;
    }
    withMeasures(measures) {
        this.measures = measures.length > 0 ? measures : undefined;
        return this;
    }
    withOptions(options) {
        this.options = options;
        return this;
    }
    withSignal(_) {
        console.warn("Cancelling requests is not supported on bear backend.");
        return this;
    }
    async query() {
        var _a;
        const limitingAfmFactory = new LimitingAfmFactory(this.authCall, this.displayFormRef, this.workspace);
        this.limitingAfm = await limitingAfmFactory.getAfm(this.attributeFilters, this.measures, this.dateFilters);
        return this.queryWorker((_a = this.options) !== null && _a !== void 0 ? _a : {});
    }
    async getObjectId() {
        if (!this.objectId) {
            const uri = await objRefToUri(this.displayFormRef, this.workspace, this.authCall);
            this.objectId = getObjectIdFromUri(uri);
        }
        return this.objectId;
    }
    async queryWorker(options) {
        const objectId = await this.getObjectId();
        const { elements } = options, restOptions = __rest(options, ["elements"]);
        invariant(!isValueBasedElementsQueryOptionsElements(elements), "Specifying elements by value is not supported.");
        const urisToUse = elements === null || elements === void 0 ? void 0 : elements.uris;
        invariant(!urisToUse || urisToUse.every((item) => item !== null), "Nulls are not supported as attribute element uris on bear");
        return ServerPaging.for(async ({ limit, offset }) => {
            const params = Object.assign(Object.assign(Object.assign({}, restOptions), { uris: urisToUse }), { limit,
                offset, afm: this.limitingAfm });
            const data = await this.authCall((sdk) => sdk.md.getValidElements(this.workspace, objectId, params));
            const { items, paging } = data.validElements;
            const totalCount = Number.parseInt(paging.total, 10);
            return {
                items: items.map(({ element }) => element),
                totalCount,
            };
        }, this.limit, this.offset);
    }
}
class BearWorkspaceFilterElementsQuery {
    constructor(authCall, filter, dateDf, workspace) {
        this.authCall = authCall;
        this.filter = filter;
        this.workspace = workspace;
        this.limit = 50;
        this.offset = 0;
        let ref = filterObjRef(filter);
        if (isRelativeDateFilter(filter)) {
            invariant(dateDf, "Date filter's display form needs to be defined");
            ref = dateDf;
        }
        this.elementsQuery = new BearWorkspaceElementsQuery(this.authCall, ref, this.workspace);
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
            const selectedElements = filterAttributeElements(this.filter);
            if (isAttributeElementsByRef(selectedElements)) {
                return this.resultForElementsByRef(selectedElements);
            }
            return this.resultForElementsByValue(selectedElements);
        }
        else {
            return this.elementsQuery.withDateFilters([this.filter]).query();
        }
    }
    async resultForElementsByRef(selectedElements) {
        if (selectedElements.uris.length) {
            return this.elementsQuery
                .withOptions({
                elements: {
                    uris: selectedElements.uris,
                },
            })
                .withOffset(this.offset)
                .withLimit(this.limit)
                .query();
        }
        // Filter with empty selection resolves to empty values
        return Promise.resolve(new InMemoryPaging([], this.limit, this.offset));
    }
    async resultForElementsByValue(selectedElements) {
        const items = selectedElements.values.map((element) => ({
            title: element,
            uri: element,
        }));
        return Promise.resolve(new InMemoryPaging(items, this.limit, this.offset));
    }
}
//# sourceMappingURL=index.js.map