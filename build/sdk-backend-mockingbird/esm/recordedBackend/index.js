// (C) 2019-2023 GoodData Corporation
import { NotSupported, } from "@gooddata/sdk-backend-spi";
import { idRef, } from "@gooddata/sdk-model";
import { RecordedExecutionFactory } from "./execution.js";
import { RecordedInsights } from "./insights.js";
import { RecordedCatalogFactory } from "./catalog.js";
import { RecordedAttributes } from "./attributes.js";
import { RecordedMeasures } from "./measures.js";
import { RecordedFacts } from "./facts.js";
import { RecordedDashboards } from "./dashboards.js";
import { InMemoryPaging } from "@gooddata/sdk-backend-base";
import { recordedAccessControlFactory, recordedUserGroupsQuery, RecordedWorkspaceUsersQuery, } from "./userManagement.js";
const defaultConfig = {
    hostname: "test",
};
const USER_ID = "recordedUser";
const locale = "en-US";
const separators = {
    thousand: ",",
    decimal: ".",
};
/**
 * @internal
 */
export const defaultRecordedBackendCapabilities = {
    canCalculateGrandTotals: true,
    canCalculateSubTotals: true,
    canCalculateTotals: true,
    canCalculateNativeTotals: true,
    supportsCsvUploader: true,
    supportsKpiWidget: true,
    supportsWidgetEntity: true,
    supportsOwners: true,
    allowsInconsistentRelations: false,
    supportsHierarchicalWorkspaces: false,
    supportsCustomColorPalettes: true,
    supportsElementsQueryParentFiltering: true,
    supportsElementUris: true,
    supportsEveryoneUserGroupForAccessControl: true,
};
/**
 * Creates new backend that will be providing recorded results to the caller. The recorded results are provided
 * to the backend in the form of RecordingIndex. This contains categorized recordings for the different service
 * calls.
 *
 * Note that:
 * - the 'tools/mock-handling' program can be used to create recordings AND the recording index.
 * - typically you want to use this recordedBackend with the recordings from the reference workspace; there
 *   is already tooling and infrastructure around populating that project
 *
 * @param index - recording index
 * @param config - backend config, for now just for compatibility sakes with the analytical backend config
 * @param capabilities - backend capabilities to use
 * @internal
 */
export function recordedBackend(index, config = defaultConfig, capabilities = defaultRecordedBackendCapabilities) {
    const backend = {
        capabilities,
        config,
        onHostname(hostname) {
            return recordedBackend(index, Object.assign(Object.assign({}, config), { hostname }));
        },
        withTelemetry(_component, _props) {
            return backend;
        },
        withAuthentication(_) {
            return this;
        },
        organization(organizationId) {
            return recordedOrganization(organizationId, config);
        },
        organizations() {
            return recordedOrganizations(config);
        },
        currentUser() {
            return recordedUserService(config);
        },
        workspace(id) {
            return recordedWorkspace(id, index, config);
        },
        workspaces() {
            throw new NotSupported("not supported");
        },
        authenticate() {
            return Promise.resolve({ userId: USER_ID });
        },
        deauthenticate() {
            return Promise.resolve();
        },
        isAuthenticated() {
            return Promise.resolve({ userId: USER_ID });
        },
        entitlements() {
            return recordedEntitlements();
        },
    };
    return backend;
}
function recordedWorkspace(workspace, recordings = {}, implConfig) {
    var _a;
    const insightsService = new RecordedInsights(recordings, (_a = implConfig.useRefType) !== null && _a !== void 0 ? _a : "uri");
    return {
        workspace,
        async getDescriptor() {
            return recordedDescriptor(this.workspace, implConfig);
        },
        getParentWorkspace() {
            throw new NotSupported("not supported");
        },
        execution() {
            var _a;
            return new RecordedExecutionFactory(recordings, workspace, (_a = implConfig.useRefType) !== null && _a !== void 0 ? _a : "uri");
        },
        attributes() {
            return new RecordedAttributes(recordings, implConfig);
        },
        measures() {
            return new RecordedMeasures();
        },
        facts() {
            return new RecordedFacts();
        },
        insights() {
            return insightsService;
        },
        dashboards() {
            return new RecordedDashboards(this.workspace, insightsService, recordings);
        },
        settings() {
            return {
                async getSettings() {
                    var _a;
                    return Object.assign({ workspace }, ((_a = implConfig.globalSettings) !== null && _a !== void 0 ? _a : {}));
                },
                async getSettingsForCurrentUser() {
                    var _a;
                    return Object.assign({ userId: USER_ID, workspace,
                        locale,
                        separators }, ((_a = implConfig.globalSettings) !== null && _a !== void 0 ? _a : {}));
                },
                async setLocale() {
                    return Promise.resolve();
                },
            };
        },
        styling() {
            return {
                async getColorPalette() {
                    var _a;
                    return (_a = implConfig.globalPalette) !== null && _a !== void 0 ? _a : [];
                },
                async getTheme() {
                    var _a;
                    return (_a = implConfig.theme) !== null && _a !== void 0 ? _a : {};
                },
            };
        },
        dateFilterConfigs() {
            return recordedDateFilterConfig(implConfig);
        },
        catalog() {
            return new RecordedCatalogFactory(workspace, recordings, implConfig);
        },
        datasets() {
            throw new NotSupported("not supported");
        },
        permissions() {
            return recordedPermissionsFactory();
        },
        users() {
            return new RecordedWorkspaceUsersQuery(implConfig);
        },
        userGroups() {
            return recordedUserGroupsQuery(implConfig);
        },
        accessControl() {
            return recordedAccessControlFactory(implConfig);
        },
    };
}
function recordedEntitlements() {
    return {
        resolveEntitlements: () => {
            return Promise.resolve([]);
        },
    };
}
function recordedOrganization(organizationId, implConfig) {
    const scopeFactory = implConfig.securitySettingsOrganizationScope === undefined
        ? (organizationId) => `/gdc/domains/${organizationId}`
        : implConfig.securitySettingsOrganizationScope;
    return {
        organizationId,
        getDescriptor() {
            return Promise.resolve({
                id: organizationId,
                title: "mock organization",
            });
        },
        securitySettings() {
            return {
                scope: scopeFactory(organizationId),
                isUrlValid(url, context) {
                    if (implConfig.securitySettingsUrlValidator !== undefined) {
                        return Promise.resolve(implConfig.securitySettingsUrlValidator(url, context));
                    }
                    return Promise.resolve(true);
                },
                isDashboardPluginUrlValid(url, workspace) {
                    if (implConfig.securitySettingsPluginUrlValidator !== undefined) {
                        return Promise.resolve(implConfig.securitySettingsPluginUrlValidator(url, workspace));
                    }
                    return Promise.resolve(true);
                },
            };
        },
        styling() {
            const resolveTheme = (theme) => {
                return Promise.resolve({
                    type: "theme",
                    id: "theme_id",
                    title: "Theme 1",
                    description: "",
                    production: true,
                    deprecated: false,
                    unlisted: false,
                    ref: idRef("theme_id"),
                    uri: "theme_uri",
                    theme: theme.theme,
                });
            };
            const resolveColorPalette = (colorPalette) => Promise.resolve({
                type: "colorPalette",
                id: "color_palette_id",
                title: "Color Palette 1",
                description: "",
                production: true,
                deprecated: false,
                unlisted: false,
                ref: idRef("color_palette_id"),
                uri: "color_palette_uri",
                colorPalette: colorPalette.colorPalette,
            });
            return {
                getThemes: () => Promise.resolve([]),
                getActiveTheme: () => Promise.resolve(undefined),
                setActiveTheme: () => Promise.resolve(),
                clearActiveTheme: () => Promise.resolve(),
                createTheme: resolveTheme,
                updateTheme: resolveTheme,
                deleteTheme: () => Promise.resolve(),
                getColorPalettes: () => Promise.resolve([]),
                getActiveColorPalette: () => Promise.resolve(undefined),
                setActiveColorPalette: () => Promise.resolve(),
                clearActiveColorPalette: () => Promise.resolve(),
                createColorPalette: resolveColorPalette,
                updateColorPalette: resolveColorPalette,
                deleteColorPalette: () => Promise.resolve(),
            };
        },
        settings() {
            return {
                setWhiteLabeling: () => Promise.resolve(),
                setLocale: () => Promise.resolve(),
                setTimezone: () => Promise.resolve(),
                setDateFormat: () => Promise.resolve(),
                setWeekStart: () => Promise.resolve(),
                getSettings: () => Promise.resolve({}),
                setTheme: () => Promise.resolve(),
                setColorPalette: () => Promise.resolve(),
                deleteTheme: () => Promise.resolve(),
                deleteColorPalette: () => Promise.resolve(),
            };
        },
    };
}
function recordedOrganizations(implConfig) {
    return {
        getCurrentOrganization() {
            return Promise.resolve(recordedOrganization("mock-organization", implConfig));
        },
    };
}
// returns the same settings as the global ones
function recordedUserService(implConfig) {
    return {
        async getUser() {
            var _a, _b;
            return ((_b = (_a = implConfig.userManagement) === null || _a === void 0 ? void 0 : _a.user) !== null && _b !== void 0 ? _b : {
                login: USER_ID,
                ref: idRef(USER_ID),
                email: "",
                fullName: "",
                firstName: "",
                lastName: "",
            });
        },
        settings() {
            return {
                getSettings: async () => {
                    var _a;
                    return (Object.assign({ userId: USER_ID, locale,
                        separators }, ((_a = implConfig.globalSettings) !== null && _a !== void 0 ? _a : {})));
                },
                setLocale: () => Promise.resolve(),
            };
        },
    };
}
// return true for all
function recordedPermissionsFactory() {
    return {
        getPermissionsForCurrentUser: async () => ({
            canAccessWorkbench: true,
            canCreateAnalyticalDashboard: true,
            canCreateReport: true,
            canCreateVisualization: true,
            canExecuteRaw: true,
            canExportReport: true,
            canExportTabular: true,
            canExportPdf: true,
            canInitData: true,
            canManageAnalyticalDashboard: true,
            canManageMetric: true,
            canManageProject: true,
            canManageReport: true,
            canUploadNonProductionCSV: true,
            canCreateScheduledMail: true,
            canListUsersInProject: true,
            canManageDomain: true,
            canInviteUserToProject: true,
            canRefreshData: true,
            canManageACL: true,
            canManageScheduledMail: true,
        }),
    };
}
function recordedDescriptor(workspaceId, implConfig) {
    const { title, description, isDemo } = implConfig.workspaceDescriptor || {};
    return {
        id: workspaceId,
        title: title !== null && title !== void 0 ? title : "",
        description: description !== null && description !== void 0 ? description : "",
        isDemo: isDemo !== null && isDemo !== void 0 ? isDemo : false,
    };
}
function recordedDateFilterConfig(implConfig) {
    return {
        withLimit(_limit) {
            return this;
        },
        withOffset(_offset) {
            return this;
        },
        query() {
            const { dateFilterConfig } = implConfig;
            return Promise.resolve(new InMemoryPaging(dateFilterConfig ? [dateFilterConfig] : []));
        },
    };
}
//# sourceMappingURL=index.js.map