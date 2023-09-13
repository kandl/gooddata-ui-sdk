// (C) 2022-2023 GoodData Corporation
import { __rest } from "tslib";
import { jsonApiHeaders, JsonApiOrganizationPatchTypeEnum, MetadataUtilities, JsonApiApiTokenInTypeEnum, JsonApiWorkspaceInTypeEnum, JsonApiDataSourceInTypeEnum, OrganizationUtilities, JsonApiCspDirectiveInTypeEnum, JsonApiCustomApplicationSettingOutTypeEnum, } from "@gooddata/api-client-tiger";
import { convertApiError } from "../utils/errorHandling.js";
import uniq from "lodash/uniq.js";
import toLower from "lodash/toLower.js";
import { UnexpectedError } from "@gooddata/sdk-backend-spi";
import isEmpty from "lodash/isEmpty.js";
const getDataSourceErrorMessage = (error) => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};
const dataSourceResponseAsDataSourceConnectionInfo = (response) => {
    var _a;
    const { id, meta, attributes } = response.data;
    const { name, url, type, schema, username, parameters, decodedParameters } = attributes;
    return {
        id,
        type,
        name,
        schema,
        username,
        url,
        permissions: (_a = meta === null || meta === void 0 ? void 0 : meta.permissions) !== null && _a !== void 0 ? _a : [],
        parameters,
        decodedParameters,
    };
};
const dataSourceIdentifierOutWithLinksAsDataSourceConnectionInfo = (response) => {
    var _a;
    const { id, meta, attributes } = response;
    const { name, type, schema } = attributes;
    return {
        id,
        type,
        name,
        schema,
        username: undefined,
        url: undefined,
        permissions: (_a = meta === null || meta === void 0 ? void 0 : meta.permissions) !== null && _a !== void 0 ? _a : [],
    };
};
const dataSourceIdentifierOutDocumentAsDataSourceConnectionInfo = (response) => {
    var _a;
    const { data: { attributes, id, meta }, } = response;
    const { name, type, schema } = attributes;
    return {
        id,
        type,
        name,
        schema,
        username: undefined,
        url: undefined,
        permissions: (_a = meta === null || meta === void 0 ? void 0 : meta.permissions) !== null && _a !== void 0 ? _a : [],
    };
};
const customAppSettingResponseAsICustomApplicationSetting = (response) => {
    const { id, attributes } = response;
    const { applicationName, content } = attributes;
    return {
        id,
        applicationName,
        content,
    };
};
export const buildTigerSpecificFunctions = (backend, authApiCall) => ({
    isCommunityEdition: async () => {
        try {
            return await authApiCall(async (sdk) => {
                const response = await sdk.entities.getAllEntitiesWorkspaces({ page: 0, size: 1 }, { headers: jsonApiHeaders });
                // the header name are all lowercase in this object
                return response.headers["gooddata-deployment"] === "aio";
            });
        }
        catch (_a) {
            return false;
        }
    },
    isOrganizationAdmin: async () => {
        try {
            const orgPermissions = await authApiCall(async (sdk) => {
                var _a;
                const { organizationId } = await backend.organizations().getCurrentOrganization();
                const response = await sdk.entities.getEntityOrganizations({
                    id: organizationId,
                    metaInclude: ["permissions"],
                });
                return ((_a = response.data.data.meta) === null || _a === void 0 ? void 0 : _a.permissions) || [];
            });
            const isOrganizationManage = (permissions) => permissions.includes("MANAGE");
            return isOrganizationManage(orgPermissions);
        }
        catch (_a) {
            return false;
        }
    },
    organizationExpiredDate: async () => {
        try {
            return await authApiCall(async (sdk) => {
                var _a;
                const response = await sdk.entities.getAllEntitiesEntitlements({});
                const contractEntitlement = response.data.data.find((item) => item.id === "Contract");
                return ((_a = contractEntitlement === null || contractEntitlement === void 0 ? void 0 : contractEntitlement.attributes) === null || _a === void 0 ? void 0 : _a.expiry) || "";
            });
        }
        catch (_a) {
            return "";
        }
    },
    getOrganizationAllowedOrigins: async (organizationId) => {
        try {
            return await authApiCall(async (sdk) => {
                var _a, _b, _c;
                const result = await sdk.entities.getEntityOrganizations({ id: organizationId });
                return ((_c = (_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.allowedOrigins) || [];
            });
        }
        catch (error) {
            return [];
        }
    },
    getOrganizationPermissions: async (organizationId) => {
        var _a, _b, _c;
        try {
            return await authApiCall(async (sdk) => {
                var _a, _b;
                const result = await sdk.entities.getEntityOrganizations({
                    id: organizationId,
                    metaInclude: ["permissions"],
                });
                return ((_b = (_a = result.data.data) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.permissions) || [];
            });
        }
        catch (error) {
            const toleratedCodes = [404, 403];
            if (toleratedCodes.includes((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) ||
                toleratedCodes.includes((_c = (_b = error === null || error === void 0 ? void 0 : error.cause) === null || _b === void 0 ? void 0 : _b.response) === null || _c === void 0 ? void 0 : _c.status) // the error might be wrapped by an UnexpectedResponseError so check for it too
            ) {
                // temporary - 404 gets returned if you are not org admin
                return [];
            }
            throw convertApiError(error);
        }
    },
    updateOrganizationAllowedOrigins: async (organizationId, updatedOrigins) => {
        var _a, _b, _c, _d, _e;
        const sanitizeOrigins = (origins) => {
            const arr = origins ? origins : [];
            return uniq(arr.map((s) => toLower(s))).sort();
        };
        try {
            return await authApiCall(async (sdk) => {
                var _a, _b, _c;
                const result = await sdk.entities.patchEntityOrganizations({
                    id: organizationId,
                    jsonApiOrganizationPatchDocument: {
                        data: {
                            id: organizationId,
                            type: JsonApiOrganizationPatchTypeEnum.ORGANIZATION,
                            attributes: {
                                allowedOrigins: updatedOrigins,
                            },
                        },
                    },
                });
                return sanitizeOrigins(((_c = (_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.allowedOrigins) || []);
            });
        }
        catch (error) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400) {
                const message = ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.detail)
                    ? (_e = (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.detail
                    : "Server error";
                throw new UnexpectedError(message, error);
            }
            throw convertApiError(error);
        }
    },
    getDeploymentVersion: async () => {
        try {
            return await authApiCall(async (sdk) => {
                var _a;
                // TODO use a client call when available via some endpoint described in OpenAPI
                const profile = await sdk.axios.get("/api/v1/profile");
                return (_a = profile === null || profile === void 0 ? void 0 : profile.headers) === null || _a === void 0 ? void 0 : _a["gooddata-deployment"];
            });
        }
        catch (_a) {
            return undefined;
        }
    },
    getAllApiTokens: async (userId) => {
        const mapTokens = (tokens) => {
            return tokens.data.map((item) => {
                const result = {
                    id: item.id,
                };
                return result;
            });
        };
        try {
            return await authApiCall(async (sdk) => {
                return await MetadataUtilities.getAllPagesOf(sdk, sdk.entities.getAllEntitiesApiTokens, {
                    userId,
                })
                    .then(MetadataUtilities.mergeEntitiesResults)
                    .then(mapTokens);
            });
        }
        catch (_a) {
            return [];
        }
    },
    generateApiToken: async (userId, tokenId) => {
        try {
            return await authApiCall(async (sdk) => {
                var _a, _b, _c;
                const apiTokenDocument = {
                    data: {
                        id: tokenId,
                        type: JsonApiApiTokenInTypeEnum.API_TOKEN,
                    },
                };
                const result = await sdk.entities.createEntityApiTokens({
                    userId: userId,
                    jsonApiApiTokenInDocument: apiTokenDocument,
                });
                return {
                    id: (_a = result.data.data) === null || _a === void 0 ? void 0 : _a.id,
                    bearerToken: (_c = (_b = result.data.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.bearerToken,
                };
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    deleteApiToken: async (userId, tokenId) => {
        try {
            await authApiCall(async (sdk) => {
                await sdk.entities.deleteEntityApiTokens({ userId: userId, id: tokenId });
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    someDataSourcesExists: async (filter) => {
        return await authApiCall(async (sdk) => {
            const requestParams = filter ? { filter } : {};
            return sdk.entities
                .getAllEntitiesDataSources(requestParams)
                .then((axiosResponse) => { var _a; return ((_a = axiosResponse.data.data) === null || _a === void 0 ? void 0 : _a.length) > 0; })
                .catch(() => {
                return false;
            });
        });
    },
    generateLogicalModel: async (dataSourceId, generateLdmRequest) => {
        try {
            return await authApiCall(async (sdk) => {
                return sdk.actions
                    .generateLogicalModel({
                    dataSourceId,
                    generateLdmRequest,
                })
                    .then((axiosResponse) => axiosResponse.data);
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    scanDataSource: async (dataSourceId, scanRequest) => {
        try {
            return await authApiCall(async (sdk) => {
                return await sdk.scanModel
                    .scanDataSource({
                    dataSourceId,
                    scanRequest,
                })
                    .then((res) => {
                    return res === null || res === void 0 ? void 0 : res.data;
                });
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    publishPdm: async (dataSourceId, declarativePdm) => {
        return await authApiCall(async (sdk) => {
            return await sdk.declarativeLayout
                .setPdmLayout({
                dataSourceId,
                declarativePdm,
            })
                .then(() => {
                return {
                    status: "success",
                };
            }, (error) => {
                return Promise.reject(error);
            });
        });
    },
    createDemoWorkspace: async (sampleWorkspace) => {
        try {
            return await authApiCall(async (sdk) => {
                const result = await sdk.entities.createEntityWorkspaces({
                    jsonApiWorkspaceInDocument: sampleWorkspace,
                });
                return result.data.data.id;
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    createDemoDataSource: async (sampleDataSource) => {
        try {
            return await authApiCall(async (sdk) => {
                const result = await sdk.entities.createEntityDataSources({
                    jsonApiDataSourceInDocument: sampleDataSource,
                });
                return result.data.data.id;
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    setPdmLayout: async (requestParameters) => {
        try {
            return await authApiCall(async (sdk) => {
                await sdk.declarativeLayout.setPdmLayout(requestParameters);
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    createWorkspace: async (id, name) => {
        try {
            return await authApiCall(async (sdk) => {
                const result = await sdk.entities.createEntityWorkspaces({
                    jsonApiWorkspaceInDocument: {
                        data: {
                            attributes: {
                                name,
                            },
                            id,
                            type: JsonApiWorkspaceInTypeEnum.WORKSPACE,
                        },
                    },
                });
                return result.data.data.id;
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    updateWorkspaceTitle: async (id, name) => {
        try {
            return await authApiCall(async (sdk) => {
                await sdk.entities.updateEntityWorkspaces({
                    id,
                    jsonApiWorkspaceInDocument: {
                        data: {
                            attributes: {
                                name,
                            },
                            id,
                            type: JsonApiWorkspaceInTypeEnum.WORKSPACE,
                        },
                    },
                });
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    deleteWorkspace: async (id) => {
        try {
            return await authApiCall(async (sdk) => {
                await sdk.entities.deleteEntityWorkspaces({ id });
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    canDeleteWorkspace: async (id) => {
        try {
            return await authApiCall(async (sdk) => {
                const childWorkspaces = (await sdk.entities.getAllEntitiesWorkspaces({
                    include: ["workspaces"],
                    filter: `parent.id==${id}`,
                })).data.data;
                return isEmpty(childWorkspaces);
            });
        }
        catch (e) {
            return true;
        }
    },
    getWorkspaceLogicalModel: async (workspaceId, includeParents = false) => {
        try {
            return await authApiCall(async (sdk) => {
                const result = await sdk.declarativeLayout.getLogicalModel({ workspaceId, includeParents });
                return result.data;
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    getWorkspaceEntitiesDatasets: async (workspaceId) => {
        try {
            return await authApiCall(async (sdk) => {
                const result = await sdk.entities.getAllEntitiesDatasets({ workspaceId });
                return result.data;
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    putWorkspaceLayout: async (requestParameters) => {
        try {
            return await authApiCall(async (sdk) => {
                await sdk.declarativeLayout.putWorkspaceLayout(requestParameters);
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    getEntitlements: async () => {
        try {
            return await authApiCall(async (sdk) => {
                const result = await sdk.entities.getAllEntitiesEntitlements({});
                return result.data.data.map((entitlement) => {
                    var _a, _b;
                    return ({
                        id: entitlement.id,
                        value: (_a = entitlement.attributes) === null || _a === void 0 ? void 0 : _a.value,
                        expiry: (_b = entitlement.attributes) === null || _b === void 0 ? void 0 : _b.expiry,
                    });
                });
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    getDataSourceById: async (id) => {
        try {
            return await authApiCall(async (sdk) => {
                return sdk.entities
                    .getEntityDataSources({
                    id,
                })
                    .then((axiosResponse) => ({
                    data: dataSourceResponseAsDataSourceConnectionInfo(axiosResponse.data),
                }));
            });
        }
        catch (error) {
            return { errorMessage: getDataSourceErrorMessage(error) };
        }
    },
    getDataSourceIdentifierById: async (id) => {
        try {
            return await authApiCall(async (sdk) => {
                return sdk.entities
                    .getEntityDataSourceIdentifiers({
                    id,
                })
                    .then((axiosResponse) => ({
                    data: dataSourceIdentifierOutDocumentAsDataSourceConnectionInfo(axiosResponse.data),
                }));
            });
        }
        catch (error) {
            return { errorMessage: getDataSourceErrorMessage(error) };
        }
    },
    createDataSource: async (requestData) => {
        const { id, name, password, schema, token, type, url, username, parameters } = requestData;
        try {
            return await authApiCall(async (sdk) => {
                return sdk.entities
                    .createEntityDataSources({
                    jsonApiDataSourceInDocument: {
                        data: {
                            attributes: {
                                name,
                                password,
                                schema,
                                token,
                                type,
                                url,
                                username,
                                parameters,
                            },
                            id,
                            type: JsonApiDataSourceInTypeEnum.DATA_SOURCE,
                        },
                    },
                })
                    .then((axiosResponse) => ({
                    data: dataSourceResponseAsDataSourceConnectionInfo(axiosResponse.data),
                }));
            });
        }
        catch (error) {
            return { errorMessage: getDataSourceErrorMessage(error) };
        }
    },
    updateDataSource: async (id, requestData) => {
        const { id: requestDataId, name, password, schema, token, type, url, username, parameters, } = requestData;
        try {
            return await authApiCall(async (sdk) => {
                return sdk.entities
                    .updateEntityDataSources({
                    id,
                    jsonApiDataSourceInDocument: {
                        data: {
                            attributes: {
                                name,
                                password,
                                schema,
                                token,
                                type,
                                url,
                                username,
                                parameters,
                            },
                            id: requestDataId,
                            type: JsonApiDataSourceInTypeEnum.DATA_SOURCE,
                        },
                    },
                })
                    .then((axiosResponse) => ({
                    data: dataSourceResponseAsDataSourceConnectionInfo(axiosResponse.data),
                }));
            });
        }
        catch (error) {
            return { errorMessage: getDataSourceErrorMessage(error) };
        }
    },
    patchDataSource: async (id, requestData) => {
        const { id: requestDataId, name, password, schema, token, type, url, username, parameters, } = requestData;
        try {
            return await authApiCall(async (sdk) => {
                return sdk.entities
                    .patchEntityDataSources({
                    id,
                    jsonApiDataSourcePatchDocument: {
                        data: {
                            attributes: {
                                name,
                                password,
                                schema,
                                token,
                                type,
                                url,
                                username,
                                parameters,
                            },
                            id: requestDataId,
                            type: JsonApiDataSourceInTypeEnum.DATA_SOURCE,
                        },
                    },
                })
                    .then((axiosResponse) => ({
                    data: dataSourceResponseAsDataSourceConnectionInfo(axiosResponse.data),
                }));
            });
        }
        catch (error) {
            return { errorMessage: getDataSourceErrorMessage(error) };
        }
    },
    deleteDataSource: async (id) => {
        try {
            return await authApiCall(async (sdk) => {
                await sdk.entities.deleteEntityDataSources({
                    id,
                });
                return { successful: true };
            });
        }
        catch (error) {
            return { errorMessage: getDataSourceErrorMessage(error) };
        }
    },
    testDataSourceConnection: async (connectionData, id) => {
        try {
            return await authApiCall(async (sdk) => {
                const promise = id
                    ? sdk.scanModel.testDataSource({
                        dataSourceId: id,
                        testRequest: connectionData,
                    })
                    : sdk.scanModel.testDataSourceDefinition({
                        testDefinitionRequest: connectionData,
                    });
                return await promise.then((axiosResponse) => axiosResponse.data);
            });
        }
        catch (error) {
            return {
                successful: false,
                error: getDataSourceErrorMessage(error),
            };
        }
    },
    getDataSourceSchemata: async (dataSourceId) => {
        return await authApiCall(async (sdk) => {
            return await sdk.scanModel.getDataSourceSchemata({ dataSourceId }).then((res) => {
                return res === null || res === void 0 ? void 0 : res.data.schemaNames;
            });
        });
    },
    getPdm: async (dataSourceId) => {
        return await authApiCall(async (sdk) => {
            return await sdk.declarativeLayout
                .getPdmLayout({
                dataSourceId,
            })
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.data;
            });
        });
    },
    getAllDataSources: async () => {
        return await authApiCall(async (sdk) => {
            return OrganizationUtilities.getAllPagesOf(sdk, sdk.entities.getAllEntitiesDataSourceIdentifiers, {
                sort: ["name"],
                metaInclude: ["permissions"],
            })
                .then(OrganizationUtilities.mergeEntitiesResults)
                .then((res) => {
                return res.data.map(dataSourceIdentifierOutWithLinksAsDataSourceConnectionInfo);
            });
        });
    },
    publishLogicalModel: async (workspaceId, declarativeModel) => {
        return await authApiCall(async (sdk) => {
            await sdk.declarativeLayout.setLogicalModel({
                workspaceId,
                declarativeModel,
            });
        });
    },
    getDependentEntitiesGraph: async (workspaceId) => {
        try {
            return await authApiCall(async (sdk) => {
                return await sdk.actions
                    .getDependentEntitiesGraph({
                    workspaceId,
                })
                    .then((res) => {
                    return res === null || res === void 0 ? void 0 : res.data;
                });
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    getDependentEntitiesGraphFromEntryPoints: async (workspaceId, dependentEntitiesGraphRequest) => {
        try {
            return await authApiCall(async (sdk) => {
                return await sdk.actions
                    .getDependentEntitiesGraphFromEntryPoints({
                    workspaceId,
                    dependentEntitiesRequest: dependentEntitiesGraphRequest,
                })
                    .then((res) => {
                    return res === null || res === void 0 ? void 0 : res.data;
                });
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    resolveAllEntitlements: async () => {
        return authApiCall(async (sdk) => sdk.actions.resolveAllEntitlements().then((res) => res.data));
    },
    getAllPlatformUsage: async () => {
        return authApiCall(async (sdk) => sdk.actions.allPlatformUsage().then((res) => res.data));
    },
    inviteUser: async (requestParameters, options) => {
        return authApiCall(async (sdk) => {
            return sdk.authActions.processInvitation(requestParameters, options).then((res) => {
                if (res.status == 204) {
                    return {
                        successful: true,
                    };
                }
                else {
                    return {
                        successful: false,
                        errorMessage: res === null || res === void 0 ? void 0 : res.data,
                    };
                }
            });
        });
    },
    getWorkspaceDataFiltersLayout: async () => {
        try {
            return await authApiCall(async (sdk) => {
                const result = await sdk.declarativeLayout.getWorkspaceDataFiltersLayout();
                return result.data;
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    setWorkspaceDataFiltersLayout: async (workspaceDataFiltersLayout) => {
        return await authApiCall(async (sdk) => {
            await sdk.declarativeLayout.setWorkspaceDataFiltersLayout({
                declarativeWorkspaceDataFilters: workspaceDataFiltersLayout,
            });
        });
    },
    getAllCSPDirectives: async () => {
        try {
            return await authApiCall(async (sdk) => {
                var _a;
                const result = await sdk.entities.getAllEntitiesCspDirectives({});
                return ((_a = result.data) === null || _a === void 0 ? void 0 : _a.data) || [];
            });
        }
        catch (error) {
            return [];
        }
    },
    getCSPDirective: async (directiveId) => {
        try {
            return await authApiCall(async (sdk) => {
                var _a;
                const result = await sdk.entities.getEntityCspDirectives({ id: directiveId });
                return (_a = result.data) === null || _a === void 0 ? void 0 : _a.data;
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    createCSPDirective: async (requestData) => {
        var _a, _b, _c, _d, _e;
        try {
            return await authApiCall(async (sdk) => {
                var _a;
                const jsonApiCspDirectiveInDocument = {
                    data: {
                        id: requestData.id,
                        type: JsonApiCspDirectiveInTypeEnum.CSP_DIRECTIVE,
                        attributes: requestData.attributes,
                    },
                };
                const result = await sdk.entities.createEntityCspDirectives({
                    jsonApiCspDirectiveInDocument,
                });
                return (_a = result.data) === null || _a === void 0 ? void 0 : _a.data;
            });
        }
        catch (error) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400) {
                const message = ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.detail)
                    ? (_e = (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.detail
                    : "Server error";
                throw new UnexpectedError(message, error);
            }
            throw convertApiError(error);
        }
    },
    updateCSPDirective: async (directiveId, requestData) => {
        var _a, _b, _c, _d, _e;
        try {
            return await authApiCall(async (sdk) => {
                var _a;
                const jsonApiCspDirectiveInDocument = {
                    data: {
                        id: requestData.id,
                        type: JsonApiCspDirectiveInTypeEnum.CSP_DIRECTIVE,
                        attributes: requestData.attributes,
                    },
                };
                const result = await sdk.entities.updateEntityCspDirectives({
                    id: directiveId,
                    jsonApiCspDirectiveInDocument,
                });
                return (_a = result.data) === null || _a === void 0 ? void 0 : _a.data;
            });
        }
        catch (error) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400) {
                const message = ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.detail)
                    ? (_e = (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.detail
                    : "Server error";
                throw new UnexpectedError(message, error);
            }
            throw convertApiError(error);
        }
    },
    deleteCSPDirective: async (directiveId) => {
        try {
            await authApiCall(async (sdk) => {
                await sdk.entities.deleteEntityCspDirectives({ id: directiveId });
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    getWorkspaceCustomAppSettings: async (workspaceId, applicationName) => {
        return await authApiCall(async (sdk) => {
            const result = await sdk.entities.getAllEntitiesCustomApplicationSettings({
                workspaceId,
            });
            const responseData = result.data;
            if (applicationName) {
                responseData.data = responseData.data.filter((setting) => setting.attributes.applicationName === applicationName);
            }
            return responseData.data.map((setting) => customAppSettingResponseAsICustomApplicationSetting(setting));
        });
    },
    getWorkspaceCustomAppSetting: async (workspaceId, settingId) => {
        try {
            return await authApiCall(async (sdk) => {
                const result = await sdk.entities.getEntityCustomApplicationSettings({
                    objectId: settingId,
                    workspaceId,
                });
                return customAppSettingResponseAsICustomApplicationSetting(result.data.data);
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    createWorkspaceCustomAppSetting: async (workspaceId, applicationName, content, settingId) => {
        return await authApiCall(async (sdk) => {
            const result = await sdk.entities.createEntityCustomApplicationSettings({
                workspaceId,
                jsonApiCustomApplicationSettingPostOptionalIdDocument: {
                    data: {
                        type: JsonApiCustomApplicationSettingOutTypeEnum.CUSTOM_APPLICATION_SETTING,
                        id: settingId,
                        attributes: {
                            applicationName,
                            content,
                        },
                    },
                },
            });
            return customAppSettingResponseAsICustomApplicationSetting(result.data.data);
        });
    },
    deleteWorkspaceCustomAppSetting: async (workspaceId, settingId) => {
        try {
            return await authApiCall(async (sdk) => {
                await sdk.entities.deleteEntityCustomApplicationSettings({
                    objectId: settingId,
                    workspaceId,
                });
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    getEntityUser: async (id) => {
        try {
            return await authApiCall(async (sdk) => {
                var _a;
                const result = await sdk.entities.getEntityUsers({
                    id,
                });
                const _b = ((_a = result.data) === null || _a === void 0 ? void 0 : _a.data.attributes) || {}, { firstname, lastname } = _b, userInfo = __rest(_b, ["firstname", "lastname"]);
                return Object.assign(Object.assign({}, userInfo), { firstName: firstname, lastName: lastname });
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    registerUploadNotification: async (dataSourceId) => {
        return await authApiCall(async (sdk) => {
            await sdk.actions.registerUploadNotification({
                dataSourceId,
            });
        });
    },
    scanSql: async (dataSourceId, sql) => {
        try {
            return await authApiCall(async (sdk) => {
                return sdk.scanModel.scanSql({ dataSourceId, scanSqlRequest: { sql } }).then((response) => {
                    return response.data;
                });
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
    checkEntityOverrides: async (workspaceId, hierarchyObjectIdentification) => {
        try {
            return await authApiCall(async (sdk) => {
                return sdk.actions
                    .checkEntityOverrides({ workspaceId, hierarchyObjectIdentification })
                    .then((response) => {
                    return response.data;
                });
            });
        }
        catch (error) {
            throw convertApiError(error);
        }
    },
});
//# sourceMappingURL=tigerSpecificFunctions.js.map