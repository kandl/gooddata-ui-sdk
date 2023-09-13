// (C) 2019-2023 GoodData Corporation
import { NotImplemented, UnexpectedResponseError, } from "@gooddata/sdk-backend-spi";
import { filterAttributeElements, filterObjRef, isAttributeElementsByRef, isAttributeFilter, isUriRef, } from "@gooddata/sdk-model";
import { identifierToRecording } from "./utils.js";
import { InMemoryPaging } from "@gooddata/sdk-backend-base";
import flow from "lodash/fp/flow.js";
import { invariant } from "ts-invariant";
import { resolveLimitingItems, resolveSelectedElements, resolveStringFilter } from "./elementsUtils.js";
/**
 * @internal
 */
export class RecordedElementQueryFactory {
    constructor(recordings, config) {
        this.recordings = recordings;
        this.config = config;
    }
    forDisplayForm(ref) {
        return new RecordedElements(ref, this.recordings, this.config);
    }
    forFilter(filter) {
        return new RecordedFilterElements(filter, this.recordings);
    }
}
class RecordedElements {
    constructor(ref, recordings, config) {
        this.ref = ref;
        this.recordings = recordings;
        this.config = config;
        this.limit = 50;
        this.offset = 0;
        this.options = {};
        this.attributeFilters = [];
        this.dateFilters = [];
        this.measures = [];
    }
    query() {
        var _a;
        if (!((_a = this.recordings.metadata) === null || _a === void 0 ? void 0 : _a.displayForms)) {
            return Promise.reject(new UnexpectedResponseError("No displayForm recordings", 404, {}));
        }
        if (isUriRef(this.ref)) {
            return Promise.reject(new NotImplemented("Identifying displayForm by uri is not supported yet"));
        }
        const recording = this.recordings.metadata.displayForms["df_" + identifierToRecording(this.ref.identifier)];
        if (!recording) {
            return Promise.reject(new UnexpectedResponseError(`No element recordings for df ${this.ref.identifier}`, 404, {}));
        }
        let elements = flow(
        // resolve limiting items first so that they do not need to care about the other filters
        // and have nice indexes for the limiting strategies
        resolveLimitingItems(this.config.attributeElementsFiltering, this.attributeFilters, this.dateFilters, this.measures), resolveSelectedElements(this.options.elements), resolveStringFilter(this.options.filter))(recording.elements);
        if (this.options.order === "desc") {
            elements = [...elements].reverse();
        }
        return Promise.resolve(new InMemoryPaging(elements, this.limit, this.offset));
    }
    withLimit(limit) {
        invariant(limit > 0, "Limit must be positive number");
        this.limit = limit;
        return this;
    }
    withOffset(offset) {
        this.offset = offset;
        return this;
    }
    withOptions(options) {
        this.options = options !== null && options !== void 0 ? options : {};
        return this;
    }
    withDateFilters(filters) {
        this.dateFilters = filters !== null && filters !== void 0 ? filters : [];
        return this;
    }
    withAttributeFilters(filters) {
        this.attributeFilters = filters !== null && filters !== void 0 ? filters : [];
        return this;
    }
    withMeasures(measures) {
        this.measures = measures !== null && measures !== void 0 ? measures : [];
        return this;
    }
    withSignal(_) {
        return this;
    }
}
class RecordedFilterElements {
    constructor(filter, recordings) {
        this.filter = filter;
        this.recordings = recordings;
        this.limit = 50;
        this.offset = 0;
        this.ref = filterObjRef(filter);
    }
    // eslint-disable-next-line sonarjs/no-identical-functions
    withLimit(limit) {
        invariant(limit > 0, "Limit must be positive number");
        this.limit = limit;
        return this;
    }
    // eslint-disable-next-line sonarjs/no-identical-functions
    withOffset(offset) {
        this.offset = offset;
        return this;
    }
    query() {
        var _a;
        if (!((_a = this.recordings.metadata) === null || _a === void 0 ? void 0 : _a.displayForms)) {
            return Promise.reject(new UnexpectedResponseError("No displayForm recordings", 404, {}));
        }
        if (isUriRef(this.ref)) {
            return Promise.reject(new NotImplemented("Identifying displayForm by uri is not supported yet"));
        }
        const recording = this.recordings.metadata.displayForms["df_" + identifierToRecording(this.ref.identifier)];
        if (!recording) {
            return Promise.reject(new UnexpectedResponseError(`No element recordings for df ${this.ref.identifier}`, 404, {}));
        }
        if (isAttributeFilter(this.filter)) {
            let elements = recording.elements;
            const selectedElements = filterAttributeElements(this.filter);
            if (isAttributeElementsByRef(selectedElements)) {
                elements = elements.filter((element) => selectedElements.uris.find((uri) => uri === element.uri));
            }
            else {
                elements = elements.filter((element) => selectedElements.values.find((value) => value === element.title));
            }
            return Promise.resolve(new InMemoryPaging(elements, this.limit, this.offset));
        }
        else {
            return Promise.reject(new NotImplemented("Date filter is not supported yet"));
        }
    }
}
//# sourceMappingURL=elements.js.map