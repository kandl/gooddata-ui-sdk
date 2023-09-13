/// <reference types="react" />
/**
 * React18 Root type.
 *
 * @public
 */
export interface Root {
    render(children: React.ReactNode): void;
    unmount(): void;
}
/**
 * React18 createRoot function type.
 *
 * @public
 */
export type CreateRoot = (container: Element | DocumentFragment, options?: any) => Root;
/**
 * Global createRoot function for React18 root creation.
 *
 * @internal
 */
export declare let _createRoot: CreateRoot;
/**
 * In order to use React18 for visualization rendering, one has to provide createRoot function.
 * Older React17 render is used by default.
 *
 * @public
 */
export declare function provideCreateRoot(createRoot: CreateRoot): void;
//# sourceMappingURL=createRootProvider.d.ts.map