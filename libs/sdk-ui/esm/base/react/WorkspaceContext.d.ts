import React from "react";
/**
 * Props of the {@link WorkspaceProvider} component.
 * @public
 */
export interface IWorkspaceProviderProps {
    /**
     * Workspace with which the components should work with.
     */
    workspace: string;
    /**
     * React children
     */
    children?: React.ReactNode;
}
/**
 * WorkspaceProvider can be used to inject analytical workspace instance to all ui-sdk components in your app.
 *
 * @public
 */
export declare const WorkspaceProvider: React.FC<IWorkspaceProviderProps>;
/**
 * Hook to get workspace instance provided to {@link WorkspaceProvider}.
 *
 * @remarks
 * You can set a workspace override that will be returned if defined.
 * This makes the usage more ergonomic (see the following example).
 *
 * Note: For a better TypeScript experience without the hassle of undefined values, you can use the {@link useWorkspaceStrict} hook.
 *
 * @example
 * ```
 * // instead of
 * const fromContext = useWorkspace();
 * const effectiveWorkspace = fromArguments ?? fromContext.
 * // you can write
 * const workspace = useWorkspace(fromArguments);
 *```
 *
 * @param workspace - workspace to use instead of context value. If undefined, the context value is used.
 * @public
 */
export declare const useWorkspace: (workspace?: string) => string | undefined;
/**
 * Hook to get workspace instance provided to {@link WorkspaceProvider}.
 *
 * @remarks
 * You can set a workspace override that will be returned if defined.
 * This makes the usage more ergonomic (see the following example).
 *
 * Note: Note: If you do not provide a workspace identifier to {@link WorkspaceProvider} or as a parameter for this hook,
 * an invariant error is raised.
 *
 * @example
 * ```
 * // instead of
 * const fromContext = useWorkspaceStrict();
 * const effectiveWorkspace = fromArguments ?? fromContext.
 * // you can write
 * const workspace = useWorkspaceStrict(fromArguments);
 * ```
 *
 * @param workspace - workspace to use instead of context value. If undefined, the context value is used.
 * @param context - provide context to improve error message in raised invariant (e.g. parent hook name).
 * @public
 */
export declare const useWorkspaceStrict: (workspace?: string, context?: string) => string;
/**
 * Wraps component into a WorkspaceContext consumer - injecting an instance of workspace from context into the
 * workspace prop.
 *
 * @internal
 */
export declare function withWorkspace<T extends {
    workspace?: string;
}>(Component: React.ComponentType<T>): React.ComponentType<T>;
//# sourceMappingURL=WorkspaceContext.d.ts.map