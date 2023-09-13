import { ObjRef } from "@gooddata/sdk-model";
import { DashboardSelector, DashboardState } from "../types.js";
import { IExecutionResultEnvelope } from "./types.js";
/**
 * @alpha
 */
export declare const selectExecutionResult: (state: DashboardState, id: import("@reduxjs/toolkit").EntityId) => IExecutionResultEnvelope | undefined;
/**
 * @alpha
 */
export declare const selectExecutionResultByRef: (ref: ObjRef) => DashboardSelector<IExecutionResultEnvelope | undefined>;
/**
 * @alpha
 */
export declare const selectIsExecutionResultReadyForExportByRef: (ref: ObjRef) => DashboardSelector<boolean>;
/**
 * @alpha
 */
export declare const selectIsExecutionResultExportableToCsvByRef: (ref: ObjRef) => DashboardSelector<boolean>;
/**
 * @alpha
 */
export declare const selectIsExecutionResultExportableToXlsxByRef: (ref: ObjRef) => DashboardSelector<boolean>;
