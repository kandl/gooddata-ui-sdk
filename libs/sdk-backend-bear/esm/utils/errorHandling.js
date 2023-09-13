import { DataTooLargeError, NoDataError, NotAuthenticated, ProtectedDataError, UnexpectedError, UnexpectedResponseError, isAnalyticalBackendError, } from "@gooddata/sdk-backend-spi";
import includes from "lodash/includes.js";
import isString from "lodash/isString.js";
import { StatusCodes as HttpStatusCodes } from "http-status-codes";
export function isApiResponseError(error) {
    return error.response !== undefined;
}
function getJSONFromText(data) {
    try {
        return JSON.parse(data);
    }
    catch (e) {
        return null;
    }
}
function isComplainingAboutAuthorization(error) {
    // execution on protected data will actually return with 400 + with error messaging talking about this
    var _a, _b, _c;
    if (error.response.status !== HttpStatusCodes.BAD_REQUEST) {
        return false;
    }
    const message = (_c = (_b = (_a = getJSONFromText(error.responseBody)) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : "";
    return (includes(message, "Attempt to execute protected report unsafely") ||
        includes(message, "Export to required format is not allowed for data flagged as restricted"));
}
function getTraceId(error) {
    var _a, _b, _c, _d;
    return ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.get) ? (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.headers) === null || _d === void 0 ? void 0 : _d.get("x-gdc-request") : null;
}
export function convertExecutionApiError(error) {
    if (isApiResponseError(error)) {
        if (error.response.status === HttpStatusCodes.NO_CONTENT) {
            return new NoDataError("Server returned no data");
        }
        else if (error.response.status === HttpStatusCodes.REQUEST_TOO_LONG) {
            return new DataTooLargeError("Server has reached data size limits when processing this request", error);
        }
        else if (isComplainingAboutAuthorization(error)) {
            return new ProtectedDataError("Request not authorized", error);
        }
    }
    return convertApiError(error);
}
export function convertApiError(error) {
    if (isAnalyticalBackendError(error)) {
        return error;
    }
    if (isApiResponseError(error)) {
        if (error.response.status === HttpStatusCodes.UNAUTHORIZED) {
            // detect expired passwords using the specific exception code from the backend
            // use responseBody directly (instead of response.json) in case the stream has already been used
            // at this point (which would bomb)
            const reason = isString(error.responseBody) && includes(error.responseBody, "gdc.login.password.expired")
                ? "credentials_expired"
                : "invalid_credentials";
            return new NotAuthenticated("Not authenticated against backend", error, reason);
        }
        else if (isComplainingAboutAuthorization(error)) {
            return new ProtectedDataError("Request not authorized", error);
        }
        return new UnexpectedResponseError(error.message, error.response.status, error.responseBody, getTraceId(error), error);
    }
    return new UnexpectedError("An unexpected error has occurred", error);
}
//# sourceMappingURL=errorHandling.js.map