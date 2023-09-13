import isEmpty from "lodash/isEmpty";
import { ErrorCodes, GoodDataSdkError, } from "@gooddata/sdk-ui";
export const DATE_DATASET_ATTRIBUTE = "attr.datedataset";
/**
 * Class name of element where pluggable visualization is supposed to render its configuration
 * panels.
 *
 * @alpha
 */
export const ConfigPanelClassName = "gd-configuration-panel-content";
/**
 * @alpha
 */
export const PluggableVisualizationErrorCodes = {
    /**
     * If pluggable visualization is asked to render itself but its buckets do not contain the right 'stuff',
     * then this is the error code to communicate the fact.
     */
    INVALID_BUCKETS: "INVALID_BUCKETS",
    /**
     * This error means that empty AFM was went to the GoodData.UI and as such can't be executed.
     */
    EMPTY_AFM: "EMPTY_AFM",
};
/**
 * @alpha
 */
export class InvalidBucketsSdkError extends GoodDataSdkError {
    constructor(cause) {
        super(ErrorCodes.UNKNOWN_ERROR, undefined, cause);
        this.pveType = "INVALID_BUCKETS";
    }
    getErrorCode() {
        return this.pveType;
    }
}
/**
 * @alpha
 */
export class EmptyAfmSdkError extends GoodDataSdkError {
    constructor(cause) {
        super(ErrorCodes.UNKNOWN_ERROR, undefined, cause);
        this.pveType = "EMPTY_AFM";
    }
    getErrorCode() {
        return this.pveType;
    }
}
/**
 * @alpha
 */
export function isPluggableVisualizationError(obj) {
    return !isEmpty(obj) && obj.pveType !== undefined;
}
/**
 * @alpha
 */
export function isInvalidBuckets(obj) {
    return !isEmpty(obj) && obj.pveType === "INVALID_BUCKETS";
}
/**
 * @alpha
 */
export function isEmptyAfm(obj) {
    return !isEmpty(obj) && obj.pveType === "EMPTY_AFM";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillDownDefinition}.
 * @beta
 */
export function isDrillDownDefinition(obj) {
    return !isEmpty(obj) && obj.type === "drillDown";
}
//# sourceMappingURL=Visualization.js.map