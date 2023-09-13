// (C) 2019-2022 GoodData Corporation
import { bucketIsEmpty, idMatchMeasure, measureMasterIdentifier, bucketMeasures, } from "@gooddata/sdk-model";
import findIndex from "lodash/findIndex.js";
function buildBucketIndex(definition) {
    return definition.buckets.reduce((acc, val) => {
        const id = val.localIdentifier ? val.localIdentifier : "unknown";
        acc[id] = val;
        return acc;
    }, {});
}
class ExecutionDefinitonMethods {
    constructor(definition) {
        this.definition = definition;
        this._bucketByLocalId = buildBucketIndex(definition);
    }
    attributes() {
        return this.definition.attributes;
    }
    measures() {
        return this.definition.measures;
    }
    buckets() {
        return this.definition.buckets;
    }
    bucket(localId) {
        if (!localId) {
            return undefined;
        }
        return this._bucketByLocalId[localId];
    }
    bucketCount() {
        return this.definition.buckets.length;
    }
    hasBuckets() {
        return this.bucketCount() > 0;
    }
    isBucketEmpty(localId) {
        const bucket = this._bucketByLocalId[localId];
        if (!bucket) {
            return true;
        }
        return bucketIsEmpty(this._bucketByLocalId[localId]);
    }
    bucketMeasures(localId) {
        const bucket = this._bucketByLocalId[localId];
        if (!bucket) {
            return [];
        }
        return bucketMeasures(this._bucketByLocalId[localId]);
    }
    measure(localId) {
        return this.definition.measures.find(idMatchMeasure(localId));
    }
    measureIndex(localId) {
        return findIndex(this.definition.measures, idMatchMeasure(localId));
    }
    masterMeasureForDerived(localId) {
        const measure = this.measure(localId);
        if (!measure) {
            return;
        }
        const masterMeasureId = measureMasterIdentifier(measure);
        if (!masterMeasureId) {
            // TODO: revisit; this is weird but existing callers used to rely on the behavior;
            //  perhaps rename method?
            return measure;
        }
        return this.measure(masterMeasureId);
    }
    hasAttributes() {
        return this.definition.attributes.length > 0;
    }
}
export function newExecutionDefinitonMethods(definition) {
    return new ExecutionDefinitonMethods(definition);
}
//# sourceMappingURL=definitionMethods.js.map