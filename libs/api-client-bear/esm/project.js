// (C) 2007-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { getAllPagesByOffsetLimit, getQueryEntries, handlePolling, parseSettingItemValue } from "./util.js";
import { ApiError } from "./xhr.js";
import { stringify } from "./utils/queryString.js";
export const DEFAULT_PALETTE = [
    { r: 0x2b, g: 0x6b, b: 0xae },
    { r: 0x69, g: 0xaa, b: 0x51 },
    { r: 0xee, g: 0xb1, b: 0x4c },
    { r: 0xd5, g: 0x3c, b: 0x38 },
    { r: 0x89, g: 0x4d, b: 0x94 },
    { r: 0x73, g: 0x73, b: 0x73 },
    { r: 0x44, g: 0xa9, b: 0xbe },
    { r: 0x96, g: 0xbd, b: 0x5f },
    { r: 0xfd, g: 0x93, b: 0x69 },
    { r: 0xe1, g: 0x5d, b: 0x86 },
    { r: 0x7c, g: 0x6f, b: 0xad },
    { r: 0xa5, g: 0xa5, b: 0xa5 },
    { r: 0x7a, g: 0xa6, b: 0xd5 },
    { r: 0x82, g: 0xd0, b: 0x8d },
    { r: 0xff, g: 0xd2, b: 0x89 },
    { r: 0xf1, g: 0x84, b: 0x80 },
    { r: 0xbf, g: 0x90, b: 0xc6 },
    { r: 0xbf, g: 0xbf, b: 0xbf },
];
const isProjectCreated = (project) => {
    // TODO
    const projectState = project.content.state;
    return projectState === "ENABLED" || projectState === "DELETED";
};
/**
 * Functions for working with projects
 *
 */
export class ProjectModule {
    constructor(xhr) {
        this.xhr = xhr;
    }
    /**
     * Get current project id
     *
     * @returns current project identifier
     */
    getCurrentProjectId() {
        return this.xhr
            .getParsed("/gdc/app/account/bootstrap/projectId")
            .then((response) => response.projectId);
    }
    /**
     * Fetches project by its identifier.
     *
     * @param projectId - Project identifier
     * @returns Project
     */
    getProject(projectId) {
        return this.xhr.getParsed(`/gdc/projects/${projectId}`);
    }
    /**
     * Fetches projects available for the user represented by the given profileId
     *
     * @param profileId - User profile identifier
     * @returns An Array of projects
     */
    getProjects(profileId) {
        return getAllPagesByOffsetLimit(this.xhr, `/gdc/account/profile/${profileId}/projects`, "projects").then((result) => result.map((p) => p.project));
    }
    /**
     * Fetches projects available for the user represented by the given profileId page by page.
     * @param userId - id of the user to get the projects for
     * @param offset - number of items to skip
     * @param limit - maximum items on page
     * @param search - search string that is matched to project title as a substring
     */
    getProjectsWithPaging(userId, offset, limit, search) {
        // inspired by ProjectDataSource in goodstrap. Maybe the /gdc/account/profile/${profileId}/projects would be suitable as well.
        const mergedOptions = {
            limit,
            offset,
            userId,
            projectStates: "ENABLED",
            userState: "ENABLED",
        };
        if (search) {
            mergedOptions.titleSubstring = search;
        }
        const uri = `/gdc/internal/projects/?${stringify(mergedOptions)}`;
        return this.xhr.get(uri).then((res) => res.getData());
    }
    /**
     * Fetches all datasets for the given project
     *
     * @param projectId - GD project identifier
     * @returns An array of objects containing datasets metadata
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getDatasets(projectId) {
        return this.xhr
            .get(`/gdc/md/${projectId}/query/datasets`)
            .then((r) => r.getData())
            .then(getQueryEntries);
    }
    /**
     * Fetches a chart color palette for a project represented by the given
     * projectId parameter.
     *
     * @param projectId - A project identifier
     * @returns An array of objects with r, g, b fields representing a project's
     * color palette
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getColorPalette(projectId) {
        return this.xhr
            .get(`/gdc/projects/${projectId}/styleSettings`)
            .then((apiResponse) => {
            return apiResponse.getData();
        })
            .then((result) => {
            if (!result) {
                return DEFAULT_PALETTE;
            }
            return result.styleSettings.chartPalette.map((c) => {
                return {
                    r: c.fill.r,
                    g: c.fill.g,
                    b: c.fill.b,
                };
            });
        })
            .catch((e) => {
            if (!(e instanceof ApiError)) {
                return DEFAULT_PALETTE;
            }
            throw e;
        });
    }
    /**
     * Fetches a chart color palette for a project represented by the given
     * projectId parameter.
     *
     * @param projectId - A project identifier
     * @returns An array of objects representing a project's
     * color palette with color guid or undefined
     */
    getColorPaletteWithGuids(projectId) {
        return this.xhr
            .get(`/gdc/projects/${projectId}/styleSettings`)
            .then((apiResponse) => {
            return apiResponse.getData();
        })
            .then((result) => {
            if (result === null || result === void 0 ? void 0 : result.styleSettings) {
                return result.styleSettings.chartPalette;
            }
            else {
                return undefined;
            }
        })
            .catch((e) => {
            if (!(e instanceof ApiError)) {
                return undefined;
            }
            throw e;
        });
    }
    /**
     * Sets given colors as a color palette for a given project.
     *
     * @param projectId - GD project identifier
     * @param colors - An array of colors that we want to use within the project.
     * Each color should be an object with r, g, b fields. // TODO really object?
     */
    setColorPalette(projectId, colors) {
        return this.xhr.put(`/gdc/projects/${projectId}/styleSettings`, {
            body: {
                styleSettings: {
                    chartPalette: colors.map((fill, idx) => {
                        return { fill, guid: `guid${idx}` };
                    }),
                },
            },
        });
    }
    /**
     * Gets current timezone and its offset.
     * @example
     *
     * Example output:
     *
     * ```
     * {
     *     id: 'Europe/Prague',
     *     displayName: 'Central European Time',
     *     currentOffsetMs: 3600000
     * }
     * ```
     *
     * @param projectId - GD project identifier
     */
    getTimezone(projectId) {
        const uri = `/gdc/app/projects/${projectId}/timezone`;
        return this.xhr.getParsed(uri).then((result) => result.timezone);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setTimezone(projectId, timezone) {
        const timezoneServiceUrl = `/gdc/md/${projectId}/service/timezone`;
        const data = {
            service: { timezone },
        };
        return this.xhr
            .post(timezoneServiceUrl, {
            body: data,
        })
            .then((r) => r.getData());
    }
    /**
     * Create project
     * Note: returns a promise which is resolved when the project creation is finished
     *
     * @experimental
     * @param title - title of the new project
     * @param authorizationToken - authorization token to use
     * @param options - for project creation (summary, projectTemplate, ...)
     * @returns created project object
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    createProject(title, authorizationToken, options = {}) {
        const { summary, projectTemplate, driver = "Pg", environment = "TESTING", guidedNavigation = 1, } = options;
        return this.xhr
            .post("/gdc/projects", {
            body: JSON.stringify({
                project: {
                    content: {
                        guidedNavigation,
                        driver,
                        authorizationToken,
                        environment,
                    },
                    meta: {
                        title,
                        summary,
                        projectTemplate,
                    },
                },
            }),
        })
            .then((r) => r.getData())
            .then((project) => handlePolling(this.xhr.get.bind(this.xhr), project.uri, (response) => {
            // TODO project response
            return isProjectCreated(response.project);
        }, options));
    }
    /**
     * Delete project
     *
     * @param projectId - projectId to delete
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    deleteProject(projectId) {
        return this.xhr.del(`/gdc/projects/${projectId}`);
    }
    /**
     * Gets aggregated feature flags for given project and current user
     *
     * @param projectId - A project identifier
     * @returns Hash table of feature flags and theirs values where feature flag is as key
     */
    getFeatureFlags(projectId) {
        return this.xhr
            .get(`/gdc/app/projects/${projectId}/featureFlags`)
            .then((apiResponse) => {
            return apiResponse.getData();
        })
            .then((result) => {
            if (result === null || result === void 0 ? void 0 : result.featureFlags) {
                return result.featureFlags;
            }
            return {};
        });
    }
    /**
     * Gets project config including project specific feature flags
     *
     * @param projectId - A project identifier
     * @returns An array of project config setting items
     */
    getConfig(projectId) {
        return this.xhr
            .get(`/gdc/app/projects/${projectId}/config`)
            .then((apiResponse) => {
            return apiResponse.getData();
        })
            .then((result) => {
            var _a;
            if ((_a = result === null || result === void 0 ? void 0 : result.settings) === null || _a === void 0 ? void 0 : _a.items) {
                return result.settings.items;
            }
            return [];
        });
    }
    /**
     * Gets project config including project specific feature flags
     *
     * @param projectId - A project identifier
     * @param key - config item key
     * @returns single setting item or undefined if item with such key does not exist
     */
    getConfigItem(projectId, key) {
        return this.xhr
            .get(`/gdc/app/projects/${projectId}/config/${key}`)
            .then((apiResponse) => {
            return apiResponse.getData();
        })
            .catch((error) => {
            var _a;
            if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                return undefined;
            }
            throw error;
        });
    }
    /**
     * Gets project specific feature flags
     *
     * @param projectId - A project identifier
     * @param source - optional filter settingItems with specific source
     * @returns Hash table of feature flags and theirs values where feature flag is as key
     */
    getProjectFeatureFlags(projectId, source) {
        return this.getConfig(projectId).then((settingItems) => {
            const filteredSettingItems = source
                ? settingItems.filter((settingItem) => settingItem.settingItem.source === source)
                : settingItems;
            const featureFlags = {};
            filteredSettingItems.forEach((settingItem) => {
                featureFlags[settingItem.settingItem.key] = parseSettingItemValue(settingItem.settingItem.value);
            });
            return featureFlags;
        });
    }
    /**
     * Get paged user list
     *
     * @param projectId - project identifier
     * @param options - filtering options for the user list
     * @returns List of users with paging
     */
    getUserListWithPaging(projectId, options) {
        return this.xhr.getParsed(`/gdc/projects/${projectId}/userlist`, {
            data: options,
        });
    }
    /**
     * Get full user list
     *
     * @param projectId - project identifier
     * @param options - filtering options for the user list
     * @returns List of users
     */
    getUserList(projectId, options) {
        const loadPage = async (offset = 0, limit = 1000, items = []) => {
            return this.getUserListWithPaging(projectId, Object.assign(Object.assign({}, options), { limit, offset })).then(({ userList: { items: userItems, paging: { count }, }, }) => {
                const updatedItems = [...items, ...userItems];
                return count < limit ? updatedItems : loadPage(offset + limit, limit, updatedItems);
            });
        };
        return loadPage();
    }
    /**
     * Get paged user groups
     *
     * @param projectId - project identifier
     * @param options - paging params
     * @returns List of user groups with paging
     */
    getUserGroups(projectId, options) {
        const { offset = "0", limit = 100 } = options;
        return this.xhr.getParsed(`/gdc/userGroups?project=${projectId}&offset=${offset}&limit=${limit}`);
    }
    /**
     * Get info about all grantees able to access given object
     *
     * @param objectUri - object's uri
     * @param options - grantee limitations params
     * @returns List of all grantees
     */
    getGranteesInfo(objectUri, options) {
        const { permission = "read" } = options;
        const apiUri = objectUri.replace("/md/", "/projects/");
        return this.xhr.getParsed(`${apiUri}/grantees?permission=${permission}`);
    }
    convertGrantees(granteeUris = []) {
        return granteeUris.map((granteeUri) => ({
            aclEntryURI: {
                permission: "read",
                grantee: granteeUri,
            },
        }));
    }
    handleGranteesChangeError(error) {
        var _a;
        if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) !== 200) {
            throw error;
        }
    }
    /**
     * Add grantees to access given object
     * @param objectUri - object's uri
     * @param granteeUris - grantees uri array
     */
    addGrantees(objectUri, granteeUris) {
        const addGranteesRequest = {
            granteeURIs: {
                items: this.convertGrantees(granteeUris),
            },
        };
        return this.xhr
            .post(`${objectUri}/grantees/add`, { body: Object.assign({}, addGranteesRequest) })
            .catch(this.handleGranteesChangeError);
    }
    /**
     * Remove grantees access given object
     * @param objectUri - object's uri
     * @param granteeUris - grantees uri array
     */
    removeGrantees(objectUri, granteeUris = []) {
        const removeGranteesRequest = {
            granteeURIs: {
                items: this.convertGrantees(granteeUris),
            },
        };
        return this.xhr
            .post(`${objectUri}/grantees/remove`, { body: Object.assign({}, removeGranteesRequest) })
            .catch(this.handleGranteesChangeError);
    }
    /**
     * Get permissions for the workspace and user
     * @param workspaceId - ID of the workspace
     * @param userId - ID of the user
     */
    getPermissions(workspaceId, userId) {
        return this.xhr.getParsed(`/gdc/projects/${workspaceId}/users/${userId}/permissions`);
    }
    /**
     * Resolves LCM workspace identifiers. This function will use the data product and client information
     * and consult the backend in order to obtain identifier of workspace contains analytics for that
     * data product & client combination.
     *
     * Domain parameter is required. Then either project ID or product ID and client ID pair must be provided.
     *
     * @param domainId - ID of the domain, must be provided
     * @param projectId - ID of the project. LCM identifiers will be fetched via project ID if the
     *  ID is provided.
     * @param productId - ID of the product. LCM identifiers will be provided by product ID and client ID
     *  pair, if project ID is not provided.
     * @param clientId - ID of the client. LCM identifiers will be provided by product ID and client ID pair,
     *  if project ID is not provided.
     *
     * @returns Resolves with project LCM identifiers.
     */
    getProjectLcmIdentifiers(domainId, projectId, productId, clientId) {
        invariant(domainId, "domain ID must be specified");
        if (projectId) {
            return this.xhr
                .getParsed(`/gdc/projects/${projectId}/lcmEntity`)
                .then(({ projectUri, clientId, dataProductId, segmentId }) => ({
                projectLcm: {
                    projectId: this.extractIdFromUri(projectUri),
                    clientId,
                    dataProductId,
                    segmentId,
                },
            }));
        }
        invariant(productId, "product ID must be specified when project ID is not provided");
        invariant(clientId, "client ID must be specified when project ID is not provided");
        return this.xhr
            .getParsed(`/gdc/domains/${domainId}/dataproducts/${productId}/clients/${clientId}`)
            .then(({ client: { id, project, segment, links } }) => ({
            projectLcm: {
                projectId: this.extractIdFromUri(project),
                clientId: id,
                dataProductId: this.extractIdFromUri(links === null || links === void 0 ? void 0 : links.dataProduct),
                segmentId: this.extractIdFromUri(segment),
            },
        }));
    }
    extractIdFromUri(uri) {
        return uri === null || uri === void 0 ? void 0 : uri.split("/").pop();
    }
}
//# sourceMappingURL=project.js.map