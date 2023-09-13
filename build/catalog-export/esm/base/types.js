// (C) 2007-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * This exception is thrown when a fatal error occurs during the export processing - be it during interfacing with
 * the backend or other unexpected errors. The exception contains 'rc' field - this specifies the exit code
 * for the catalog export process.
 *
 * The CatalogExportError is produced in 'log-and-throw' fashion. Code that raises the exception SHOULD do all the
 * necessary logging and cleanup and then throw the CatalogExportError. The top-level error handler then emits
 * message included in the error and exits process with exit code equal to the included `rc` field.
 */
export class CatalogExportError extends Error {
    constructor(message, rc) {
        super(message);
        this.rc = rc;
    }
}
export function getConfiguredWorkspaceId(config) {
    if (config.workspaceId) {
        return config.workspaceId;
    }
    return null;
}
//
// Type Guards
//
export function isAttribute(obj) {
    return !isEmpty(obj) && obj.attribute !== undefined;
}
export function isMetric(obj) {
    return !isEmpty(obj) && obj.metric !== undefined;
}
export function isFact(obj) {
    return !isEmpty(obj) && obj.fact !== undefined;
}
export function isCatalogExportError(obj) {
    return !isEmpty(obj) && obj.rc !== undefined;
}
