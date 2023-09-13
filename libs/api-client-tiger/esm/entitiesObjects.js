import { EntitiesApiFactory, Configuration, } from "./generated/metadata-json-api/index.js";
import { BaseAPI } from "./generated/metadata-json-api/base.js";
export { Configuration as MetadataConfiguration, BaseAPI as MetadataBaseApi, };
export const tigerEntitiesObjectsClientFactory = (axios) => EntitiesApiFactory(undefined, "", axios);
//# sourceMappingURL=entitiesObjects.js.map