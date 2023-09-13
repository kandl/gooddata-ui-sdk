// (C) 2019-2022 GoodData Corporation
import { isAnalyticalBackendError, NotAuthenticated, UnexpectedError, LimitReached, ContractExpired, UnexpectedResponseError, } from "@gooddata/sdk-backend-spi";
export function convertApiError(error) {
    if (isAnalyticalBackendError(error)) {
        return error;
    }
    const notAuthenticated = createNotAuthenticatedError(error);
    if (notAuthenticated) {
        throw notAuthenticated;
    }
    const limitReached = createLimitReachedError(error);
    if (limitReached) {
        throw limitReached;
    }
    const contractExpired = createContractExpiredError(error);
    if (contractExpired) {
        return contractExpired;
    }
    const unexpectedResponseError = createUnexpectedResponseError(error);
    if (unexpectedResponseError) {
        return unexpectedResponseError;
    }
    return new UnexpectedError("An unexpected error has occurred", error);
}
export function createNotAuthenticatedError(error) {
    const axiosErrorResponse = error.response;
    if (!axiosErrorResponse || axiosErrorResponse.status !== 401) {
        return;
    }
    const exc = new NotAuthenticated("No session or session expired", error);
    // TODO: TIGER-HACK both of these params need to come from the backend.
    //  current problems:
    //  - some resources do not send login URL (empty 401), some do
    //  - no resources send returnRedirectParam
    exc.authenticationFlow = {
        loginUrl: "/appLogin",
        returnRedirectParam: "redirectTo",
    };
    return exc;
}
function createLimitReachedError(error) {
    var _a, _b;
    const axiosErrorResponse = error.response;
    if (!axiosErrorResponse ||
        axiosErrorResponse.status !== 400 ||
        !((_b = (_a = axiosErrorResponse.data) === null || _a === void 0 ? void 0 : _a.detail) === null || _b === void 0 ? void 0 : _b.includes("Reached plan limits"))) {
        return;
    }
    return new LimitReached("The limit reached. Upgrade your plan to create more objects.", error);
}
function createContractExpiredError(error) {
    var _a, _b, _c, _d;
    const axiosErrorResponse = error.response;
    if (!axiosErrorResponse ||
        axiosErrorResponse.status !== 403 ||
        (!((_b = (_a = axiosErrorResponse.data) === null || _a === void 0 ? void 0 : _a.detail) === null || _b === void 0 ? void 0 : _b.includes("Contract expired")) &&
            !((_d = (_c = axiosErrorResponse.data) === null || _c === void 0 ? void 0 : _c.detail) === null || _d === void 0 ? void 0 : _d.includes("Reason: EXPIRED")))) {
        return;
    }
    return new ContractExpired(axiosErrorResponse.data.tier || "unspecified", error);
}
function createUnexpectedResponseError(error) {
    const axiosErrorResponse = error.response;
    if (!axiosErrorResponse) {
        return;
    }
    return new UnexpectedResponseError(error.message, axiosErrorResponse.status, axiosErrorResponse.data, getTraceId(axiosErrorResponse), error);
}
function getTraceId(axiosErrorResponse) {
    return axiosErrorResponse.headers ? axiosErrorResponse.headers["x-gdc-trace-id"] : null;
}
//# sourceMappingURL=errorHandling.js.map