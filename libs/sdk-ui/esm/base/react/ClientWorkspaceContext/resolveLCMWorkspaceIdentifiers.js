// (C) 2019-2022 GoodData Corporation
import partial from "lodash/partial.js";
import last from "lodash/last.js";
/**
 * Resolves LCM workspace identifiers. This function will use the data product and client information
 * and consult the backend in order to obtain identifier of workspace contains analytics for that
 * data product & client combination.
 *
 * Note that at the moment only the bear Analytical Backend supports the workspace identification using
 * LCM workspace identifiers. Attempting to use this function for other backends will yield empty
 * result.
 *
 * @param backend - analytical backend to resolve client workspace identifiers on
 * @param clientWorkspace - client workspace identifiers; must contain data product and client identifier
 * @returns resolved IClientWorkspaceIdentifiers or an empty object if resolution is not possible
 * @alpha
 */
export async function resolveLCMWorkspaceIdentifiers(
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
backend, { client, dataProduct, workspace }) {
    const projectLcmIdentifiers = await getProjectLcmIdentifiers(backend, workspace, dataProduct, client);
    if (!projectLcmIdentifiers) {
        return {};
    }
    return getLCMWorkspaceIdentifiersFromProjectLcmIdentifiers(projectLcmIdentifiers);
}
function emptyPromise() {
    return Promise.resolve();
}
function unwrapDecoratedBackend(backend) {
    if (backend === null || backend === void 0 ? void 0 : backend.decorated) {
        return unwrapDecoratedBackend(backend.decorated);
    }
    return backend;
}
function getBackendAuthApiCallPrivateMethod(backend) {
    var _a;
    return (_a = backend.authApiCall) !== null && _a !== void 0 ? _a : emptyPromise;
}
async function extractDomainIdFromPrincipal(getPrincipal) {
    var _a, _b, _c, _d;
    const principal = await getPrincipal();
    const domainLink = (_c = (_b = (_a = principal.userMeta) === null || _a === void 0 ? void 0 : _a.links) === null || _b === void 0 ? void 0 : _b.domain) !== null && _c !== void 0 ? _c : "";
    return (_d = last(domainLink.split("/"))) !== null && _d !== void 0 ? _d : null;
}
async function getBearClientProjectLcmIdentifiersMethod(client, getPrincipal) {
    var _a;
    const method = (_a = client === null || client === void 0 ? void 0 : client.project) === null || _a === void 0 ? void 0 : _a.getProjectLcmIdentifiers.bind(client === null || client === void 0 ? void 0 : client.project);
    const domainId = getPrincipal ? await extractDomainIdFromPrincipal(getPrincipal) : null;
    const methodWithSetDomain = partial(method, domainId);
    return methodWithSetDomain !== null && methodWithSetDomain !== void 0 ? methodWithSetDomain : emptyPromise;
}
async function getProjectLcmIdentifiers(backend, projectId, productId, clientId) {
    const unwrappedBackend = unwrapDecoratedBackend(backend);
    const authApiCall = getBackendAuthApiCallPrivateMethod(unwrappedBackend);
    return authApiCall(async (client, { getPrincipal }) => {
        const getProjectLcmIdentifiers = await getBearClientProjectLcmIdentifiersMethod(client, getPrincipal);
        return getProjectLcmIdentifiers(projectId, productId, clientId);
    });
}
function getLCMWorkspaceIdentifiersFromProjectLcmIdentifiers(projectLcmResponse) {
    var _a;
    const { clientId: client, dataProductId: dataProduct, segmentId: segment, projectId: workspace, } = (_a = projectLcmResponse === null || projectLcmResponse === void 0 ? void 0 : projectLcmResponse.projectLcm) !== null && _a !== void 0 ? _a : {};
    return {
        dataProduct,
        client,
        segment,
        workspace,
    };
}
//# sourceMappingURL=resolveLCMWorkspaceIdentifiers.js.map