function getAttributeUris(displayForms) {
    return displayForms.map((displayForm) => displayForm.attributeDisplayForm.content.formOf);
}
function createAttributesMap(displayForms, attributes) {
    return displayForms.reduce((attributesMap, displayForm) => {
        const dfUri = displayForm.attributeDisplayForm.meta.uri;
        const attribute = attributes.find((attr) => attr.attribute.meta.uri === displayForm.attributeDisplayForm.content.formOf);
        attributesMap[dfUri] = attribute;
        return attributesMap;
    }, {});
}
export function getMissingUrisInAttributesMap(displayFormsUris, attributesMap) {
    const uris = displayFormsUris || [];
    return uris.filter((uri) => !attributesMap[uri]);
}
export class AttributesMapLoaderModule {
    constructor(md) {
        this.md = md;
    }
    loadAttributesMap(projectId, attributeDisplayFormUris) {
        if (attributeDisplayFormUris.length === 0) {
            return Promise.resolve({});
        }
        return this.md
            .getObjects(projectId, attributeDisplayFormUris)
            .then((displayForms) => {
            const attributeUris = getAttributeUris(displayForms);
            return this.md.getObjects(projectId, attributeUris).then((attributes) => {
                return createAttributesMap(displayForms, attributes);
            });
        });
    }
}
//# sourceMappingURL=attributesMapLoader.js.map