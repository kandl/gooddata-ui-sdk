// (C) 2007-2020 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * This exception is thrown when a fatal error occurs during the data recording.
 *
 * The DataRecorderError is produced in 'log-and-throw' fashion. Code that raises the exception SHOULD do all the
 * necessary logging and cleanup and then throw the DataRecorderError. The top-level error handler then emits
 * message included in the error and exits process with exit code equal to the included `rc` field.
 */
export class DataRecorderError extends Error {
    constructor(message, rc) {
        super(message);
        this.rc = rc;
    }
}
export function isDataRecorderError(obj) {
    return !isEmpty(obj) && obj.rc !== undefined;
}
