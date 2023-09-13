/**
 * Returns true if the provided error should prevent exports.
 *
 * @remarks Some errors are still ok with respect to exports (e.g. negative values in a pie chart) and these
 * should not prevent exports. However, errors detected by this function really make potential exports
 * nonsensical and should lead to exports being disabled.
 *
 * @internal
 */
export declare const isNonExportableError: (x: unknown) => x is import("@gooddata/sdk-ui").BadRequestSdkError | import("@gooddata/sdk-ui").DataTooLargeToComputeSdkError | import("@gooddata/sdk-ui").NoDataSdkError | import("@gooddata/sdk-ui").ProtectedReportSdkError | import("@gooddata/sdk-ui").UnexpectedSdkError | import("@gooddata/sdk-ui-ext").EmptyAfmSdkError;
/**
 * @internal
 */
export declare const isDataError: (x: unknown) => x is import("@gooddata/sdk-ui").BadRequestSdkError | import("@gooddata/sdk-ui").DataTooLargeToDisplaySdkError | import("@gooddata/sdk-ui").DataTooLargeToComputeSdkError | import("@gooddata/sdk-ui").NegativeValuesSdkError | import("@gooddata/sdk-ui").NoDataSdkError | import("@gooddata/sdk-ui").ProtectedReportSdkError | import("@gooddata/sdk-ui").UnexpectedSdkError | import("@gooddata/sdk-ui-ext").EmptyAfmSdkError;
