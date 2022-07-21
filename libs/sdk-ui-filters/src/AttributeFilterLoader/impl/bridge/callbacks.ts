// (C) 2022 GoodData Corporation
import { IAttributeMetadataObject } from "@gooddata/sdk-model";
import {
    Callback,
    CallbackPayload,
    CallbackRegistration,
    Unsubscribe,
    IElementsLoadResult,
} from "../../types/common";
import { InvertableAttributeElementSelection } from "../../types";
import { actions } from "../../internal";
import { newCallbackHandler } from "../common";
import { AttributeFilterEventListener } from "../../internal/store/types";
import { selectInvertableCommittedSelection, selectInvertableWorkingSelection } from "./selectors";

const newCallbackRegistrations = () => {
    return {
        // Init
        initStart: newCallbackHandler(),
        initSuccess: newCallbackHandler(),
        initError: newCallbackHandler<{ error: Error }>(),
        initCancel: newCallbackHandler(),

        // Attribute
        loadAttributeStart: newCallbackHandler(),
        loadAttributeSuccess: newCallbackHandler<{ attribute: IAttributeMetadataObject }>(),
        loadAttributeError: newCallbackHandler<{ error: Error }>(),
        loadAttributeCancel: newCallbackHandler(),

        // Elements
        loadInitialElementsPageStart: newCallbackHandler(),
        loadInitialElementsPageSuccess: newCallbackHandler<IElementsLoadResult>(),
        loadInitialElementsPageError: newCallbackHandler<{ error: Error }>(),
        loadInitialElementsPageCancel: newCallbackHandler(),

        loadNextElementsPageStart: newCallbackHandler(),
        loadNextElementsPageSuccess: newCallbackHandler<IElementsLoadResult>(),
        loadNextElementsPageError: newCallbackHandler<{ error: Error }>(),
        loadNextElementsPageCancel: newCallbackHandler(),

        loadCustomElementsStart: newCallbackHandler(),
        loadCustomElementsSuccess: newCallbackHandler<IElementsLoadResult>(),
        loadCustomElementsError: newCallbackHandler<{ error: Error }>(),
        loadCustomElementsCancel: newCallbackHandler(),

        // Selection
        selectionChanged: newCallbackHandler<{ selection: InvertableAttributeElementSelection }>(),
        selectionCommitted: newCallbackHandler<{ selection: InvertableAttributeElementSelection }>(),
    };
};
const newCallbackRegistrationsWithGlobalUnsubscribe = () => {
    const registeredCallbacks: Unsubscribe[] = [];

    const registrations = newCallbackRegistrations();

    const registerCallback = <T extends object, TCallback extends Callback<T>>(
        cb: TCallback,
        registerFn: {
            invoke: (payload: CallbackPayload<T>) => void;
            subscribe: CallbackRegistration<T>;
        },
    ): Unsubscribe => {
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

/**
 * @internal
 */
export const newAttributeFilterCallbacks = () => {
    const { registerCallback, registrations, unsubscribeAll } =
        newCallbackRegistrationsWithGlobalUnsubscribe();

    const eventListener: AttributeFilterEventListener = (action, select) => {
        // Init

        if (actions.init.match(action)) {
            registrations.initStart.invoke({ correlation: action.payload.correlationId });
        } else if (actions.initSuccess.match(action)) {
            registrations.initSuccess.invoke({ correlation: action.payload.correlationId });
        } else if (actions.initError.match(action)) {
            registrations.initError.invoke({
                error: action.payload.error,
                correlation: action.payload.correlationId,
            });
        } else if (actions.initCancel.match(action)) {
            registrations.initCancel.invoke({ correlation: action.payload.correlationId });
        }

        // Attribute

        if (actions.loadAttributeRequest.match(action)) {
            registrations.loadAttributeStart.invoke({
                correlation: action.payload.correlationId,
            });
        } else if (actions.loadAttributeSuccess.match(action)) {
            registrations.loadAttributeSuccess.invoke({
                attribute: action.payload.attribute,
                correlation: action.payload.correlationId,
            });
        } else if (actions.loadAttributeError.match(action)) {
            registrations.loadAttributeError.invoke({
                error: action.payload.error,
                correlation: action.payload.correlationId,
            });
        } else if (actions.loadAttributeCancel.match(action)) {
            registrations.loadAttributeCancel.invoke({
                correlation: action.payload.correlationId,
            });
        }

        // Attribute Elements

        if (actions.loadInitialElementsPageRequest.match(action)) {
            registrations.loadInitialElementsPageStart.invoke({
                correlation: action.payload.correlationId,
            });
        } else if (actions.loadInitialElementsPageSuccess.match(action)) {
            registrations.loadInitialElementsPageSuccess.invoke({
                attributeElements: action.payload.attributeElements,
                limit: action.payload.limit,
                offset: action.payload.offset,
                totalCount: action.payload.totalCount,
                correlation: action.payload.correlationId,
            });
        } else if (actions.loadInitialElementsPageError.match(action)) {
            registrations.loadInitialElementsPageError.invoke({
                error: action.payload.error,
                correlation: action.payload.correlationId,
            });
        } else if (actions.loadInitialElementsPageCancel.match(action)) {
            registrations.loadInitialElementsPageCancel.invoke({
                correlation: action.payload.correlationId,
            });
        }

        if (actions.loadNextElementsPageRequest.match(action)) {
            registrations.loadNextElementsPageStart.invoke({
                correlation: action.payload.correlationId,
            });
        } else if (actions.loadNextElementsPageSuccess.match(action)) {
            registrations.loadNextElementsPageSuccess.invoke({
                attributeElements: action.payload.attributeElements,
                limit: action.payload.limit,
                offset: action.payload.offset,
                totalCount: action.payload.totalCount,
                correlation: action.payload.correlationId,
            });
        } else if (actions.loadNextElementsPageError.match(action)) {
            registrations.loadNextElementsPageError.invoke({
                error: action.payload.error,
                correlation: action.payload.correlationId,
            });
        } else if (actions.loadNextElementsPageCancel.match(action)) {
            registrations.loadNextElementsPageCancel.invoke({
                correlation: action.payload.correlationId,
            });
        }

        if (actions.loadCustomElementsRequest.match(action)) {
            registrations.loadCustomElementsStart.invoke({
                correlation: action.payload.correlationId,
            });
        } else if (actions.loadCustomElementsSuccess.match(action)) {
            registrations.loadCustomElementsSuccess.invoke({
                attributeElements: action.payload.attributeElements,
                limit: action.payload.limit,
                offset: action.payload.offset,
                totalCount: action.payload.totalCount,
                correlation: action.payload.correlationId,
            });
        } else if (actions.loadCustomElementsError.match(action)) {
            registrations.loadCustomElementsError.invoke({
                error: action.payload.error,
                correlation: action.payload.correlationId,
            });
        } else if (actions.loadCustomElementsCancel.match(action)) {
            registrations.loadCustomElementsCancel.invoke({
                correlation: action.payload.correlationId,
            });
        }

        // Selection

        if (
            [
                actions.changeSelection.match,
                actions.revertSelection.match,
                actions.invertSelection.match,
                actions.clearSelection.match,
            ].some((m) => m(action))
        ) {
            registrations.selectionChanged.invoke({
                selection: select(selectInvertableWorkingSelection),
            });
        }

        if (actions.commitSelection.match(action)) {
            registrations.selectionCommitted.invoke({
                selection: select(selectInvertableCommittedSelection),
            });
        }
    };

    return {
        registrations,
        registerCallback,
        unsubscribeAll,
        eventListener,
    };
};
