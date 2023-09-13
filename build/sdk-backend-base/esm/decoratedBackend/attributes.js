// (C) 2021-2022 GoodData Corporation
/**
 * @alpha
 */
export class DecoratedWorkspaceAttributesService {
    constructor(decorated) {
        this.decorated = decorated;
    }
    elements() {
        return this.decorated.elements();
    }
    getAttributeDisplayForm(ref) {
        return this.decorated.getAttributeDisplayForm(ref);
    }
    getAttributeDisplayForms(refs) {
        return this.decorated.getAttributeDisplayForms(refs);
    }
    getAttribute(ref) {
        return this.decorated.getAttribute(ref);
    }
    getAttributeByDisplayForm(ref) {
        return this.decorated.getAttributeByDisplayForm(ref);
    }
    getAttributes(refs) {
        return this.decorated.getAttributes(refs);
    }
    getCommonAttributes(attributeRefs) {
        return this.decorated.getCommonAttributes(attributeRefs);
    }
    getCommonAttributesBatch(attributesRefsBatch) {
        return this.decorated.getCommonAttributesBatch(attributesRefsBatch);
    }
    getAttributeDatasetMeta(ref) {
        return this.decorated.getAttributeDatasetMeta(ref);
    }
}
//# sourceMappingURL=attributes.js.map