import { RecordedElementQueryFactory } from "./elements.js";
import { objRefToString, isCatalogAttribute, isUriRef, } from "@gooddata/sdk-model";
import { newAttributeMetadataObject } from "@gooddata/sdk-backend-base";
import values from "lodash/values.js";
import { objRefsToStringKey } from "./utils.js";
import compact from "lodash/compact.js";
import { NotSupported, UnexpectedResponseError, } from "@gooddata/sdk-backend-spi";
/**
 * @internal
 */
export class RecordedAttributes {
    constructor(recordings, config) {
        this.recordings = recordings;
        this.config = config;
        this.getAttributeDisplayForm = async (ref) => {
            var _a;
            if (!((_a = this.recordings.metadata) === null || _a === void 0 ? void 0 : _a.displayForms)) {
                throw new UnexpectedResponseError("No displayForm recordings", 404, {});
            }
            const recording = values(this.recordings.metadata.displayForms).find((rec) => this.isObjWithRef(rec.obj, ref));
            if (!recording) {
                throw new UnexpectedResponseError(`No element recordings for df ${objRefToString(ref)}`, 404, {});
            }
            return recording.obj;
        };
        this.getAttribute = async (ref) => {
            var _a;
            if (!((_a = this.recordings.metadata) === null || _a === void 0 ? void 0 : _a.catalog)) {
                throw new UnexpectedResponseError("No recordings", 404, {});
            }
            const recording = this.recordings.metadata.catalog.items
                .filter(isCatalogAttribute)
                .find((wrappedAttribute) => {
                return this.isObjWithRef(wrappedAttribute.attribute, ref);
            });
            if (!recording) {
                throw new UnexpectedResponseError(`No attribute recording ${objRefToString(ref)}`, 404, {});
            }
            return this.sanitizeAttribute(recording.attribute);
        };
        this.getAttributeByDisplayForm = async (ref) => {
            var _a;
            if (!((_a = this.recordings.metadata) === null || _a === void 0 ? void 0 : _a.catalog)) {
                throw new UnexpectedResponseError("No recordings", 404, {});
            }
            const recording = this.recordings.metadata.catalog.items
                .filter(isCatalogAttribute)
                .find((wrappedAttribute) => {
                return wrappedAttribute.displayForms.some((df) => this.isObjWithRef(df, ref));
            });
            if (!recording) {
                throw new UnexpectedResponseError(`No attribute recording ${objRefToString(ref)}`, 404, {});
            }
            return this.sanitizeAttribute(recording.attribute);
        };
        this.getAttributeDisplayForms = async (refs) => {
            // note: this is here to match the funky SPI contract; invalid refs are ignored
            const loader = (ref) => {
                return this.getAttributeDisplayForm(ref).catch((_) => undefined);
            };
            return compact(await Promise.all(refs.map(loader)));
        };
        this.getAttributes = async (refs) => {
            // note: this is here to match the funky SPI contract; invalid refs are ignored
            const loader = (ref) => {
                return this.getAttribute(ref).catch((_) => undefined);
            };
            return compact(await Promise.all(refs.map(loader)));
        };
    }
    elements() {
        return new RecordedElementQueryFactory(this.recordings, this.config);
    }
    async getCommonAttributes(attributeRefs) {
        var _a;
        const key = objRefsToStringKey(attributeRefs);
        const response = (_a = this.config.getCommonAttributesResponses) === null || _a === void 0 ? void 0 : _a[key];
        if (!response) {
            throw new UnexpectedResponseError(`No common attributes response set for key ${key}`, 404, {});
        }
        return response;
    }
    getCommonAttributesBatch(attributesRefsBatch) {
        return Promise.all(attributesRefsBatch.map((refs) => this.getCommonAttributes(refs)));
    }
    getAttributeDatasetMeta(_) {
        throw new NotSupported("not supported");
    }
    sanitizeAttribute(attribute) {
        const { ref, title, uri, id, production, description, displayForms } = attribute;
        return newAttributeMetadataObject(ref, (a) => a
            .title(title)
            .uri(uri)
            .production(Boolean(production))
            .id(id)
            .description(description)
            .displayForms(displayForms));
    }
    isObjWithRef(obj, ref) {
        if (isUriRef(ref)) {
            return obj.uri === ref.uri;
        }
        return obj.id === ref.identifier;
    }
}
//# sourceMappingURL=attributes.js.map