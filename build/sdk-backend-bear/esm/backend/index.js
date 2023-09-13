// (C) 2019-2023 GoodData Corporation
import { getFactory as createSdk } from "@gooddata/api-client-bear";
import { NotAuthenticated, isNotAuthenticated, } from "@gooddata/sdk-backend-spi";
import { invariant } from "ts-invariant";
import isEmpty from "lodash/isEmpty.js";
import isError from "lodash/isError.js";
import { convertApiError, isApiResponseError } from "../utils/errorHandling.js";
import { BearWorkspace } from "./workspace/index.js";
import { BearWorkspaceQueryFactory } from "./workspaces/index.js";
import { BearUserService } from "./user/index.js";
import { convertInsight } from "../convertors/toBackend/InsightConverter.js";
import { sanitizeDrillingActivationPostMessageData } from "./drillingPostMessageData/index.js";
import { NoopAuthProvider, AuthProviderCallGuard, } from "@gooddata/sdk-backend-base";
import { BearOrganization, BearOrganizations } from "./organization/index.js";
import { LIB_VERSION, LIB_NAME } from "../__version.js";
import { BearEntitlements } from "./entitlements/index.js";
const CAPABILITIES = {
    canCalculateGrandTotals: true,
    canCalculateSubTotals: true,
    canCalculateTotals: true,
    canCalculateNativeTotals: true,
    canExportCsv: true,
    canExportXlsx: true,
    canSortData: true,
    canTransformExistingResult: false,
    canWorkspaceManagerSeeEverySharedObject: false,
    maxDimensions: 2,
    supportsElementUris: true,
    supportsObjectUris: true,
    supportsCsvUploader: true,
    supportsLegacyReports: true,
    supportsRankingFilter: true,
    supportsRankingFilterWithMeasureValueFilter: true,
    supportsElementsQueryParentFiltering: true,
    supportsKpiWidget: true,
    supportsWidgetEntity: true,
    supportsHyperlinkAttributeLabels: true,
    supportsGenericDateAttributeElements: true,
    supportsExplain: false,
    supportsAccessControl: true,
    usesStrictAccessControl: false,
    supportsOwners: true,
    allowsInconsistentRelations: false,
    supportsTimeGranularities: false,
    supportsHierarchicalWorkspaces: false,
    supportsCustomColorPalettes: true,
    supportsOrganizationSettings: false,
    supportsInlineMeasures: false,
    supportsBootstrapResource: true,
    supportsMetadataObjectLocking: true,
    supportsGranularAccessControl: false,
    supportsEveryoneUserGroupForAccessControl: true,
    supportsNonProductionDatasets: true,
    supportsShowAllAttributeValues: false,
    supportsSeparateLatitudeLongitudeLabels: false,
    supportsEnumeratingDatetimeAttributes: true,
};
/**
 * This implementation of analytical backend uses the gooddata-js API client to realize the SPI.
 *
 * The only thing worth noting about this impl is the handling of SDK instance creation and authentication:
 *
 * - New instance of SDK is created for each instance of BearBackend; new instance of BearBackend is created
 *   every time onHostname, withCredentials or withTelemetry methods are called (similar to how we did it
 *   so far with the clone())
 *
 * - Authentication (login) WILL be done every time credentials are provided using the
 *   withCredentials. No other methods in the bear backend lead to login.
 *
 * - Authentication is done at construction time; the constructor MAY receive an instance of deferred authentication -
 *   this is to cater for cases when withCredentials is called, new instance of backend is returned and then
 *   someone calls withTelemetry on this instance ⇒ in that case there is no need to re-initiate login.
 *
 */
export class BearBackend {
    constructor(config, implConfig, telemetry, authProvider) {
        var _a, _b;
        this.capabilities = CAPABILITIES;
        this.isAuthenticated = async () => {
            try {
                // the return await is crucial here so that we also catch the async errors
                return await this.authProvider.getCurrentPrincipal({ client: this.sdk, backend: this });
            }
            catch (err) {
                if (isNotAuthenticatedResponse(err)) {
                    return null;
                }
                throw err;
            }
        };
        this.authenticate = (force) => {
            if (!force) {
                return this.authApiCall(async (sdk) => {
                    const principal = await this.authProvider.getCurrentPrincipal({ client: sdk, backend: this });
                    invariant(principal, "Principal must be defined");
                    return principal;
                });
            }
            return this.triggerAuthentication(true);
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
                return await call(this.sdk, await this.getAsyncCallContext());
            }
            catch (err) {
                invariant(isError(err)); // if this bombs, the code in the try block threw something strange
                // if we receive some other error than missing auth, we fail fast: no need to try the auth
                // one more time, since it was not the problem in the first place
                if (!isNotAuthenticatedResponse(err)) {
                    throw this.handleNotAuthenticated(errorConverter(err));
                }
                // else we try to trigger the authentication once more and then we repeat the original call
                // with the newly obtained async call context
                try {
                    await this.triggerAuthentication();
                    // the return await is crucial here so that we also catch the async errors
                    return await call(this.sdk, await this.getAsyncCallContext());
                }
                catch (err2) {
                    invariant(isError(err2)); // if this bombs, the code in the try block threw something strange
                    throw this.handleNotAuthenticated(errorConverter(err2));
                }
            }
        };
        this.getAuthenticationContext = () => ({ client: this.sdk, backend: this });
        this.triggerAuthentication = async (reset = false) => {
            if (!this.authProvider) {
                throw new NotAuthenticated("Backend is not set up with authentication provider.");
            }
            if (reset) {
                this.authProvider.reset();
            }
            try {
                // the return await is crucial here so that we also catch the async errors
                return await this.authProvider.authenticate(this.getAuthenticationContext());
            }
            catch (e) {
                invariant(isError(e)); // if this bombs, the code in the try block threw something strange
                throw this.handleNotAuthenticated(convertApiError(e));
            }
        };
        /**
         * Triggers onNotAuthenticated handler of the the authProvider if the provided error is an instance
         * of {@link @gooddata/sdk-backend-spi#NotAuthenticated}.
         *
         * @param err - error to observe and trigger handler for
         * @returns the original error to facilitate re-throwing
         */
        this.handleNotAuthenticated = (err) => {
            var _a, _b;
            if (isNotAuthenticated(err)) {
                (_b = (_a = this.authProvider).onNotAuthenticated) === null || _b === void 0 ? void 0 : _b.call(_a, { client: this.sdk, backend: this }, err);
            }
            return err;
        };
        this.getAsyncCallContext = async () => {
            const getPrincipal = async () => {
                if (!this.authProvider) {
                    throw new NotAuthenticated("Cannot obtain principal without an authProvider.");
                }
                const principal = await this.authProvider.getCurrentPrincipal({
                    client: this.sdk,
                    backend: this,
                });
                return principal !== null && principal !== void 0 ? principal : this.authProvider.authenticate(this.getAuthenticationContext());
            };
            return {
                getPrincipal,
            };
        };
        this.config = configSanitize(config);
        this.implConfig = bearConfigSanitize(implConfig);
        this.telemetry = telemetrySanitize(telemetry);
        this.authProvider = authProvider || new NoopAuthProvider();
        this.sdk = newSdkInstance(this.config, this.implConfig, this.telemetry);
        // do the ajax setup without the need to call the ajaxSetup legacy function
        // this is useful when deriving new instance using withTelemetry and similar functions
        if (this.implConfig.ajaxSettings) {
            this.sdk.xhr.ajaxSetup(this.implConfig.ajaxSettings);
        }
        (_b = (_a = this.authProvider).initializeClient) === null || _b === void 0 ? void 0 : _b.call(_a, this.sdk);
        if (this.implConfig.onLegacyCallbacksReady) {
            const legacyFunctions = {
                openAsReport: (workspace, insight) => {
                    const visualizationObject = convertInsight(insight);
                    return this.authApiCall((sdk) => sdk.md.openVisualizationAsReport(workspace, { visualizationObject }));
                },
                getBootstrapResource: (options) => {
                    return this.authApiCall((sdk) => sdk.user.getBootstrapResource(options));
                },
                ajaxSetup: (settings) => {
                    // store the last used settings so that we can use them if copying this backend in withTelemetry for example
                    this.lastAjaxSetupSettings = settings;
                    this.sdk.xhr.ajaxSetup(settings);
                },
                log: (uri, logMessages) => this.sdk.xhr.post(uri, { data: JSON.stringify({ logMessages }) }),
                updateProfileCurrentWorkspace: async (workspace, profileSetting) => {
                    var _a, _b;
                    const userId = (_b = (_a = profileSetting.links) === null || _a === void 0 ? void 0 : _a.profile) === null || _b === void 0 ? void 0 : _b.split("/").pop();
                    invariant(userId, "Cannot obtain userId from IProfileSetting");
                    const newProfileSetting = Object.assign(Object.assign({}, profileSetting), { currentProjectUri: `/gdc/projects/${workspace}` });
                    await this.authApiCall((sdk) => sdk.user.updateProfileSettings(userId, { profileSetting: newProfileSetting }));
                },
                sanitizeDrillingActivationPostMessageData: (workspace, postMessageData) => sanitizeDrillingActivationPostMessageData(workspace, postMessageData, (workspace, identifiers) => this.authApiCall((sdk) => sdk.md.getUrisFromIdentifiers(workspace, identifiers))),
                getProjectDashboards: (workspace) => {
                    return this.authApiCall((sdk) => sdk.md.getProjectDashboards(workspace));
                },
                getUrisFromIdentifiers: (workspace, identifiers) => {
                    return this.authApiCall((sdk) => sdk.md.getUrisFromIdentifiers(workspace, identifiers));
                },
                getObjectsByUri: (workspace, uris) => {
                    return this.authApiCall((sdk) => sdk.md.getObjects(workspace, uris));
                },
                getVisualizationObject: (workspace, uri) => {
                    return this.authApiCall(async (sdk) => {
                        const [visObject] = await sdk.md.getObjects(workspace, [uri]);
                        return visObject;
                    });
                },
                getUISettings: () => {
                    return this.sdk.xhr
                        .get("/gdc/account/organization/settings")
                        .then((response) => response.getData());
                },
                isDomainAdmin: (domainUri) => {
                    return this.authApiCall((sdk) => {
                        return sdk.xhr
                            .get(`${domainUri}/config`)
                            .then((_) => true)
                            .catch((error) => {
                            if (isApiResponseError(error)) {
                                // when user _is not_ domain admin, then attempting to retrieve domain config
                                // will fail fast with 403
                                return error.response.status !== 403;
                            }
                            return true;
                        });
                    });
                },
            };
            this.implConfig.onLegacyCallbacksReady(legacyFunctions);
        }
    }
    onHostname(hostname) {
        return new BearBackend(Object.assign(Object.assign({}, this.config), { hostname }), this.implConfig, this.telemetry);
    }
    withTelemetry(componentName, props) {
        return new BearBackend(this.config, Object.assign(Object.assign({}, this.implConfig), { ajaxSettings: this.lastAjaxSetupSettings }), { componentName, props: Object.keys(props) }, this.authProvider);
    }
    withAuthentication(provider) {
        const guardedAuthProvider = new AuthProviderCallGuard(provider);
        return new BearBackend(this.config, this.implConfig, this.telemetry, guardedAuthProvider);
    }
    deauthenticate() {
        if (!this.authProvider) {
            throw new NotAuthenticated("Backend is not set up with authentication provider.");
        }
        return this.authProvider.deauthenticate(this.getAuthenticationContext());
    }
    organization(organizationId) {
        return new BearOrganization(this.authApiCall, organizationId);
    }
    organizations() {
        return new BearOrganizations(this.authApiCall);
    }
    entitlements() {
        return new BearEntitlements();
    }
    currentUser() {
        return new BearUserService(this.authApiCall);
    }
    workspace(id) {
        return new BearWorkspace(this.authApiCall, id);
    }
    workspaces() {
        return new BearWorkspaceQueryFactory(this.authApiCall);
    }
}
//
// internals
//
function isNotAuthenticatedResponse(err) {
    return isApiResponseError(err) && err.response.status === 401;
}
function configSanitize(config) {
    return config !== null && config !== void 0 ? config : {};
}
function bearConfigSanitize(implConfig) {
    return implConfig !== null && implConfig !== void 0 ? implConfig : {};
}
function telemetrySanitize(telemetry) {
    return telemetry !== null && telemetry !== void 0 ? telemetry : {};
}
function newSdkInstance(config, implConfig, telemetry) {
    const sdk = implConfig.factory ? implConfig.factory() : createSdk();
    if (config.hostname) {
        sdk.config.setCustomDomain(config.hostname);
    }
    if (implConfig.packageName && implConfig.packageVersion) {
        sdk.config.setJsPackage(implConfig.packageName, implConfig.packageVersion);
    }
    else {
        sdk.config.setJsPackage(LIB_NAME, LIB_VERSION);
    }
    if (telemetry.componentName) {
        sdk.config.setRequestHeader("X-GDC-JS-SDK-COMP", telemetry.componentName);
        if (telemetry.props && !isEmpty(telemetry.props)) {
            sdk.config.setRequestHeader("X-GDC-JS-SDK-COMP-PROPS", telemetry.props.join(","));
        }
    }
    return sdk;
}
//# sourceMappingURL=index.js.map