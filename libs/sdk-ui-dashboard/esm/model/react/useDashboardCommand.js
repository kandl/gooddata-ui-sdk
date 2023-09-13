// (C) 2020-2023 GoodData Corporation
import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useDashboardEventsContext } from "./DashboardEventsContext.js";
import { useDashboardDispatch } from "./DashboardStoreProvider.js";
/**
 * Hook that takes command creator and event handlers and returns function
 * that will result into dispatching this command, registering the event handlers,
 * and unregistering them once event type with the same type and correlation ID is triggered.
 *
 * @remarks
 * If no correlationId is provided, it's auto-generated.

 * @param commandCreator - command factory
 * @param eventHandlers - record with eventTypes as keys and relevant callbacks as values
 * @param onBeforeRun - provide callback that will be called before dispatching the command
 * @returns callback that dispatches the command, registers relevant event handlers and unregisters them
 *          when an event that matches the correlation ID and one of the specified event types occurs
 * @internal
 */
export const useDashboardCommand = (commandCreator, eventHandlers, onBeforeRun) => {
    const dispatch = useDashboardDispatch();
    const { registerHandler, unregisterHandler } = useDashboardEventsContext();
    return useCallback((...args) => {
        var _a;
        let command = commandCreator(...args);
        const correlationId = (_a = command.correlationId) !== null && _a !== void 0 ? _a : uuid();
        if (!command.correlationId) {
            command = Object.assign(Object.assign({}, command), { correlationId });
        }
        const dashboardEventHandlers = eventHandlers
            ? Object.keys(eventHandlers).map((eventType) => {
                const dashboardEventHandler = {
                    eval: (eT) => eT.type === eventType,
                    handler: (event) => {
                        if (event.correlationId === correlationId) {
                            unregisterHandlers();
                            eventHandlers[eventType](event);
                        }
                    },
                };
                return dashboardEventHandler;
            })
            : [];
        dashboardEventHandlers.forEach((handler) => {
            registerHandler(handler);
        });
        function unregisterHandlers() {
            dashboardEventHandlers.forEach((handler) => {
                unregisterHandler(handler);
            });
        }
        onBeforeRun === null || onBeforeRun === void 0 ? void 0 : onBeforeRun(command);
        dispatch(command);
    }, []);
};
//# sourceMappingURL=useDashboardCommand.js.map