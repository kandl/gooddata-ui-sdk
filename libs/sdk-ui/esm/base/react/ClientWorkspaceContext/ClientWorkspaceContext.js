// (C) 2019-2022 GoodData Corporation
import React from "react";
import { useBackendStrict } from "../BackendContext.js";
import { useCancelablePromise, } from "../useCancelablePromise.js";
import isEmpty from "lodash/isEmpty.js";
import { resolveLCMWorkspaceIdentifiers } from "./resolveLCMWorkspaceIdentifiers.js";
import { useWorkspace, WorkspaceProvider } from "../WorkspaceContext.js";
import { invariant } from "ts-invariant";
const ClientWorkspaceContext = React.createContext({
    status: "pending",
    error: undefined,
    result: undefined,
    isInitialized: false,
});
ClientWorkspaceContext.displayName = "ClientWorkspace";
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
export const ClientWorkspaceProvider = (props) => {
    var _a;
    const { children, backend: customBackend } = props;
    const { client, dataProduct, workspace: customWorkspace } = getInputLCMIdentifiersFromProps(props);
    const backend = useBackendStrict(customBackend, "ClientWorkspaceProvider");
    const workspace = useWorkspace(customWorkspace);
    const lcmIdentifiers = useCancelablePromise({
        promise: () => resolveLCMWorkspaceIdentifiers(backend, { client, dataProduct, workspace }),
    }, [client, dataProduct, workspace, backend]);
    const ws = (_a = lcmIdentifiers.result) === null || _a === void 0 ? void 0 : _a.workspace;
    return (React.createElement(ClientWorkspaceContext.Provider, { value: Object.assign(Object.assign({}, lcmIdentifiers), { isInitialized: true }) },
        React.createElement(WorkspaceProvider, { workspace: ws }, children)));
};
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
export const ResolvedClientWorkspaceProvider = (props) => {
    invariant(props.dataProduct);
    invariant(props.client);
    invariant(props.workspace);
    const context = {
        status: "success",
        result: props,
        error: undefined,
        isInitialized: true,
    };
    return (React.createElement(ClientWorkspaceContext.Provider, { value: context },
        React.createElement(WorkspaceProvider, { workspace: props.workspace }, props.children)));
};
/**
 * Hook to obtain loading status of the {@link ClientWorkspaceProvider} - "success", "error", "loading" or "pending".
 * @alpha
 */
export const useClientWorkspaceStatus = () => {
    const context = React.useContext(ClientWorkspaceContext);
    return context.status;
};
/**
 * Hook to obtain loading error of the {@link ClientWorkspaceProvider}.
 * @alpha
 */
export const useClientWorkspaceError = () => {
    const context = React.useContext(ClientWorkspaceContext);
    return context.error;
};
/**
 * Hook to obtain all resolved identifiers from the {@link ClientWorkspaceProvider} - workspace, segment, dataProduct and client.
 * @alpha
 */
export const useClientWorkspaceIdentifiers = () => {
    var _a;
    const context = React.useContext(ClientWorkspaceContext);
    return (_a = context.result) !== null && _a !== void 0 ? _a : {};
};
/**
 * Hook to check if client workspace is initialized.
 *
 * @alpha
 */
export const useClientWorkspaceInitialized = () => {
    const context = React.useContext(ClientWorkspaceContext);
    return context.isInitialized;
};
//
//
//
function hasWorkspaceProp(obj) {
    return !isEmpty(obj) && !!obj.workspace;
}
function getInputLCMIdentifiersFromProps(props) {
    if (hasWorkspaceProp(props)) {
        return {
            workspace: props.workspace,
        };
    }
    invariant(props.client && props.dataProduct, "ClientWorkspaceProvider: You must specify either - the workspace identifier, or the client and dataProduct identifier.");
    return {
        client: props.client,
        dataProduct: props.dataProduct,
    };
}
//# sourceMappingURL=ClientWorkspaceContext.js.map