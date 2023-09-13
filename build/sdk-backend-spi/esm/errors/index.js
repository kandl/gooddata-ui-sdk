// (C) 2019-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Types of errors that can be raised by Analytical Backends.
 *
 * @public
 */
export const AnalyticalBackendErrorTypes = {
    NO_DATA: "ND",
    DATA_TOO_LARGE: "DTL",
    PROTECTED_DATA: "PD",
    UNEXPECTED_HTTP: "UH",
    UNEXPECTED: "UE",
    NOT_SUPPORTED: "NS",
    NOT_IMPLEMENTED: "NI!",
    NOT_AUTHENTICATED: "NAuth",
    LIMIT_REACHED: "LR",
    CONTRACT_EXPIRED: "CE",
    TIMEOUT_ERROR: "TE",
};
/**
 * Superclass for all exceptions that can occur in Analytical Backend.
 *
 * @public
 */
export class AnalyticalBackendError extends Error {
    constructor(message, abeType, cause) {
        super(message);
        this.abeType = abeType;
        this.cause = cause;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
/**
 * This exception MUST be thrown when the backend execution identifies that there is no data to
 * calculate.
 *
 * @public
 */
export class NoDataError extends AnalyticalBackendError {
    constructor(message, dataView, cause) {
        super(message, AnalyticalBackendErrorTypes.NO_DATA, cause);
        this.dataView = dataView;
    }
}
/**
 * This exception MUST be thrown when backend execution identifies that there is too much data
 * to process for the execution and refuses to proceed.
 *
 * @public
 */
export class DataTooLargeError extends AnalyticalBackendError {
    constructor(message, cause) {
        super(message, AnalyticalBackendErrorTypes.DATA_TOO_LARGE, cause);
    }
}
/**
 * This error means that during a repeated polling for some resource, we did not
 * reach 200 response within the certain number of attempts/time.
 *
 * @public
 */
export class TimeoutError extends AnalyticalBackendError {
    constructor(message, cause) {
        super(message, AnalyticalBackendErrorTypes.TIMEOUT_ERROR, cause);
    }
}
/**
 * This exception MUST be thrown when backend execution identifies that the data to calculate
 * results for is protected and the caller lacks the sufficient authorization.
 *
 * @public
 */
export class ProtectedDataError extends AnalyticalBackendError {
    constructor(message, cause) {
        super(message, AnalyticalBackendErrorTypes.PROTECTED_DATA, cause);
    }
}
/**
 * This exception MUST be thrown when communication with the backend encounters an unexpected
 * response status code and it cannot handle or categorize it to a known, domain-specific error.
 *
 * @public
 */
export class UnexpectedResponseError extends AnalyticalBackendError {
    constructor(message, httpStatus, responseBody, traceId, cause) {
        super(message, AnalyticalBackendErrorTypes.UNEXPECTED_HTTP, cause);
        this.httpStatus = httpStatus;
        this.responseBody = responseBody;
        this.traceId = traceId;
    }
}
/**
 * This exception MUST be thrown when the unexpected happens. This is a last-resort error type that SHOULD
 * be used if the erroneous state cannot be categorized in a better way.
 *
 * @public
 */
export class UnexpectedError extends AnalyticalBackendError {
    constructor(message, cause) {
        super(message, AnalyticalBackendErrorTypes.UNEXPECTED, cause);
    }
}
/**
 * This exception is thrown when client code asks Analytical Backend to exercise an unsupported feature.
 *
 * @public
 */
export class NotSupported extends AnalyticalBackendError {
    constructor(message) {
        super(message, AnalyticalBackendErrorTypes.NOT_SUPPORTED);
    }
}
/**
 * This exception is thrown when client code asks Analytical Backend to exercise a feature that is not
 * implemented yet.
 * @public
 */
export class NotImplemented extends AnalyticalBackendError {
    constructor(message) {
        super(message, AnalyticalBackendErrorTypes.NOT_IMPLEMENTED);
    }
}
/**
 * This exception is thrown when client code triggers an operation which requires authentication but the client
 * code did not provide credentials or the credentials are invalid.
 *
 * @public
 */
export class NotAuthenticated extends AnalyticalBackendError {
    constructor(message, cause, reason) {
        super(message, AnalyticalBackendErrorTypes.NOT_AUTHENTICATED, cause);
        this.reason = reason;
    }
}
/**
 * This exception is thrown when the limit of objects that can be created on backend is reached, for example
 * if no more workspaces can be created because of the plan limits.
 *
 * @public
 */
export class LimitReached extends AnalyticalBackendError {
    constructor(message, cause) {
        super(message, AnalyticalBackendErrorTypes.LIMIT_REACHED, cause);
    }
}
/**
 * This exception is thrown when a contract has expired, for example if a plan's trial period has ended
 *
 * @public
 */
export class ContractExpired extends AnalyticalBackendError {
    constructor(message, cause) {
        super(message, AnalyticalBackendErrorTypes.CONTRACT_EXPIRED, cause);
    }
}
/**
 * Type guard checking whether input is an instance of {@link AnalyticalBackendError}
 *
 * @public
 */
export function isAnalyticalBackendError(obj) {
    return !isEmpty(obj) && obj.abeType !== undefined;
}
/**
 * Type guard checking whether input is an instance of {@link NoDataError}
 *
 * @public
 */
export function isNoDataError(obj) {
    return isAnalyticalBackendError(obj) && obj.abeType === AnalyticalBackendErrorTypes.NO_DATA;
}
/**
 * Type guard checking whether input is an instance of {@link DataTooLargeError}
 *
 * @public
 */
export function isDataTooLargeError(obj) {
    return isAnalyticalBackendError(obj) && obj.abeType === AnalyticalBackendErrorTypes.DATA_TOO_LARGE;
}
/**
 * Type guard checking whether input is an instance of {@link ProtectedDataError}
 *
 * @public
 */
export function isProtectedDataError(obj) {
    return isAnalyticalBackendError(obj) && obj.abeType === AnalyticalBackendErrorTypes.PROTECTED_DATA;
}
/**
 * Type guard checking whether input is an instance of {@link UnexpectedResponseError}
 *
 * @public
 */
export function isUnexpectedResponseError(obj) {
    return isAnalyticalBackendError(obj) && obj.abeType === AnalyticalBackendErrorTypes.UNEXPECTED_HTTP;
}
/**
 * Type guard checking whether input is an instance of {@link UnexpectedResponseError}
 *
 * @public
 */
export function isUnexpectedError(obj) {
    return isAnalyticalBackendError(obj) && obj.abeType === AnalyticalBackendErrorTypes.UNEXPECTED;
}
/**
 * Type guard checking whether input is an instance of {@link NotSupported}
 *
 * @public
 */
export function isNotSupported(obj) {
    return isAnalyticalBackendError(obj) && obj.abeType === AnalyticalBackendErrorTypes.NOT_SUPPORTED;
}
/**
 * Type guard checking whether input is an instance of {@link NotImplemented}
 *
 * @public
 */
export function isNotImplemented(obj) {
    return isAnalyticalBackendError(obj) && obj.abeType === AnalyticalBackendErrorTypes.NOT_IMPLEMENTED;
}
/**
 * Type guard checking whether input is an instance of {@link NotAuthenticated}
 *
 * @public
 */
export function isNotAuthenticated(obj) {
    return isAnalyticalBackendError(obj) && obj.abeType === AnalyticalBackendErrorTypes.NOT_AUTHENTICATED;
}
/**
 * Type guard checking whether input is an instance of {@link LimitReached}
 *
 * @public
 */
export function isLimitReached(obj) {
    return isAnalyticalBackendError(obj) && obj.abeType === AnalyticalBackendErrorTypes.LIMIT_REACHED;
}
/**
 * Type guard checking whether input is an instance of {@link ContractExpired}
 *
 * @public
 */
export function isContractExpired(obj) {
    return isAnalyticalBackendError(obj) && obj.abeType === AnalyticalBackendErrorTypes.CONTRACT_EXPIRED;
}
//# sourceMappingURL=index.js.map