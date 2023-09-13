import { IDashboardLoadOptions } from "./types.js";
import { UseCancelablePromiseState } from "@gooddata/sdk-ui";
import { DashboardLoadResult } from "./loader.js";
/**
 * Returned by the `useDashboardLoader` to communicate the status of dashboard loading.
 *
 * @public
 */
export type DashboardLoadStatus = UseCancelablePromiseState<DashboardLoadResult, any>;
/**
 * This hook encapsulates load, bootstrap and teardown of a dashboard enhanced by plugins.
 *
 * @remarks
 * It is a one-stop hook to use for React embedding of a Dashboard and when building new dashboard plugins.
 *
 * See {@link IDashboardLoadOptions.loadingMode} to learn about loading modes
 *
 * @param options - load options
 * @public
 */
export declare function useDashboardLoader(options: IDashboardLoadOptions): DashboardLoadStatus;
