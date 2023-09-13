// (C) 2019-2023 GoodData Corporation
/**
 * This package provides definitions of the Service Provider Interface (SPI) for the Analytical Backend.
 *
 * @remarks
 * The interface defines functionality to be implemented for a particular backend to be used in GoodData.UI.
 * The Analytical Backend SPI for the GoodData platform (codename `bear` in `@gooddata/sdk-backend-bear`) is fully implemented.
 * The Analytical Backend SPI for GoodData Cloud and GoodData.CN (joint codename `tiger` in `@gooddata/sdk-backend-tiger`) is almost fully implemented.
 *
 * @packageDocumentation
 */
export { prepareExecution, } from "./backend/index.js";
export { isElementsQueryOptionsElementsByValue, isElementsQueryOptionsElementsByPrimaryDisplayFormValue, isValueBasedElementsQueryOptionsElements, } from "./workspace/attributes/elements/index.js";
export { AnalyticalBackendError, NoDataError, DataTooLargeError, TimeoutError, ProtectedDataError, UnexpectedResponseError, UnexpectedError, NotSupported, NotImplemented, NotAuthenticated, LimitReached, ContractExpired, isAnalyticalBackendError, isNoDataError, isDataTooLargeError, isProtectedDataError, isUnexpectedResponseError, isUnexpectedError, isNotSupported, isNotImplemented, isNotAuthenticated, isLimitReached, isContractExpired, AnalyticalBackendErrorTypes, } from "./errors/index.js";
export { isDashboardLayoutEmpty, layoutWidgets, layoutWidgetsWithPaths, walkLayout, } from "./workspace/dashboards/utils.js";
//# sourceMappingURL=index.js.map