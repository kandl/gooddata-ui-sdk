import { IDataView } from "../workspace/execution/index.js";
/**
 * Types of errors that can be raised by Analytical Backends.
 *
 * @public
 */
export declare const AnalyticalBackendErrorTypes: {
    NO_DATA: string;
    DATA_TOO_LARGE: string;
    PROTECTED_DATA: string;
    UNEXPECTED_HTTP: string;
    UNEXPECTED: string;
    NOT_SUPPORTED: string;
    NOT_IMPLEMENTED: string;
    NOT_AUTHENTICATED: string;
    LIMIT_REACHED: string;
    CONTRACT_EXPIRED: string;
    TIMEOUT_ERROR: string;
};
/**
 * Superclass for all exceptions that can occur in Analytical Backend.
 *
 * @public
 */
export declare abstract class AnalyticalBackendError extends Error {
    readonly abeType: string;
    readonly cause?: Error | undefined;
    protected constructor(message: string, abeType: string, cause?: Error | undefined);
}
/**
 * This exception MUST be thrown when the backend execution identifies that there is no data to
 * calculate.
 *
 * @public
 */
export declare class NoDataError extends AnalyticalBackendError {
    /**
     * Empty data view MAY be included by the backend in case execution metadata and data view metadata is present.
     */
    readonly dataView?: IDataView;
    constructor(message: string, dataView?: IDataView, cause?: Error);
}
/**
 * This exception MUST be thrown when backend execution identifies that there is too much data
 * to process for the execution and refuses to proceed.
 *
 * @public
 */
export declare class DataTooLargeError extends AnalyticalBackendError {
    constructor(message: string, cause?: Error);
}
/**
 * This error means that during a repeated polling for some resource, we did not
 * reach 200 response within the certain number of attempts/time.
 *
 * @public
 */
export declare class TimeoutError extends AnalyticalBackendError {
    constructor(message: string, cause?: Error);
}
/**
 * This exception MUST be thrown when backend execution identifies that the data to calculate
 * results for is protected and the caller lacks the sufficient authorization.
 *
 * @public
 */
export declare class ProtectedDataError extends AnalyticalBackendError {
    constructor(message: string, cause?: Error);
}
/**
 * This exception MUST be thrown when communication with the backend encounters an unexpected
 * response status code and it cannot handle or categorize it to a known, domain-specific error.
 *
 * @public
 */
export declare class UnexpectedResponseError extends AnalyticalBackendError {
    readonly httpStatus: number;
    readonly responseBody: unknown;
    readonly traceId: string | undefined;
    constructor(message: string, httpStatus: number, responseBody: unknown, traceId?: string, cause?: Error);
}
/**
 * This exception MUST be thrown when the unexpected happens. This is a last-resort error type that SHOULD
 * be used if the erroneous state cannot be categorized in a better way.
 *
 * @public
 */
export declare class UnexpectedError extends AnalyticalBackendError {
    constructor(message: string, cause?: Error);
}
/**
 * This exception is thrown when client code asks Analytical Backend to exercise an unsupported feature.
 *
 * @public
 */
export declare class NotSupported extends AnalyticalBackendError {
    constructor(message: string);
}
/**
 * This exception is thrown when client code asks Analytical Backend to exercise a feature that is not
 * implemented yet.
 * @public
 */
export declare class NotImplemented extends AnalyticalBackendError {
    constructor(message: string);
}
/**
 * Implementation of different backends MAY indicate through this structure where to redirect the browser
 * in order to start authentication flow.
 *
 * @remarks
 * The `returnRedirectParam` is the name of the query parameter that the application should set when redirecting.
 * The value of the query parameter is the return URL where the browser should return after successful authentication.
 *
 * @public
 */
export type AuthenticationFlow = {
    loginUrl: string;
    returnRedirectParam: string;
};
/**
 * More detailed reason of the NotAuthenticated error.
 *
 * @remarks
 * - invalid_credentials - the provided credentials were invalid
 * - credentials_expired - the credentials' validity expired
 *
 * @public
 */
export type NotAuthenticatedReason = "invalid_credentials" | "credentials_expired";
/**
 * This exception is thrown when client code triggers an operation which requires authentication but the client
 * code did not provide credentials or the credentials are invalid.
 *
 * @public
 */
export declare class NotAuthenticated extends AnalyticalBackendError {
    authenticationFlow?: AuthenticationFlow;
    /**
     * More detailed reason of the NotAuthenticated error. See {@link NotAuthenticatedReason} for more information.
     *
     * @remarks
     * MAY be undefined if the particular backend implementation does not provide this value.
     */
    reason?: NotAuthenticatedReason;
    constructor(message: string, cause?: Error, reason?: NotAuthenticatedReason);
}
/**
 * This exception is thrown when the limit of objects that can be created on backend is reached, for example
 * if no more workspaces can be created because of the plan limits.
 *
 * @public
 */
export declare class LimitReached extends AnalyticalBackendError {
    constructor(message: string, cause?: Error);
}
/**
 * This exception is thrown when a contract has expired, for example if a plan's trial period has ended
 *
 * @public
 */
export declare class ContractExpired extends AnalyticalBackendError {
    constructor(message: string, cause?: Error);
}
/**
 * Error converter
 *
 * @public
 */
export type ErrorConverter = (e: Error) => AnalyticalBackendError;
/**
 * Type guard checking whether input is an instance of {@link AnalyticalBackendError}
 *
 * @public
 */
export declare function isAnalyticalBackendError(obj: unknown): obj is AnalyticalBackendError;
/**
 * Type guard checking whether input is an instance of {@link NoDataError}
 *
 * @public
 */
export declare function isNoDataError(obj: unknown): obj is NoDataError;
/**
 * Type guard checking whether input is an instance of {@link DataTooLargeError}
 *
 * @public
 */
export declare function isDataTooLargeError(obj: unknown): obj is DataTooLargeError;
/**
 * Type guard checking whether input is an instance of {@link ProtectedDataError}
 *
 * @public
 */
export declare function isProtectedDataError(obj: unknown): obj is ProtectedDataError;
/**
 * Type guard checking whether input is an instance of {@link UnexpectedResponseError}
 *
 * @public
 */
export declare function isUnexpectedResponseError(obj: unknown): obj is UnexpectedResponseError;
/**
 * Type guard checking whether input is an instance of {@link UnexpectedResponseError}
 *
 * @public
 */
export declare function isUnexpectedError(obj: unknown): obj is UnexpectedError;
/**
 * Type guard checking whether input is an instance of {@link NotSupported}
 *
 * @public
 */
export declare function isNotSupported(obj: unknown): obj is NotSupported;
/**
 * Type guard checking whether input is an instance of {@link NotImplemented}
 *
 * @public
 */
export declare function isNotImplemented(obj: unknown): obj is NotImplemented;
/**
 * Type guard checking whether input is an instance of {@link NotAuthenticated}
 *
 * @public
 */
export declare function isNotAuthenticated(obj: unknown): obj is NotAuthenticated;
/**
 * Type guard checking whether input is an instance of {@link LimitReached}
 *
 * @public
 */
export declare function isLimitReached(obj: unknown): obj is LimitReached;
/**
 * Type guard checking whether input is an instance of {@link ContractExpired}
 *
 * @public
 */
export declare function isContractExpired(obj: unknown): obj is ContractExpired;
//# sourceMappingURL=index.d.ts.map