// (C) 2019-2021 GoodData Corporation
import { objRefToString } from "@gooddata/sdk-model";
/**
 * @internal
 */
export function identifierToRecording(id) {
    return id.replace(/\./g, "_");
}
/**
 * This function should be used to obtain keys for certain {@link RecordedBackendConfig} settings.
 *
 * @internal
 */
export function objRefsToStringKey(refs) {
    const sorted = refs.map(objRefToString).sort();
    return sorted.join("_");
}
//# sourceMappingURL=utils.js.map