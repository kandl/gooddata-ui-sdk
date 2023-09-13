import { isDashboardEvent, isDashboardCommandFailed, isDashboardCommandStarted, } from "../events/index.js";
/**
 * Creates a {@link DashboardEventHandler} instance that will be invoked for any event (event for custom events).
 *
 * @param handler - the actual event handling function
 * @public
 */
export function anyEventHandler(handler) {
    return {
        eval: () => true,
        handler,
    };
}
/**
 * Creates a {@link DashboardEventHandler} instance that will be invoked for any dashboard event (i.e. not for custom events).
 *
 * @param handler - the actual event handling function
 * @public
 */
export function anyDashboardEventHandler(handler) {
    return {
        eval: isDashboardEvent,
        handler,
    };
}
/**
 * Creates a {@link DashboardEventHandler} instance that will be invoked for one specified event type.
 *
 * @param type - the type of event this handler should trigger for
 * @param handler - the actual event handling function
 * @public
 */
export function singleEventTypeHandler(type, handler) {
    return {
        eval: (e) => e.type === type,
        handler,
    };
}
/**
 * Creates a {@link DashboardEventHandler} instance that will be invoked for a DashboardCommandStarted of a particular command.
 *
 * @param type - the type of command the DashboardCommandStarted of which this handler should trigger for
 * @param handler - the actual event handling function
 * @alpha
 */
export function commandStartedEventHandler(type, handler) {
    return {
        eval: (e) => isDashboardCommandStarted(e) && e.payload.command.type === type,
        handler,
    };
}
/**
 * Creates a {@link DashboardEventHandler} instance that will be invoked for a DashboardCommandFailed of a particular command.
 *
 * @param type - the type of command the DashboardCommandFailed of which this handler should trigger for
 * @param handler - the actual event handling function
 * @alpha
 */
export function commandFailedEventHandler(type, handler) {
    return {
        eval: (e) => isDashboardCommandFailed(e) && e.payload.command.type === type,
        handler,
    };
}
//# sourceMappingURL=eventHandler.js.map