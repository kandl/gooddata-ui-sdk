import { DefaultFeatureFlags } from "../uiFeatures.js";
import { getFeatureHubFeatures } from "./hub.js";
import { getStaticFeatures } from "./static.js";
export class TigerFeaturesService {
    constructor(authCall) {
        this.authCall = authCall;
    }
    async getFeatures(profile, wsContext) {
        return this.authCall(async (client) => {
            const prof = profile || (await client.profile.getCurrent());
            const results = await loadFeatures(prof, wsContext);
            return Object.assign(Object.assign({}, DefaultFeatureFlags), results);
        });
    }
}
async function loadFeatures(profile, wsContext = {}) {
    const features = profile.features || {};
    if (featuresAreLive(features)) {
        return await getFeatureHubFeatures(features.live, wsContext);
    }
    if (featuresAreStatic(features)) {
        return await getStaticFeatures(features.static);
    }
    return Promise.resolve({});
}
function featuresAreLive(item) {
    return Boolean(item === null || item === void 0 ? void 0 : item.live);
}
function featuresAreStatic(item) {
    return Boolean(item === null || item === void 0 ? void 0 : item.static);
}
export function pickContext(attributes, organizationId) {
    const context = {};
    if ((attributes === null || attributes === void 0 ? void 0 : attributes.earlyAccess) !== undefined) {
        context.earlyAccess = attributes.earlyAccess;
    }
    if (organizationId !== undefined) {
        context.organizationId = organizationId;
    }
    return context;
}
//# sourceMappingURL=index.js.map