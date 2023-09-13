// (C) 2007-2022 GoodData Corporation
import { MetadataUtilities, } from "@gooddata/api-client-tiger";
import { convertAttribute, createDatasetMap, createLabelMap, getReferencedDataset, } from "./tigerCommon.js";
import values from "lodash/values.js";
function findDateDatasetsWithAttributes(attributes, datasetsMap) {
    const res = {};
    const dateAttributes = attributes.data.filter((attribute) => { var _a; return ((_a = attribute.attributes) === null || _a === void 0 ? void 0 : _a.granularity) !== undefined; });
    dateAttributes.forEach((attribute) => {
        const dataset = getReferencedDataset(attribute.relationships, datasetsMap);
        if (!dataset) {
            return;
        }
        const entry = res[dataset.id];
        if (!entry) {
            res[dataset.id] = {
                dataset,
                attributes: [attribute],
            };
        }
        else {
            entry.attributes.push(attribute);
        }
    });
    return values(res);
}
function convertToExportableFormat(dateDatasets, labelsMap) {
    return dateDatasets.map(({ dataset, attributes }) => {
        var _a, _b, _c, _d, _e;
        return {
            dateDataSet: {
                meta: {
                    title: (_b = (_a = dataset.attributes) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : dataset.id,
                    identifier: dataset.id,
                    tags: (_e = (_d = (_c = dataset.attributes) === null || _c === void 0 ? void 0 : _c.tags) === null || _d === void 0 ? void 0 : _d.join(",")) !== null && _e !== void 0 ? _e : "",
                },
                content: {
                    attributes: attributes
                        .map((attribute) => convertAttribute(attribute, labelsMap))
                        .filter((a) => a !== undefined),
                },
            },
        };
    });
}
export async function loadDateDataSets(client, workspaceId) {
    const result = await MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesAttributes, {
        workspaceId,
        include: ["labels", "datasets"],
    }).then(MetadataUtilities.mergeEntitiesResults);
    const labelsMap = createLabelMap(result.included);
    const datasetsMap = createDatasetMap(result.included);
    const dateDatasets = findDateDatasetsWithAttributes(result, datasetsMap);
    return convertToExportableFormat(dateDatasets, labelsMap);
}
