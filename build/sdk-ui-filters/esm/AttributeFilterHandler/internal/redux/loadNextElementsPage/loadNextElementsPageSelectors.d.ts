import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { AsyncOperationStatus, ILoadElementsOptions } from "../../../types/index.js";
import { FilterSelector } from "../common/types.js";
/**
 * @internal
 */
export declare const selectLoadNextElementsPageStatus: FilterSelector<AsyncOperationStatus>;
/**
 * @internal
 */
export declare const selectLoadNextElementsPageError: FilterSelector<GoodDataSdkError>;
/**
 * @internal
 */
export declare const selectLoadNextElementsPageOptions: FilterSelector<ILoadElementsOptions>;
/**
 * @internal
 */
export declare const selectHasNextPage: FilterSelector<boolean>;
/**
 * @internal
 */
export declare const selectIsLoadElementsOptionsChanged: FilterSelector<boolean>;
