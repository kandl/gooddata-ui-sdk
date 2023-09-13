// (C) 2022 GoodData Corporation
import { actions, selectInvertableCommittedSelection, selectInvertableWorkingSelection, } from "./redux/index.js";
const newCallbackRegistrations = () => {
    return {
        // Init
        initStart: newCallbackHandler(),
        initSuccess: newCallbackHandler(),
        initError: newCallbackHandler(),
        initCancel: newCallbackHandler(),
        // InitTotalCount
        initTotalCountStart: newCallbackHandler(),
        initTotalCountSuccess: newCallbackHandler(),
        initTotalCountError: newCallbackHandler(),
        initTotalCountCancel: newCallbackHandler(),
        // Attribute
        loadAttributeStart: newCallbackHandler(),
        loadAttributeSuccess: newCallbackHandler(),
        loadAttributeError: newCallbackHandler(),
        loadAttributeCancel: newCallbackHandler(),
        // Initial elements page
        loadInitialElementsPageStart: newCallbackHandler(),
        loadInitialElementsPageSuccess: newCallbackHandler(),
        loadInitialElementsPageError: newCallbackHandler(),
        loadInitialElementsPageCancel: newCallbackHandler(),
        // Next elements page
        loadNextElementsPageStart: newCallbackHandler(),
        loadNextElementsPageSuccess: newCallbackHandler(),
        loadNextElementsPageError: newCallbackHandler(),
        loadNextElementsPageCancel: newCallbackHandler(),
        // Custom elements
        loadCustomElementsStart: newCallbackHandler(),
        loadCustomElementsSuccess: newCallbackHandler(),
        loadCustomElementsError: newCallbackHandler(),
        loadCustomElementsCancel: newCallbackHandler(),
        // Selection
        selectionChanged: newCallbackHandler(),
        selectionCommitted: newCallbackHandler(),
        update: newCallbackHandler(),
    };
};
const newCallbackRegistrationsWithGlobalUnsubscribe = () => {
    const registeredCallbacks = [];
    const registrations = newCallbackRegistrations();
    const registerCallback = (cb, registerFn) => {
        const registeredCallback = registerFn.subscribe(cb);
        registeredCallbacks.push(registeredCallback);
        return registeredCallback;
    };
    const unsubscribeAll = () => {
        registeredCallbacks.forEach((unsubscribe) => {
            unsubscribe();
        });
    };
    return {
        registrations,
        registerCallback,
        unsubscribeAll,
    };
};
function logError(activity, error) {
    const cause = error.getCause();
    const formattedCause = cause ? `\nInner error: ${cause}` : "";
    console.error(`Error while ${activity}: ${error.getMessage()}${formattedCause}`);
}
/**
 * @internal
 */
export const newAttributeFilterCallbacks = () => {
    const { registerCallback, registrations, unsubscribeAll } = newCallbackRegistrationsWithGlobalUnsubscribe();
    const eventListener = (action, select) => {
        // Init
        if (actions.initStart.match(action)) {
            registrations.initStart.invoke(action.payload);
        }
        else if (actions.initSuccess.match(action)) {
            registrations.initSuccess.invoke(action.payload);
        }
        else if (actions.initError.match(action)) {
            logError("initializing", action.payload.error);
            registrations.initError.invoke(action.payload);
        }
        else if (actions.initCancel.match(action)) {
            registrations.initCancel.invoke(action.payload);
        }
        // InitTotalCount
        if (actions.initTotalCountStart.match(action)) {
            registrations.initTotalCountStart.invoke(action.payload);
        }
        else if (actions.initTotalCountSuccess.match(action)) {
            registrations.initTotalCountSuccess.invoke(action.payload);
        }
        else if (actions.initTotalCountError.match(action)) {
            logError("initializing total count", action.payload.error);
            registrations.initTotalCountError.invoke(action.payload);
        }
        else if (actions.initTotalCountCancel.match(action)) {
            registrations.initTotalCountCancel.invoke(action.payload);
        }
        // Attribute
        if (actions.loadAttributeStart.match(action)) {
            registrations.loadAttributeStart.invoke(action.payload);
        }
        else if (actions.loadAttributeSuccess.match(action)) {
            registrations.loadAttributeSuccess.invoke(action.payload);
        }
        else if (actions.loadAttributeError.match(action)) {
            logError("loading attribute", action.payload.error);
            registrations.loadAttributeError.invoke(action.payload);
        }
        else if (actions.loadAttributeCancel.match(action)) {
            registrations.loadAttributeCancel.invoke(action.payload);
        }
        // Initial elements page
        if (actions.loadInitialElementsPageStart.match(action)) {
            registrations.loadInitialElementsPageStart.invoke(action.payload);
        }
        else if (actions.loadInitialElementsPageSuccess.match(action)) {
            registrations.loadInitialElementsPageSuccess.invoke(action.payload);
        }
        else if (actions.loadInitialElementsPageError.match(action)) {
            logError("loading initial elements page", action.payload.error);
            registrations.loadInitialElementsPageError.invoke(action.payload);
        }
        else if (actions.loadInitialElementsPageCancel.match(action)) {
            registrations.loadInitialElementsPageCancel.invoke(action.payload);
        }
        // Next elements page
        if (actions.loadNextElementsPageStart.match(action)) {
            registrations.loadNextElementsPageStart.invoke(action.payload);
        }
        else if (actions.loadNextElementsPageSuccess.match(action)) {
            registrations.loadNextElementsPageSuccess.invoke(action.payload);
        }
        else if (actions.loadNextElementsPageError.match(action)) {
            logError("loading next elements page", action.payload.error);
            registrations.loadNextElementsPageError.invoke(action.payload);
        }
        else if (actions.loadNextElementsPageCancel.match(action)) {
            registrations.loadNextElementsPageCancel.invoke(action.payload);
        }
        // Custom elements
        if (actions.loadCustomElementsStart.match(action)) {
            registrations.loadCustomElementsStart.invoke(action.payload);
        }
        else if (actions.loadCustomElementsSuccess.match(action)) {
            registrations.loadCustomElementsSuccess.invoke(action.payload);
        }
        else if (actions.loadCustomElementsError.match(action)) {
            logError("loading custom elements", action.payload.error);
            registrations.loadCustomElementsError.invoke(action.payload);
        }
        else if (actions.loadCustomElementsCancel.match(action)) {
            registrations.loadCustomElementsCancel.invoke(action.payload);
        }
        // Selection
        if ([
            actions.changeSelection.match,
            actions.revertSelection.match,
            actions.invertSelection.match,
            actions.clearSelection.match,
        ].some((m) => m(action))) {
            registrations.selectionChanged.invoke({
                selection: select(selectInvertableWorkingSelection),
            });
        }
        if (actions.commitSelection.match(action)) {
            registrations.selectionCommitted.invoke({
                selection: select(selectInvertableCommittedSelection),
            });
        }
        if ([
            actions.initStart.match,
            actions.initSuccess.match,
            actions.initError.match,
            actions.initCancel.match,
            actions.loadAttributeStart.match,
            actions.loadAttributeSuccess.match,
            actions.loadAttributeError.match,
            actions.loadAttributeCancel.match,
            actions.loadInitialElementsPageStart.match,
            actions.loadInitialElementsPageSuccess.match,
            actions.loadInitialElementsPageError.match,
            actions.loadInitialElementsPageCancel.match,
            actions.loadNextElementsPageStart.match,
            actions.loadNextElementsPageSuccess.match,
            actions.loadNextElementsPageError.match,
            actions.loadNextElementsPageCancel.match,
            actions.changeSelection.match,
            actions.revertSelection.match,
            actions.invertSelection.match,
            actions.clearSelection.match,
            actions.commitSelection.match,
            actions.setLimit.match,
            actions.setOrder.match,
            actions.setSearch.match,
            actions.setLimitingMeasures.match,
            actions.setLimitingAttributeFilters.match,
            actions.setLimitingDateFilters.match,
        ].some((m) => m(action))) {
            registrations.update.invoke();
        }
    };
    return {
        registrations,
        registerCallback,
        unsubscribeAll,
        eventListener,
    };
};
/**
 * @internal
 */
function newCallbackHandler() {
    let subscribers = [];
    const subscribe = (cb) => {
        subscribers.push(cb);
        return function unsubscribe() {
            subscribers = subscribers.filter((i) => i != cb);
        };
    };
    const invoke = (payload) => {
        subscribers.forEach((cb) => cb(payload));
    };
    return {
        invoke,
        subscribe,
    };
}
//# sourceMappingURL=callbacks.js.map