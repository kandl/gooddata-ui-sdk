import { invariant } from "ts-invariant";
import { NotAuthenticated, isNotAuthenticated, isContractExpired, } from "@gooddata/sdk-backend-spi";
import { newAxios, tigerClientFactory } from "@gooddata/api-client-tiger";
import isEmpty from "lodash/isEmpty.js";
import isError from "lodash/isError.js";
import isString from "lodash/isString.js";
import inRange from "lodash/inRange.js";
import identity from "lodash/identity.js";
import omit from "lodash/omit.js";
import { convertApiError } from "../utils/errorHandling.js";
import { TigerWorkspace } from "./workspace/index.js";
import { TigerWorkspaceQueryFactory } from "./workspaces/index.js";
import { TigerUserService } from "./user/index.js";
import { AuthProviderCallGuard, AnonymousAuthProvider, } from "@gooddata/sdk-backend-base";
import { defaultDateFormatter } from "../convertors/fromBackend/dateFormatting/defaultDateFormatter.js";
import { TigerOrganization, TigerOrganizations } from "./organization/index.js";
import { LIB_VERSION, LIB_NAME } from "../__version.js";
import { buildTigerSpecificFunctions } from "./tigerSpecificFunctions.js";
import { TigerEntitlements } from "./entitlements/index.js";
const CAPABILITIES = {
    hasTypeScopedIdentifiers: true,
    canCalculateGrandTotals: true,
    canCalculateSubTotals: true,
    canCalculateNativeTotals: false,
    canCalculateTotals: true,
    canExportCsv: true,
    canExportXlsx: true,
    canSortData: false,
    canTransformExistingResult: false,
    canWorkspaceManagerSeeEverySharedObject: true,
    maxDimensions: 2,
    supportsElementUris: false,
    supportsObjectUris: false,
    supportsCsvUploader: false,
    supportsRankingFilter: true,
    supportsRankingFilterWithMeasureValueFilter: false,
    supportsElementsQueryParentFiltering: false,
    supportsKpiWidget: false,
    supportsWidgetEntity: false,
    supportsHyperlinkAttributeLabels: true,
    supportsGenericDateAttributeElements: true,
    supportsExplain: true,
    supportsAccessControl: true,
    usesStrictAccessControl: true,
    supportsOwners: true,
    allowsInconsistentRelations: true,
    supportsTimeGranularities: true,
    supportsHierarchicalWorkspaces: true,
    supportsCustomColorPalettes: true,
    supportsOrganizationSettings: true,
    supportsInlineMeasures: true,
    supportsBootstrapResource: false,
    supportsMetadataObjectLocking: false,
    supportsGranularAccessControl: true,
    supportsEveryoneUserGroupForAccessControl: false,
    supportsNonProductionDatasets: false,
    supportsShowAllAttributeValues: true,
    supportsSeparateLatitudeLongitudeLabels: true,
    supportsEnumeratingDatetimeAttributes: false,
};
/**
 * An implementation of analytical backend for GoodData CloudNative (codename tiger).
 */
export class TigerBackend {
    constructor(config = {}, implConfig = {}, telemetry = {}, authProvider) {
        var _a, _b, _c;
        this.capabilities = CAPABILITIES;
        this.isAuthenticated = async () => {
            try {
                // the return await is crucial here so that we also catch the async errors
                return await this.authProvider.getCurrentPrincipal({ client: this.client, backend: this });
            }
            catch (err) {
                if (isNotAuthenticatedResponse(err) || isNotAuthenticated(err)) {
                    return null;
                }
                throw err;
            }
        };
        this.authenticate = async (force) => {
            if (!force) {
                return this.authApiCall(async (client) => {
                    const principal = await this.authProvider.getCurrentPrincipal({ client, backend: this });
                    invariant(principal, "Principal must be defined");
                    return principal;
                });
            }
            try {
                // the return await is crucial here so that we also catch the async errors
                return await this.triggerAuthentication(true);
            }
            catch (err) {
                invariant(isError(err)); // if this bombs, the code in the try block threw something strange
                throw this.handleAnalyticalBackendError(convertApiError(err));
            }
        };
        /**
         * Perform API call that requires authentication. The call will be decorated with error handling
         * such that not authenticated errors will trigger authentication flow AND other errors will be
         * converted using the provided converter and throw.
         *
         * @param call - a call which requires an authenticated session
         * @param errorConverter - converter from rest client errors to analytical backend errors
         */
        this.authApiCall = async (call, errorConverter = convertApiError) => {
            try {
                // the return await is crucial here so that we also catch the async errors
                return await call(this.client, await this.getAsyncCallContext());
            }
            catch (err) {
                invariant(isError(err)); // if this bombs, the code in the try block threw something strange
                // if we receive some other error than missing auth, we fail fast: no need to try the auth
                // one more time, since it was not the problem in the first place
                if (!isNotAuthenticatedResponse(err)) {
                    throw this.handleAnalyticalBackendError(errorConverter(err));
                }
                // else we try to trigger the authentication once more and then we repeat the original call
                // with the newly obtained async call context
                try {
                    await this.triggerAuthentication();
                    // the return await is crucial here so that we also catch the async errors
                    return await call(this.client, await this.getAsyncCallContext());
                }
                catch (err2) {
                    invariant(isError(err2)); // if this bombs, the code in the try block threw something strange
                    throw this.handleAnalyticalBackendError(errorConverter(err2));
                }
            }
        };
        /**
         * Triggers relevant handler if the provided error is an instance of
         * {@link @gooddata/sdk-backend-spi#NotAuthenticated} or {@link @gooddata/sdk-backend-spi#ContractExpired}.
         *
         * @param err - error to observe and trigger handler for
         * @returns the original error to facilitate re-throwing
         */
        this.handleAnalyticalBackendError = (err) => {
            var _a, _b, _c, _d;
            if (isNotAuthenticated(err)) {
                (_b = (_a = this.authProvider).onNotAuthenticated) === null || _b === void 0 ? void 0 : _b.call(_a, { client: this.client, backend: this }, err);
            }
            else if (isContractExpired(err)) {
                (_d = (_c = this.implConfig).onContractExpired) === null || _d === void 0 ? void 0 : _d.call(_c, err.message);
            }
            return err;
        };
        this.getAuthenticationContext = () => {
            return { client: this.client, backend: this };
        };
        this.getAsyncCallContext = async () => {
            const getPrincipal = async () => {
                if (!this.authProvider) {
                    throw new NotAuthenticated("Cannot obtain principal without an authProvider.");
                }
                const principal = await this.authProvider.getCurrentPrincipal({
                    client: this.client,
                    backend: this,
                });
                return principal !== null && principal !== void 0 ? principal : this.authProvider.authenticate(this.getAuthenticationContext());
            };
            return {
                getPrincipal,
            };
        };
        this.triggerAuthentication = (reset = false) => {
            if (!this.authProvider) {
                return Promise.reject(new NotAuthenticated("Backend is not set up with authentication provider."));
            }
            if (reset) {
                this.authProvider.reset();
            }
            return this.authProvider.authenticate({ client: this.client, backend: this });
        };
        this.config = config;
        this.implConfig = implConfig;
        this.telemetry = telemetry;
        this.authProvider = authProvider || new AnonymousAuthProvider();
        this.dateFormatter = (_a = implConfig.dateFormatter) !== null && _a !== void 0 ? _a : defaultDateFormatter;
        const axios = createAxios(this.config, this.implConfig, this.telemetry);
        interceptBackendErrorsToConsole(axios);
        this.client = tigerClientFactory(axios);
        (_c = (_b = this.authProvider).initializeClient) === null || _c === void 0 ? void 0 : _c.call(_b, this.client);
        if (this.implConfig.onTigerSpecificFunctionsReady) {
            const specificFunctions = buildTigerSpecificFunctions(this, this.authApiCall);
            this.implConfig.onTigerSpecificFunctionsReady(specificFunctions);
        }
    }
    onHostname(hostname) {
        return new TigerBackend(Object.assign(Object.assign({}, this.config), { hostname }), this.implConfig, this.telemetry);
    }
    withTelemetry(componentName, props) {
        return new TigerBackend(this.config, this.implConfig, { componentName, props: Object.keys(props) }, this.authProvider);
    }
    withAuthentication(provider) {
        const guardedAuthProvider = new AuthProviderCallGuard(provider);
        return new TigerBackend(this.config, this.implConfig, this.telemetry, guardedAuthProvider);
    }
    deauthenticate() {
        if (!this.authProvider) {
            throw new NotAuthenticated("Backend is not set up with authentication provider.");
        }
        return this.authProvider.deauthenticate(this.getAuthenticationContext());
    }
    organization(organizationId) {
        return new TigerOrganization(this.authApiCall, organizationId);
    }
    organizations() {
        return new TigerOrganizations(this.authApiCall);
    }
    entitlements() {
        return new TigerEntitlements(this.authApiCall);
    }
    currentUser() {
        return new TigerUserService(this.authApiCall);
    }
    workspace(id) {
        invariant(isString(id), `Invalid workspaceId, expected a string, got: ${id}`);
        return new TigerWorkspace(this.authApiCall, id, this.dateFormatter);
    }
    workspaces() {
        return new TigerWorkspaceQueryFactory(this.authApiCall, this.dateFormatter);
    }
}
function createAxios(config, implConfig, telemetry) {
    const baseUrl = config.hostname ? config.hostname : undefined;
    const headers = createHeaders(implConfig, telemetry);
    return newAxios(baseUrl, headers);
}
function interceptBackendErrorsToConsole(client) {
    client.interceptors.response.use(identity, (error) => {
        const response = error.response;
        // If there is no response object (for example for blocked requests), print the whole error.
        if (!response) {
            console.error("Tiger backend threw an error:", error);
        }
        // Else if the response is an object (JSON parsed by axios) and there is a problem, then log error
        // into console for easier diagnostics.
        else if (inRange(response.status, 400, 600) && typeof response.data === "object") {
            // Title is redundant (Bad Request)
            const details = omit(response.data, ["title"]);
            console.error("Tiger backend threw an error:", details);
        }
        return Promise.reject(error);
    });
    return client;
}
function createHeaders(implConfig, telemetry) {
    const headers = {
        "X-GDC-JS-PACKAGE": LIB_NAME,
        "X-GDC-JS-PACKAGE-VERSION": LIB_VERSION,
    };
    if (telemetry.componentName) {
        headers["X-GDC-JS-SDK-COMP"] = telemetry.componentName;
    }
    if (telemetry.props && !isEmpty(telemetry.props)) {
        headers["X-GDC-JS-SDK-COMP-PROPS"] = telemetry.props.join(",");
    }
    if (implConfig.packageName && implConfig.packageVersion) {
        headers["X-GDC-JS-PACKAGE"] = implConfig.packageName;
        headers["X-GDC-JS-PACKAGE-VERSION"] = implConfig.packageVersion;
    }
    return headers;
}
function isNotAuthenticatedResponse(err) {
    var _a;
    return ((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) === 401;
}
//# sourceMappingURL=index.js.map