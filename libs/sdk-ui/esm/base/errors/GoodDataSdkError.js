// (C) 2007-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Error codes recognized by the SDK.
 *
 * @public
 */
export const ErrorCodes = {
    BAD_REQUEST: "BAD_REQUEST",
    UNAUTHORIZED: "UNAUTHORIZED",
    GEO_LOCATION_MISSING: "GEO_LOCATION_MISSING",
    GEO_MAPBOX_TOKEN_MISSING: "GEO_MAPBOX_TOKEN_MISSING",
    DATA_TOO_LARGE_TO_DISPLAY: "DATA_TOO_LARGE_TO_DISPLAY",
    DATA_TOO_LARGE_TO_COMPUTE: "DATA_TOO_LARGE_TO_COMPUTE",
    NEGATIVE_VALUES: "NEGATIVE_VALUES",
    NO_DATA: "NO_DATA",
    NOT_FOUND: "NOT_FOUND",
    PROTECTED_REPORT: "PROTECTED_REPORT",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    CANCELLED: "CANCELLED",
    DYNAMIC_SCRIPT_LOAD_ERROR: "DYNAMIC_SCRIPT_LOAD_ERROR",
    TIMEOUT_ERROR: "TIMEOUT_ERROR",
    VISUALIZATION_CLASS_UNKNOWN: "VISUALIZATION_CLASS_UNKNOWN",
};
/**
 * Base class for all anticipated GoodData.UI SDK errors.
 *
 * @public
 */
export class GoodDataSdkError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(seType, message, cause) {
        /**
         * This is here to keep exception handling in client code initially backward compatible. Previosly
         * GoodDataSdkError had the error code inside the message itself. Keeping it that way.
         *
         * Note: using || instead of ?? so that code falls back to use error type even on empty message
         */
        super(message || seType);
        this.seType = seType;
        this.cause = cause;
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
    /**
     * Provides description of the problem or one of {@link ErrorCodes}.
     */
    getMessage() {
        return this.message;
    }
    /**
     * Underlying cause of this error (if any).
     */
    getCause() {
        return this.cause;
    }
    /**
     * Error code for this exception.
     *
     * @remarks
     * This can be used to identify exact type of exception.
     */
    getErrorCode() {
        return this.seType;
    }
}
/**
 * This error means that server could not understand the request due to invalid syntax.
 *
 * @public
 */
export class BadRequestSdkError extends GoodDataSdkError {
    constructor(message, cause) {
        super(ErrorCodes.BAD_REQUEST, message, cause);
    }
}
/**
 * This error means that you are not authorized.
 *
 * @public
 */
export class UnauthorizedSdkError extends GoodDataSdkError {
    constructor(message, cause) {
        super(ErrorCodes.UNAUTHORIZED, message, cause);
    }
}
/**
 * This error means that location bucket is missing
 *
 * @public
 */
export class GeoLocationMissingSdkError extends GoodDataSdkError {
    constructor(message, cause) {
        super(ErrorCodes.GEO_LOCATION_MISSING, message, cause);
    }
}
/**
 * This error means that mapbox token of GeoChart is missing
 *
 * @public
 */
export class GeoTokenMissingSdkError extends GoodDataSdkError {
    constructor(message, cause) {
        super(ErrorCodes.GEO_MAPBOX_TOKEN_MISSING, message, cause);
    }
}
/**
 * This error means that executed data were too large to be displayed by GoodData.UI.
 *
 * @public
 */
export class DataTooLargeToDisplaySdkError extends GoodDataSdkError {
    constructor(message, cause) {
        super(ErrorCodes.DATA_TOO_LARGE_TO_DISPLAY, message, cause);
    }
}
/**
 * This error means that processed request would generate a result too large to be processed
 * by GoodData platform.
 *
 * @public
 */
export class DataTooLargeToComputeSdkError extends GoodDataSdkError {
    constructor(message, cause) {
        super(ErrorCodes.DATA_TOO_LARGE_TO_COMPUTE, message, cause);
    }
}
/**
 * This error means that processed result contains negative values which does not make
 * sense within the given visualization (e.g. pie chart with negative values).
 *
 * @public
 */
export class NegativeValuesSdkError extends GoodDataSdkError {
    constructor(message, cause) {
        super(ErrorCodes.NEGATIVE_VALUES, message, cause);
    }
}
/**
 * This error means that the processed result does not contain any data.
 *
 * @public
 */
export class NoDataSdkError extends GoodDataSdkError {
    constructor(message, cause) {
        super(ErrorCodes.NO_DATA, message, cause);
    }
}
/**
 * This error means that requested entity (e.g. a visualization) was not found on the server.
 *
 * @public
 */
export class NotFoundSdkError extends GoodDataSdkError {
    constructor(message, cause) {
        super(ErrorCodes.NO_DATA, message, cause);
    }
}
/**
 * This error means that requested visualization is restricted by access rules within the GoodData platform.
 * Please contact your administrator.
 *
 * @public
 */
export class ProtectedReportSdkError extends GoodDataSdkError {
    constructor(message, cause) {
        super(ErrorCodes.PROTECTED_REPORT, message, cause);
    }
}
/**
 * This error means that GoodData.UI does not know how to handle such error.
 *
 * @public
 */
export class UnexpectedSdkError extends GoodDataSdkError {
    constructor(message, cause) {
        super(ErrorCodes.UNKNOWN_ERROR, message, cause);
    }
}
/**
 * This error means that request has been cancelled usually after component has been unmounted.
 *
 * @public
 */
export class CancelledSdkError extends GoodDataSdkError {
    constructor(message, cause) {
        super(ErrorCodes.CANCELLED, message, cause);
    }
}
/**
 * This error means that loading of dynamic script/plugin failed.
 *
 * @public
 */
export class DynamicScriptLoadSdkError extends GoodDataSdkError {
    constructor(message, cause) {
        super(ErrorCodes.DYNAMIC_SCRIPT_LOAD_ERROR, message, cause);
    }
}
//
//
//
/**
 * Typeguard checking whether input is an instance of {@link GoodDataSdkError};
 *
 * @public
 */
export function isGoodDataSdkError(obj) {
    return !isEmpty(obj) && obj.seType !== undefined;
}
/**
 * Typeguard checking whether input is an instance of {@link BadRequestSdkError};
 *
 * @public
 */
export function isBadRequest(obj) {
    return !isEmpty(obj) && obj.seType === "BAD_REQUEST";
}
/**
 * Typeguard checking whether input is an instance of {@link UnauthorizedSdkError};
 *
 * @public
 */
export function isUnauthorized(obj) {
    return !isEmpty(obj) && obj.seType === "UNAUTHORIZED";
}
/**
 * Typeguard checking whether input is an instance of {@link GeoLocationMissingSdkError};
 *
 * @public
 */
export function isGeoLocationMissing(obj) {
    return !isEmpty(obj) && obj.seType === "GEO_LOCATION_MISSING";
}
/**
 * Typeguard checking whether input is an instance of {@link GeoTokenMissingSdkError};
 *
 * @public
 */
export function isGeoTokenMissing(obj) {
    return !isEmpty(obj) && obj.seType === "GEO_MAPBOX_TOKEN_MISSING";
}
/**
 * Typeguard checking whether input is an instance of {@link DataTooLargeToDisplaySdkError};
 *
 * @public
 */
export function isDataTooLargeToDisplay(obj) {
    return !isEmpty(obj) && obj.seType === "DATA_TOO_LARGE_TO_DISPLAY";
}
/**
 * Typeguard checking whether input is an instance of {@link DataTooLargeToComputeSdkError};
 *
 * @public
 */
export function isDataTooLargeToCompute(obj) {
    return !isEmpty(obj) && obj.seType === "DATA_TOO_LARGE_TO_COMPUTE";
}
/**
 * Typeguard checking whether input is an instance of {@link NegativeValuesSdkError};
 *
 * @public
 */
export function isNegativeValues(obj) {
    return !isEmpty(obj) && obj.seType === "NEGATIVE_VALUES";
}
/**
 * Typeguard checking whether input is an instance of {@link NoDataSdkError};
 *
 * @public
 */
export function isNoDataSdkError(obj) {
    return !isEmpty(obj) && obj.seType === "NO_DATA";
}
/**
 * Typeguard checking whether input is an instance of {@link NotFoundSdkError};
 *
 * @public
 */
export function isNotFound(obj) {
    return !isEmpty(obj) && obj.seType === "NOT_FOUND";
}
/**
 * Typeguard checking whether input is an instance of {@link ProtectedReportSdkError};
 *
 * @public
 */
export function isProtectedReport(obj) {
    return !isEmpty(obj) && obj.seType === "PROTECTED_REPORT";
}
/**
 * Typeguard checking whether input is an instance of {@link UnexpectedSdkError};
 *
 * @public
 */
export function isUnknownSdkError(obj) {
    return !isEmpty(obj) && obj.seType === "UNKNOWN_ERROR";
}
/**
 * Typeguard checking whether input is an instance of {@link CancelledSdkError};
 *
 * @public
 */
export function isCancelledSdkError(obj) {
    return !isEmpty(obj) && obj.seType === "CANCELLED";
}
/**
 * Typeguard checking whether input is an instance of {@link DynamicScriptLoadSdkError};
 *
 * @public
 */
export function isDynamicScriptLoadSdkError(obj) {
    return !isEmpty(obj) && obj.seType === "DYNAMIC_SCRIPT_LOAD_ERROR";
}
//# sourceMappingURL=GoodDataSdkError.js.map