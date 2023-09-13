// (C) 2019-2021 GoodData Corporation
import { UnexpectedResponseError, } from "@gooddata/sdk-backend-spi";
import { identifierToRecording } from "./utils.js";
import isEmpty from "lodash/isEmpty.js";
import cloneDeep from "lodash/cloneDeep.js";
import { insightId, insightTitle, isIdentifierRef, isUriRef, visClassId, visClassUri, mergeFilters, insightFilters, insightSetFilters, uriRef, idRef, insightTags, } from "@gooddata/sdk-model";
import values from "lodash/values.js";
import { InMemoryPaging } from "@gooddata/sdk-backend-base";
let adHocInsightCounter = 1;
/**
 * Note: the impl always makes / gives clones of recorded insights to prevent mutable operations
 * impacting the recordings and thus violate client-server interaction integrity (client mutates, server
 * suddenly starts returning modified data for everyone)
 *
 * @internal
 */
export class RecordedInsights {
    constructor(recordings, insightRefType) {
        var _a, _b, _c, _d, _e;
        this.insightRefType = insightRefType;
        this.getInsightReferencedObjects = async (_insight, _types) => {
            return {};
        };
        this.getInsightReferencingObjects = async (_ref) => {
            return {};
        };
        this.getInsightWithAddedFilters = async (insight, filters) => {
            if (!filters.length) {
                return insight;
            }
            // we assume that all the filters already use idRefs exclusively
            const mergedFilters = mergeFilters(insightFilters(insight), filters);
            return insightSetFilters(insight, mergedFilters);
        };
        this.insights = (_b = (_a = recordings.metadata) === null || _a === void 0 ? void 0 : _a.insights) !== null && _b !== void 0 ? _b : {};
        this.visClasses = (_e = (_d = (_c = recordings.metadata) === null || _c === void 0 ? void 0 : _c.visClasses) === null || _d === void 0 ? void 0 : _d.items) !== null && _e !== void 0 ? _e : [];
    }
    async createInsight(def) {
        const newId = `adHocInsight_${adHocInsightCounter++}`;
        const ref = this.createRef(newId, newId);
        const newInsight = { insight: Object.assign({ identifier: newId, uri: newId, ref }, cloneDeep(def.insight)) };
        const recordingId = recId(newId);
        this.insights[recordingId] = { obj: newInsight };
        return newInsight;
    }
    async getInsight(ref) {
        if (isEmpty(this.insights)) {
            throw new UnexpectedResponseError("No insight recordings", 404, {});
        }
        /*
         * recorded backend treats both identifier and URI as ID; the value will be used to look up
         * insight in the recording index
         */
        const id = isIdentifierRef(ref) ? ref.identifier : ref.uri;
        const recordingId = recId(identifierToRecording(id));
        const recording = this.insights[recordingId];
        if (!recording) {
            throw new UnexpectedResponseError(`No insight with ID: ${id}`, 404, {});
        }
        return this.createInsightWithRef(recording.obj);
    }
    async getInsights(query) {
        const { limit, offset, orderBy } = query !== null && query !== void 0 ? query : {};
        if (isEmpty(this.insights)) {
            return new InMemoryPaging([], limit, offset);
        }
        const insights = values(this.insights).map((rec) => this.createInsightWithRef(rec.obj));
        if (orderBy) {
            insights.sort(comparator(orderBy));
        }
        return new InMemoryPaging(insights, limit, offset);
    }
    async updateInsight(insight) {
        const id = insightId(insight);
        const recordingId = recId(id);
        const existingRecording = this.insights[recordingId];
        if (!existingRecording) {
            throw new UnexpectedResponseError(`No insight with ID: ${id}`, 404, {});
        }
        existingRecording.obj = cloneDeep(insight);
        return existingRecording.obj;
    }
    async deleteInsight(ref) {
        const id = isIdentifierRef(ref) ? ref.identifier : ref.uri;
        const recordingId = recId(id);
        if (!this.insights[recordingId]) {
            throw new UnexpectedResponseError(`No insight with ID: ${id}`, 404, {});
        }
        delete this.insights[recordingId];
    }
    async getVisualizationClass(ref) {
        return isUriRef(ref)
            ? this.getVisualizationClassByUri(ref.uri)
            : this.getVisualizationClassById(ref.identifier);
    }
    async getVisualizationClasses() {
        return this.visClasses;
    }
    createInsightWithRef(obj) {
        return {
            insight: Object.assign(Object.assign({}, cloneDeep(obj.insight)), { ref: this.createRef(obj.insight.uri, obj.insight.identifier), tags: insightTags(obj) }),
        };
    }
    createRef(uri, id) {
        return this.insightRefType === "uri" ? uriRef(uri) : idRef(id, "insight");
    }
    async getVisualizationClassByUri(uri) {
        const result = this.visClasses.find((visClass) => visClassUri(visClass) === uri);
        if (!result) {
            throw new UnexpectedResponseError(`No visClass with URI: ${uri}`, 404, {});
        }
        return result;
    }
    async getVisualizationClassById(id) {
        const result = this.visClasses.find((visClass) => visClassId(visClass) === id);
        if (!result) {
            throw new UnexpectedResponseError(`No visClass with ID: ${id}`, 404, {});
        }
        return result;
    }
}
const titleComparator = (a, b) => {
    return insightTitle(a).localeCompare(insightTitle(b));
};
const idComparator = (a, b) => {
    return insightId(a).localeCompare(insightId(b));
};
function comparator(orderBy) {
    if (orderBy === "title") {
        return titleComparator;
    }
    /*
     * note: ID comparator is used for both orderBy 'id' and 'updated'. That is because 'updated' is not yet
     * part of the IInsight so there's nothing to sort by.
     */
    return idComparator;
}
function recId(forId) {
    return `i_${identifierToRecording(forId)}`;
}
//# sourceMappingURL=insights.js.map