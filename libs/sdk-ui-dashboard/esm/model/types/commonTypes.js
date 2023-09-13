import keys from "lodash/keys.js";
import includes from "lodash/includes.js";
const RequiredConfigKeys = [
    "dateFilterConfig",
    "locale",
    "separators",
    "colorPalette",
    "settings",
];
/**
 * Tests whether the provided config is fully resolved - it contains all the necessary values.
 *
 * @param config - config to test
 */
export function isResolvedConfig(config) {
    if (!config) {
        return false;
    }
    const specifiedConfig = keys(config);
    return RequiredConfigKeys.every((key) => includes(specifiedConfig, key));
}
//# sourceMappingURL=commonTypes.js.map