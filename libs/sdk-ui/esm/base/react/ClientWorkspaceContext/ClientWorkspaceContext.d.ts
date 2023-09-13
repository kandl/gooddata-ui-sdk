import React from "react";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { UseCancelablePromiseState, UseCancelablePromiseStatus } from "../useCancelablePromise.js";
import { GoodDataSdkError } from "../../errors/GoodDataSdkError.js";
import { IClientWorkspaceIdentifiers, IClientWorkspaceStatus } from "./interfaces.js";
/**
 * @alpha
 */
export type IClientWorkspaceContext = UseCancelablePromiseState<IClientWorkspaceIdentifiers, GoodDataSdkError> & IClientWorkspaceStatus;
/**
 * Common props of the {@link ClientWorkspaceProvider}.
 *
 * @alpha
 */
export interface IClientWorkspaceProviderCoreProps {
    /**
     * Specify an instance of the analytical backend instance to work with.
     *
     * @remarks
     * Note: if you do not have a BackendProvider above in the component tree, then you MUST specify the backend.
     */
    backend?: IAnalyticalBackend;
    /**
     * Wrapped React components that will have access to the LCMWorkspace context.
     */
    children: React.ReactNode;
}
/**
 * @alpha
 */
export interface IClientWorkspaceProviderWithWorkspaceProps extends IClientWorkspaceProviderCoreProps {
    /**
     * Specify the workspace to use to obtain the LCM context.
     *
     * @remarks
     * Note: another option is to specify dataProduct and client props, and then workspace will be resolved from them.
     */
    workspace: string;
}
/**
 * @alpha
 */
export interface IClientWorkspaceProviderWithClientAndDataProductProps extends IClientWorkspaceProviderCoreProps {
    /**
     * Specify the data product identifier to use to obtain the LCM context.
     *
     * @remarks
     * Note: another option is to specify workspace prop, and then data product identifier will be resolved from it.
     */
    dataProduct: string;
    /**
     * Specify the client identifier to use to obtain the LCM context.
     *
     * Note: another option is to specify workspace prop, and then client identifier will be resolved from it.
     */
    client: string;
}
/**
 * Props of the {@link ClientWorkspaceProvider} component.
 * @alpha
 */
export type IClientWorkspaceProviderProps = IClientWorkspaceProviderWithWorkspaceProps | IClientWorkspaceProviderWithClientAndDataProductProps;
/**
 * ClientWorkspaceProvider can be used as a replacement of the {@link WorkspaceProvider},
 * if you want to work with the workspace in LCM context.
 *
 * It allows you to:
 * - Use dataProduct and client identifier as a replacement of the workspace identifier.
 *   Workspace identifier is resolved and provided to the {@link WorkspaceProvider} automatically.
 *
 * - Use workspace identifier to obtain dataProduct, client and segment identifiers by the {@link useClientWorkspaceIdentifiers} hooks.
 *
 * If the backend does not support clientId / dataProduct LCM provisioning,
 * or the workspace is not provisioned via LCM, segment / client / dataProduct values will be undefined.
 *
 * To read more details about LCM, see: {@link https://help.gooddata.com/pages/viewpage.action?pageId=86796865}
 *
 * @alpha
 */
export declare const ClientWorkspaceProvider: React.FC<IClientWorkspaceProviderProps>;
/**
 * ResolvedClientWorkspaceProvider can be used as a replacement of the {@link WorkspaceProvider}, if you are accessing
 * workspace in LCM context.
 *
 * This provider expects that the client workspace is already resolved on input to the provider. The provider
 * will then establish a client workspace and workspace contexts so that the resolved information can
 * be accessed by the children.
 *
 * Note: check out the {@link ClientWorkspaceProvider} for version of provider that performs the resolution of
 * client workspace identifiers to workspace.
 *
 * @alpha
 */
export declare const ResolvedClientWorkspaceProvider: React.FC<IClientWorkspaceIdentifiers>;
/**
 * Hook to obtain loading status of the {@link ClientWorkspaceProvider} - "success", "error", "loading" or "pending".
 * @alpha
 */
export declare const useClientWorkspaceStatus: () => UseCancelablePromiseStatus;
/**
 * Hook to obtain loading error of the {@link ClientWorkspaceProvider}.
 * @alpha
 */
export declare const useClientWorkspaceError: () => GoodDataSdkError | undefined;
/**
 * Hook to obtain all resolved identifiers from the {@link ClientWorkspaceProvider} - workspace, segment, dataProduct and client.
 * @alpha
 */
export declare const useClientWorkspaceIdentifiers: () => IClientWorkspaceIdentifiers;
/**
 * Hook to check if client workspace is initialized.
 *
 * @alpha
 */
export declare const useClientWorkspaceInitialized: () => boolean;
//# sourceMappingURL=ClientWorkspaceContext.d.ts.map