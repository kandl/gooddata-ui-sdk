import React from "react";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
/**
 * Props of the {@link BackendProvider} component.
 * @public
 */
export interface IBackendProviderProps {
    /**
     * Specify instance of backend which should be used by components to communicate with the server.
     */
    backend: IAnalyticalBackend;
    /**
     * React children
     */
    children?: React.ReactNode;
}
/**
 * BackendProvider can be used to inject analytical backend instance to all ui-sdk components in your app.
 *
 * @public
 */
export declare const BackendProvider: React.FC<IBackendProviderProps>;
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
export declare const useBackend: (backend?: IAnalyticalBackend) => IAnalyticalBackend | undefined;
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
export declare const useBackendStrict: (backend?: IAnalyticalBackend, context?: string) => IAnalyticalBackend;
/**
 * Wraps component into a BackendContext consumer - injecting an instance of backend from context into the
 * backend prop.
 *
 * @internal
 */
export declare function withBackend<T extends {
    backend?: IAnalyticalBackend;
}>(Component: React.ComponentType<T>): React.ComponentType<T>;
//# sourceMappingURL=BackendContext.d.ts.map