import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { FilterSelector } from "../common/types.js";
import { AsyncOperationStatus } from "../../../types/index.js";
/**
 * @internal
 */
export declare const selectInitStatus: FilterSelector<AsyncOperationStatus>;
/**
 * @internal
 */
export declare const selectInitError: FilterSelector<GoodDataSdkError>;
