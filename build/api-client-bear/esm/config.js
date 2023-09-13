// (C) 2007-2020 GoodData Corporation
import set from "lodash/set.js";
/**
 * Config module holds SDK configuration variables
 *
 * Currently its only custom domain - which enabled using
 * sdk from different domain (using CORS)
 *
 * Never set properties directly - always use setter methods
 *
 */
const URL_REGEXP = "(?:(https)://+|(www\\.)?)\\w[:;,\\.?\\[\\]\\w/~%&=+#-@!]*";
export function sanitizeDomain(domain) {
    if (domain === null) {
        return undefined;
    }
    const sanitizedDomain = domain || "";
    const link = sanitizedDomain.match(URL_REGEXP);
    if (!link) {
        throw new Error(`${domain} is not a valid url`);
    }
    // ensure https:// prefix and strip possible trailing /
    return `https://${link[0].replace(/^https?:\/\/|\/$/g, "")}`;
}
/**
 * Returns sanitized config
 *
 * @returns config with sanitized domain
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function sanitizeConfig(config) {
    const sanitized = Object.assign({}, config);
    if (config.domain) {
        sanitized.domain = sanitizeDomain(config.domain);
    }
    return sanitized;
}
/**
 * Config factory
 *
 * @param configStorage - config object
 * @returns SDK config module
 */
export class ConfigModule {
    constructor(configStorage) {
        this.configStorage = configStorage;
        if (arguments.length !== 1) {
            throw new Error("Config module has to be called with exactly one argument.");
        }
    }
    /**
     * Sets custom domain. Parameter is url which has always to be https://
     * (if you don't provide it, we will do it for you).
     *
     * RegExp inspired taken from
     * https://github.com/jarib/google-closure-library/blob/master/closure/goog/string/linkify.js
     * @param domain - valid domain starting with https:// or null for removing
     */
    setCustomDomain(domain) {
        this.configStorage.domain = sanitizeDomain(domain);
    }
    /**
     * Returns current domain
     *
     */
    getCustomDomain() {
        return this.configStorage.domain;
    }
    /**
     * Sets JS package and version info
     *
     * @param name - package name
     * @param version - package version (semver)
     * @internal
     */
    setJsPackage(name, version) {
        if (!this.configStorage.originPackage) {
            // only set the first (topmost) package
            this.configStorage.originPackage = { name, version };
        }
    }
    /**
     * Returns JS package and version info
     *
     * @returns with 'name' and 'version' properties
     * @internal
     */
    getJsPackage() {
        return this.configStorage.originPackage;
    }
    setRequestHeader(key, value) {
        set(this.configStorage, ["xhrSettings", "headers", key], value);
    }
    getRequestHeader(key) {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.configStorage) === null || _a === void 0 ? void 0 : _a.xhrSettings) === null || _b === void 0 ? void 0 : _b.headers) === null || _c === void 0 ? void 0 : _c[key];
    }
}
//# sourceMappingURL=config.js.map