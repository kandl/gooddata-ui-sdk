import keyBy from "lodash/keyBy.js";
export function createLabelMap(included) {
    if (!included) {
        return {};
    }
    const labels = included
        .map((include) => {
        if (include.type !== "label") {
            return null;
        }
        return include;
    })
        .filter((include) => include !== null);
    return keyBy(labels, (t) => t.id);
}
export function createDatasetMap(included) {
    if (!included) {
        return {};
    }
    const datasets = included
        .map((include) => {
        if (include.type !== "dataset") {
            return null;
        }
        return include;
    })
        .filter((include) => include !== null);
    return keyBy(datasets, (t) => t.id);
}
export function getReferencedDataset(relationships, datasetsMap) {
    var _a;
    if (!relationships) {
        return;
    }
    const datasetsRef = (_a = relationships === null || relationships === void 0 ? void 0 : relationships.dataset) === null || _a === void 0 ? void 0 : _a.data;
    if (!datasetsRef) {
        return;
    }
    return datasetsMap[datasetsRef.id];
}
export function convertLabels(attribute, labelsMap) {
    var _a, _b;
    const labelsRefs = (_b = (_a = attribute.relationships) === null || _a === void 0 ? void 0 : _a.labels) === null || _b === void 0 ? void 0 : _b.data;
    return labelsRefs
        .map((ref) => {
        var _a, _b, _c, _d, _e;
        const label = labelsMap[ref.id];
        if (!label) {
            return;
        }
        return {
            meta: {
                identifier: ref.id,
                title: (_b = (_a = label.attributes) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : ref.id,
                tags: (_e = (_d = (_c = label.attributes) === null || _c === void 0 ? void 0 : _c.tags) === null || _d === void 0 ? void 0 : _d.join(",")) !== null && _e !== void 0 ? _e : "",
            },
        };
    })
        .filter((df) => df !== undefined);
}
export function convertAttribute(attribute, labels) {
    var _a, _b, _c, _d, _e;
    return {
        attribute: {
            content: {
                displayForms: convertLabels(attribute, labels),
            },
            meta: {
                identifier: attribute.id,
                title: (_b = (_a = attribute.attributes) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : attribute.id,
                tags: (_e = (_d = (_c = attribute.attributes) === null || _c === void 0 ? void 0 : _c.tags) === null || _d === void 0 ? void 0 : _d.join(",")) !== null && _e !== void 0 ? _e : "",
            },
        },
    };
}
