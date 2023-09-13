import axios from "axios";
import { mapFeatures } from "./feature.js";
const state = {};
const FH_TIMEOUT = 30000; //wait max 30s to FeatureHub
export async function getFeatureHubFeatures(features, wsContext = {}) {
    const { configuration, context } = features;
    try {
        const data = await loadHubFeatures(configuration, Object.assign(Object.assign({}, context), wsContext), state);
        const featuresMap = data.reduce((prev, item) => (Object.assign(Object.assign({}, prev), { [item.key]: item })), {});
        return mapFeatures(featuresMap);
    }
    catch (err) {
        console.error("Loading features from FeatureHub was not successful. Err: " + err);
        return {};
    }
}
//NOTE: Use FeatureHub SDK after we upgrade version of typescript
// - more info in ticket RAIL-4279
async function loadHubFeatures(configuration, context, state) {
    const { host, key } = configuration;
    return new Promise((resolve, reject) => {
        function callFailed() {
            delete state[key];
            reject(new Error(`FeatureHub is not ready, is not available or api key is wrong.`));
        }
        const promise = getFeatureHubData(host, key, context, state[key]);
        promise.then(({ data, headers, status }) => {
            if (status === 304) {
                loadFeatures(state[key].data, resolve, callFailed);
                return;
            }
            state[key] = {
                etag: headers["etag"],
                data: data || [],
            };
            loadFeatures(data, resolve, callFailed);
        });
        promise.catch(callFailed);
    });
}
function loadFeatures(data, resolveFn, errFn) {
    const record = data[data.length - 1];
    if (record) {
        resolveFn(record.features);
        return;
    }
    errFn();
}
async function getFeatureHubData(host, key, context, state) {
    return axios.get("/features", {
        method: "GET",
        baseURL: host,
        params: {
            sdkUrl: key,
        },
        timeout: FH_TIMEOUT,
        headers: Object.assign({ "Content-type": "application/json", "X-FeatureHub": Object.keys(context)
                .reduce((prev, item) => {
                return [
                    ...prev,
                    `${item}=${encodeURIComponent(context[item].toString())}`,
                ];
            }, [])
                .join(",") }, (state ? { "if-none-match": state.etag } : {})),
        validateStatus: (status) => {
            return (status >= 200 && status < 300) || status === 304;
        },
    });
}
//# sourceMappingURL=hub.js.map