// (C) 2007-2021 GoodData Corporation
import gooddata from "@gooddata/api-client-bear";
/**
 * Loads date data sets defined in the provided workspace. This function retrieves the minimum
 * descriptive information about the data set, its attributes and display forms.
 *
 * @param workspaceId - workspace to get date data sets from
 * @returns list of date data sets
 */
export async function loadDateDataSets(workspaceId) {
    const dateDataSets = [];
    const attributeUriToDs = {};
    const dataSets = await gooddata.md.getObjectsByQuery(workspaceId, {
        category: "dataSet",
    });
    dataSets
        .filter((ds) => { var _a; return (_a = ds.dataSet.content.urn) === null || _a === void 0 ? void 0 : _a.endsWith(":date"); })
        .forEach((ds) => {
        const newDs = {
            dateDataSet: {
                meta: {
                    identifier: ds.dataSet.meta.identifier,
                    tags: ds.dataSet.meta.tags,
                    title: ds.dataSet.meta.title,
                },
                content: {
                    attributes: [],
                },
            },
        };
        dateDataSets.push(newDs);
        const attributeUris = ds.dataSet.content.attributes;
        attributeUris.forEach((attrUri) => {
            attributeUriToDs[attrUri] = newDs;
        });
    });
    const objects = await gooddata.md.getObjects(workspaceId, Object.keys(attributeUriToDs));
    objects.forEach((attr) => {
        const dataSet = attributeUriToDs[attr.attribute.meta.uri];
        const newDfs = attr.attribute.content.displayForms.map((df) => {
            return {
                meta: {
                    identifier: df.meta.identifier,
                    tags: df.meta.tags,
                    title: df.meta.title,
                },
            };
        });
        const newAttr = {
            attribute: {
                meta: {
                    identifier: attr.attribute.meta.identifier,
                    tags: attr.attribute.meta.tags,
                    title: attr.attribute.meta.title,
                },
                content: {
                    displayForms: newDfs,
                },
            },
        };
        dataSet.dateDataSet.content.attributes.push(newAttr);
    });
    return dateDataSets;
}
