import { AuthenticationFlow } from "@gooddata/sdk-backend-spi";
/**
 * Error codes recognized by the SDK.
 *
 * @public
 */
export declare const ErrorCodes: {
    BAD_REQUEST: string;
    UNAUTHORIZED: string;
    GEO_LOCATION_MISSING: string;
    GEO_MAPBOX_TOKEN_MISSING: string;
    DATA_TOO_LARGE_TO_DISPLAY: string;
    DATA_TOO_LARGE_TO_COMPUTE: string;
    NEGATIVE_VALUES: string;
    NO_DATA: string;
    NOT_FOUND: string;
    PROTECTED_REPORT: string;
    UNKNOWN_ERROR: string;
    CANCELLED: string;
    DYNAMIC_SCRIPT_LOAD_ERROR: string;
    TIMEOUT_ERROR: string;
    VISUALIZATION_CLASS_UNKNOWN: string;
};
/**
 * @public
 */
export type SdkErrorType = keyof typeof ErrorCodes;
/**
 * Base class for all anticipated GoodData.UI SDK errors.
 *
 * @public
 */
export declare abstract class GoodDataSdkError extends Error {
    readonly seType: SdkErrorType;
    readonly cause?: any;
    protected constructor(seType: SdkErrorType, message?: string, cause?: any);
    /**
     * Provides description of the problem or one of {@link ErrorCodes}.
     */
    getMessage(): string;
    /**
     * Underlying cause of this error (if any).
     */
    getCause(): any | undefined;
    /**
     * Error code for this exception.
     *
     * @remarks
     * This can be used to identify exact type of exception.
     */
    getErrorCode(): string;
}
/**
 * This error means that server could not understand the request due to invalid syntax.
 *
 * @public
 */
export declare class BadRequestSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}
/**
 * This error means that you are not authorized.
 *
 * @public
 */
export declare class UnauthorizedSdkError extends GoodDataSdkError {
    authenticationFlow?: AuthenticationFlow;
    constructor(message?: string, cause?: Error);
}
/**
 * This error means that location bucket is missing
 *
 * @public
 */
export declare class GeoLocationMissingSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}
/**
 * This error means that mapbox token of GeoChart is missing
 *
 * @public
 */
export declare class GeoTokenMissingSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}
/**
 * This error means that executed data were too large to be displayed by GoodData.UI.
 *
 * @public
 */
export declare class DataTooLargeToDisplaySdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}
/**
 * This error means that processed request would generate a result too large to be processed
 * by GoodData platform.
 *
 * @public
 */
export declare class DataTooLargeToComputeSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}
/**
 * This error means that processed result contains negative values which does not make
 * sense within the given visualization (e.g. pie chart with negative values).
 *
 * @public
 */
export declare class NegativeValuesSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}
/**
 * This error means that the processed result does not contain any data.
 *
 * @public
 */
export declare class NoDataSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}
/**
 * This error means that requested entity (e.g. a visualization) was not found on the server.
 *
 * @public
 */
export declare class NotFoundSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}
/**
 * This error means that requested visualization is restricted by access rules within the GoodData platform.
 * Please contact your administrator.
 *
 * @public
 */
export declare class ProtectedReportSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}
/**
 * This error means that GoodData.UI does not know how to handle such error.
 *
 * @public
 */
export declare class UnexpectedSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}
/**
 * This error means that request has been cancelled usually after component has been unmounted.
 *
 * @public
 */
export declare class CancelledSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}
/**
 * This error means that loading of dynamic script/plugin failed.
 *
 * @public
 */
export declare class DynamicScriptLoadSdkError extends GoodDataSdkError {
    constructor(message?: string, cause?: Error);
}
/**
 * Typeguard checking whether input is an instance of {@link GoodDataSdkError};
 *
 * @public
 */
export declare function isGoodDataSdkError(obj: unknown): obj is GoodDataSdkError;
/**
 * Typeguard checking whether input is an instance of {@link BadRequestSdkError};
 *
 * @public
 */
export declare function isBadRequest(obj: unknown): obj is BadRequestSdkError;
/**
 * Typeguard checking whether input is an instance of {@link UnauthorizedSdkError};
 *
 * @public
 */
export declare function isUnauthorized(obj: unknown): obj is UnauthorizedSdkError;
/**
 * Typeguard checking whether input is an instance of {@link GeoLocationMissingSdkError};
 *
 * @public
 */
export declare function isGeoLocationMissing(obj: unknown): obj is GeoLocationMissingSdkError;
/**
 * Typeguard checking whether input is an instance of {@link GeoTokenMissingSdkError};
 *
 * @public
 */
export declare function isGeoTokenMissing(obj: unknown): obj is GeoTokenMissingSdkError;
/**
 * Typeguard checking whether input is an instance of {@link DataTooLargeToDisplaySdkError};
 *
 * @public
 */
export declare function isDataTooLargeToDisplay(obj: unknown): obj is DataTooLargeToDisplaySdkError;
/**
 * Typeguard checking whether input is an instance of {@link DataTooLargeToComputeSdkError};
 *
 * @public
 */
export declare function isDataTooLargeToCompute(obj: unknown): obj is DataTooLargeToComputeSdkError;
/**
 * Typeguard checking whether input is an instance of {@link NegativeValuesSdkError};
 *
 * @public
 */
export declare function isNegativeValues(obj: unknown): obj is NegativeValuesSdkError;
/**
 * Typeguard checking whether input is an instance of {@link NoDataSdkError};
 *
 * @public
 */
export declare function isNoDataSdkError(obj: unknown): obj is NoDataSdkError;
/**
 * Typeguard checking whether input is an instance of {@link NotFoundSdkError};
 *
 * @public
 */
export declare function isNotFound(obj: unknown): obj is NotFoundSdkError;
/**
 * Typeguard checking whether input is an instance of {@link ProtectedReportSdkError};
 *
 * @public
 */
export declare function isProtectedReport(obj: unknown): obj is ProtectedReportSdkError;
/**
 * Typeguard checking whether input is an instance of {@link UnexpectedSdkError};
 *
 * @public
 */
export declare function isUnknownSdkError(obj: unknown): obj is UnexpectedSdkError;
/**
 * Typeguard checking whether input is an instance of {@link CancelledSdkError};
 *
 * @public
 */
export declare function isCancelledSdkError(obj: unknown): obj is CancelledSdkError;
/**
 * Typeguard checking whether input is an instance of {@link DynamicScriptLoadSdkError};
 *
 * @public
 */
export declare function isDynamicScriptLoadSdkError(obj: unknown): obj is DynamicScriptLoadSdkError;
//# sourceMappingURL=GoodDataSdkError.d.ts.map