// (C) 2020-2023 GoodData Corporation
import isObject from "lodash/isObject.js";
/**
 * List of products using post events
 *
 * @public
 */
export var GdcProductName;
(function (GdcProductName) {
    /**
     * AD product name
     */
    GdcProductName["ANALYTICAL_DESIGNER"] = "analyticalDesigner";
    /**
     * KD product name
     */
    GdcProductName["KPI_DASHBOARD"] = "dashboard";
})(GdcProductName = GdcProductName || (GdcProductName = {}));
/**
 * Common event types in application
 *
 * @public
 */
export var GdcEventType;
(function (GdcEventType) {
    /**
     * Event to notify outer application that the command is invalid or have errors while processing
     */
    GdcEventType["AppCommandFailed"] = "appCommandFailed";
})(GdcEventType = GdcEventType || (GdcEventType = {}));
/**
 * Enumeration of possible types of error messages posted from the apps.
 *
 * @public
 */
export var GdcErrorType;
(function (GdcErrorType) {
    /**
     * The posted command is not recognized.
     */
    GdcErrorType["InvalidCommand"] = "error:invalidCommand";
    /**
     * Argument specified in the command body is invalid; it has failed the syntactical
     * or semantic validation.
     */
    GdcErrorType["InvalidArgument"] = "error:invalidArgument";
    /**
     * Command was posted when the app is not in a state to process the command. For instance:
     *
     * - trying to do save/save-as on new, empty insight
     * - trying to do save/save-as on insight that is in error
     * - trying to do undo when there is no step-back available
     * - trying to do redo when there is no step-forward available
     */
    GdcErrorType["InvalidState"] = "error:invalidState";
    /**
     * The Unexpected Happened.
     */
    GdcErrorType["RuntimeError"] = "error:runtime";
})(GdcErrorType = GdcErrorType || (GdcErrorType = {}));
/**
 * Type-guard checking whether an object is an instance of {@link CommandFailedData}
 *
 * @param obj - object to test
 * @public
 */
export function isCommandFailedData(obj) {
    return isObject(obj) && getEventType(obj) === GdcEventType.AppCommandFailed;
}
/**
 * Get event type of event from event data
 * @param obj - the event data object
 * @public
 */
export function getEventType(obj) {
    const { gdc: { event: { name = "" } = {} } = {} } = obj || {};
    return name;
}
//# sourceMappingURL=common.js.map