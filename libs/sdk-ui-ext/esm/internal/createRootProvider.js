// (C) 2023 GoodData Corporation
/**
 * Global createRoot function for React18 root creation.
 *
 * @internal
 */
export let _createRoot = null;
/**
 * In order to use React18 for visualization rendering, one has to provide createRoot function.
 * Older React17 render is used by default.
 *
 * @public
 */
export function provideCreateRoot(createRoot) {
    _createRoot = createRoot;
}
//# sourceMappingURL=createRootProvider.js.map