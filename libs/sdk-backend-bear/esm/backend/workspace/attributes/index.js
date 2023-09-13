// (C) 2019-2022 GoodData Corporation
import { uriRef, } from "@gooddata/sdk-model";
import { newAttributeDisplayFormMetadataObject, newAttributeMetadataObject, } from "@gooddata/sdk-backend-base";
import { invariant } from "ts-invariant";
import { objRefToUri, objRefsToUris, getObjectIdFromUri } from "../../../utils/api.js";
import { convertMetadataObjectXrefEntry } from "../../../convertors/fromBackend/MetaConverter.js";
import { BearWorkspaceElements } from "./elements/index.js";
import { UnexpectedError, } from "@gooddata/sdk-backend-spi";
import { isWrappedAttributeDisplayForm, } from "@gooddata/api-model-bear";
export class BearWorkspaceAttributes {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.elements = () => {
            return new BearWorkspaceElements(this.authCall, this.workspace);
        };
        this.getAttributeDisplayForm = async (ref) => {
            const displayFormUri = await objRefToUri(ref, this.workspace, this.authCall);
            const wrappedDisplayForm = await this.authCall((sdk) => sdk.md.getObjectDetails(displayFormUri));
            const displayFormDetails = wrappedDisplayForm.attributeDisplayForm;
            return this.buildAttributeDisplayForm(displayFormDetails);
        };
        this.getAttribute = async (ref) => {
            const attributeUri = await objRefToUri(ref, this.workspace, this.authCall);
            const wrappedAttribute = await this.authCall((sdk) => sdk.md.getObjectDetails(attributeUri));
            return this.buildAttribute(wrappedAttribute.attribute);
        };
        this.getAttributeDisplayForms = async (refs) => {
            const displayFormUris = await objRefsToUris(refs, this.workspace, this.authCall, false);
            const wrappedAttributeDisplayForms = await this.authCall((sdk) => sdk.md.getObjects(this.workspace, displayFormUris));
            return wrappedAttributeDisplayForms.map((wrappedDisplayForm) => {
                if (!isWrappedAttributeDisplayForm(wrappedDisplayForm)) {
                    throw new UnexpectedError("INVALID_REFERENCED_OBJECT", new Error("Referenced object is not attributeDisplayForm"));
                }
                const displayFormDetails = wrappedDisplayForm.attributeDisplayForm;
                return this.buildAttributeDisplayForm(displayFormDetails);
            });
        };
        this.getAttributes = async (refs) => {
            const attributeUris = await objRefsToUris(refs, this.workspace, this.authCall, false);
            const wrappedAttributes = await this.authCall((sdk) => sdk.md.getObjects(this.workspace, attributeUris));
            return wrappedAttributes.map((wrappedAttribute) => {
                const { meta: { title, uri, isProduction, identifier, summary }, content: { displayForms }, } = wrappedAttribute.attribute;
                const ref = uriRef(uri);
                const attributeDisplayForms = displayForms.map((displayForm) => this.buildAttributeDisplayForm(displayForm));
                return newAttributeMetadataObject(ref, (attribute) => attribute
                    .title(title)
                    .uri(uri)
                    .production(Boolean(isProduction))
                    .id(identifier)
                    .description(summary)
                    .displayForms(attributeDisplayForms));
            });
        };
        this.buildAttributeDisplayForm = (displayFormDetails) => {
            const { meta: { title, summary, identifier, uri }, content: { formOf, default: defaultDisplayForm, type }, } = displayFormDetails;
            const ref = uriRef(uri);
            const isDefaultDf = defaultDisplayForm === 1;
            return newAttributeDisplayFormMetadataObject(ref, (df) => df
                .attribute(uriRef(formOf))
                .title(title)
                .description(summary)
                .isDefault(isDefaultDf)
                .id(identifier)
                .uri(uri)
                .displayFormType(type));
        };
        this.buildAttribute = (attributeDetails) => {
            const { title, uri, isProduction, identifier, summary } = attributeDetails.meta;
            const { displayForms } = attributeDetails.content;
            const attributeDisplayForms = displayForms.map((displayForm) => this.buildAttributeDisplayForm(displayForm));
            const ref = uriRef(uri);
            return newAttributeMetadataObject(ref, (a) => a
                .title(title)
                .uri(uri)
                .production(Boolean(isProduction))
                .id(identifier)
                .description(summary)
                .displayForms(attributeDisplayForms));
        };
    }
    async getCommonAttributes(attributesRefs) {
        const inputAttributeUris = await objRefsToUris(attributesRefs, this.workspace, this.authCall);
        const returnAttributeUris = await this.authCall((sdk) => sdk.ldm.getCommonAttributes(this.workspace, inputAttributeUris));
        return returnAttributeUris.map(uriRef);
    }
    getCommonAttributesBatch(attributesRefsBatch) {
        return Promise.all(attributesRefsBatch.map(async (attributeRefs) => {
            return this.getCommonAttributes(attributeRefs);
        }));
    }
    async getAttributeByDisplayForm(ref) {
        const displayFormUri = await objRefToUri(ref, this.workspace, this.authCall);
        const wrappedDisplayForm = await this.authCall((sdk) => sdk.md.getObjectDetails(displayFormUri));
        const wrappedAttribute = await this.authCall((sdk) => sdk.md.getObjectDetails(wrappedDisplayForm.attributeDisplayForm.content.formOf));
        return this.buildAttribute(wrappedAttribute.attribute);
    }
    async getAttributeDatasetMeta(ref) {
        const uri = await objRefToUri(ref, this.workspace, this.authCall);
        const objectId = getObjectIdFromUri(uri);
        return this.authCall(async (sdk) => {
            const usedBy = await sdk.xhr.getParsed(`/gdc/md/${this.workspace}/usedby2/${objectId}?types=dataSet`);
            invariant(usedBy.entries.length > 0, "Attribute must have a dataset associated to it.");
            return convertMetadataObjectXrefEntry("dataSet", usedBy.entries[0]);
        });
    }
}
//# sourceMappingURL=index.js.map