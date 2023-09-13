/**
 * This exception is thrown when a fatal error occurs during the data recording.
 *
 * The DataRecorderError is produced in 'log-and-throw' fashion. Code that raises the exception SHOULD do all the
 * necessary logging and cleanup and then throw the DataRecorderError. The top-level error handler then emits
 * message included in the error and exits process with exit code equal to the included `rc` field.
 */
export declare class DataRecorderError extends Error {
    readonly rc: number;
    constructor(message: string, rc: number);
}
export type BackendType = "bear" | "tiger";
/**
 * Exporter configuration
 */
export type DataRecorderConfig = {
    /**
     * Hostname where project lives
     */
    hostname: string | null;
    /**
     * Identifier of the project
     */
    projectId: string | null;
    /**
     * User to authenticate as.
     */
    username: string | null;
    /**
     * Password to use for authentication
     */
    password: string | null;
    /**
     * Directory with recordings inputs & outputs.
     */
    recordingDir: string | null;
    /**
     * Backend type: bear or tiger.
     */
    backend: BackendType | null;
    /**
     * If specified, projectId will be replaced with this value in all files written by
     * the mock handling tool.
     */
    replaceProjectId: string | null;
};
export declare function isDataRecorderError(obj: unknown): obj is DataRecorderError;
//# sourceMappingURL=types.d.ts.map