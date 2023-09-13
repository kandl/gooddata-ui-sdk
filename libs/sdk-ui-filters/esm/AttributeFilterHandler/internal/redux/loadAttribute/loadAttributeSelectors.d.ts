import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { IAttributeMetadataObject } from "@gooddata/sdk-model";
import { FilterSelector } from "../common/types.js";
import { AsyncOperationStatus } from "../../../types/index.js";
/**
 * @internal
 */
export declare const selectAttribute: FilterSelector<IAttributeMetadataObject>;
/**
 * @internal
 */
export declare const selectAttributeStatus: FilterSelector<AsyncOperationStatus>;
/**
 * @internal
 */
export declare const selectAttributeError: FilterSelector<GoodDataSdkError>;
