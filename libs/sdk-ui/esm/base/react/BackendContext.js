// (C) 2019-2022 GoodData Corporation
import React from "react";
import { wrapDisplayName } from "./wrapDisplayName.js";
import { invariant } from "ts-invariant";
const BackendContext = React.createContext(undefined);
BackendContext.displayName = "BackendContext";
/**
 * BackendProvider can be used to inject analytical backend instance to all ui-sdk components in your app.
 *
 * @public
 */
export const BackendProvider = ({ children, backend }) => {
    return React.createElement(BackendContext.Provider, { value: backend }, children);
};
/**
 * Hook to get analytical backend instance provided to {@link BackendProvider}.
 *
 * @remarks
 * You can set a backend override that will be returned if defined.
 * This makes the usage more ergonomic (see the following example).
 *
 * Note: For a better TypeScript experience without the hassle of undefined values, you can use the {@link useBackendStrict} hook.
 *
 * @example
 * ```
 * // instead of
 * const fromContext = useBackend();
 * const effectiveBackend = fromArguments ?? fromContext.
 * // you can write
 * const backend = useBackend(fromArguments);
 *```
 *
 * @param backend - backend to use instead of context value. If undefined, the context value is used.
 * @public
 */
export const useBackend = (backend) => {
    const backendFromContext = React.useContext(BackendContext);
    return backend !== null && backend !== void 0 ? backend : backendFromContext;
};
/**
 * Hook to get analytical backend instance provided to {@link BackendProvider}.
 *
 * @remarks
 * You can set a backend override that will be returned if defined.
 * This makes the usage more ergonomic (see the following example).
 *
 * Note: If you do not provide an {@link @gooddata/sdk-backend-spi#IAnalyticalBackend} instance to {@link BackendProvider} or as a parameter for this hook,
 * an invariant error is raised.
 *
 * @example
 * ```
 * // instead of
 * const fromContext = useBackendStrict();
 * const effectiveBackend = fromArguments ?? fromContext.
 * // you can write
 * const backend = useBackendStrict(fromArguments);
 *```
 *
 * @param backend - backend to use instead of context value. If undefined, the context value is used.
 * @param context - provide context to improve error message in raised invariant (e.g. parent hook name).
 * @public
 */
export const useBackendStrict = (backend, context = "useBackendStrict") => {
    const backendFromContext = React.useContext(BackendContext);
    const effectiveBackend = backend !== null && backend !== void 0 ? backend : backendFromContext;
    invariant(effectiveBackend, `${context}: IAnalyticalBackend must be defined. Either pass it as a parameter or make sure there is a BackendProvider up the component tree.`);
    return effectiveBackend;
};
/**
 * Wraps component into a BackendContext consumer - injecting an instance of backend from context into the
 * backend prop.
 *
 * @internal
 */
export function withBackend(Component) {
    const ComponentWithInjectedBackend = (props) => {
        return (React.createElement(BackendContext.Consumer, null, (backend) => { var _a; return React.createElement(Component, Object.assign({}, props, { backend: (_a = props.backend) !== null && _a !== void 0 ? _a : backend })); }));
    };
    return wrapDisplayName("withBackend", Component)(ComponentWithInjectedBackend);
}
//# sourceMappingURL=BackendContext.js.map