import { mapFeatures } from "./feature.js";
export async function getStaticFeatures(features) {
    const { items } = features;
    return mapFeatures(remapStaticFeatures(items));
}
function remapStaticFeatures(features) {
    return Object.keys(features).reduce((prev, key) => {
        const value = features[key];
        prev[key] = {
            id: key,
            l: false,
            key,
            strategies: [],
            type: "STRING",
            value,
            version: "1",
        };
        return prev;
    }, {});
}
//# sourceMappingURL=static.js.map