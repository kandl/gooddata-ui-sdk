/**
 * Goes through the bootstrapped application and handles tiger specific files:
 * deleting them if not on tiger, or using them instead of the originals instead.
 * The tiger-specific versions of files are identified by the "--tiger" name suffix,
 * for example Welcome--tiger.tsx is a tiger version of Welcome.tsx.
 *
 * @param initialPath - path where to start looking for tiger files
 * @param isTigerBackend - flag indicating if the backend to use is tiger
 */
export declare function processTigerFiles(initialPath: string, isTigerBackend: boolean): Promise<void[]>;
//# sourceMappingURL=processTigerFiles.d.ts.map