import { IClientWorkspaceIdentifiers } from "./interfaces.js";
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
export declare function resolveLCMWorkspaceIdentifiers(backend: any, { client, dataProduct, workspace }: IClientWorkspaceIdentifiers): Promise<IClientWorkspaceIdentifiers>;
//# sourceMappingURL=resolveLCMWorkspaceIdentifiers.d.ts.map