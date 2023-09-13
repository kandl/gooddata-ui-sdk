import { AttributeFilterHandlerEventListener } from "./redux/index.js";
import { Callback, CallbackRegistration, Unsubscribe, InvertableAttributeElementSelection, OnInitErrorCallbackPayload, OnLoadAttributeSuccessCallbackPayload, OnLoadAttributeErrorCallbackPayload, OnLoadInitialElementsPageSuccessCallbackPayload, OnLoadInitialElementsPageErrorCallbackPayload, OnLoadNextElementsPageSuccessCallbackPayload, OnLoadNextElementsPageErrorCallbackPayload, OnLoadCustomElementsSuccessCallbackPayload, OnLoadCustomElementsErrorCallbackPayload, OnSelectionChangedCallbackPayload, OnSelectionCommittedCallbackPayload, OnInitTotalCountErrorCallbackPayload } from "../types/index.js";
/**
 * @internal
 */
export declare const newAttributeFilterCallbacks: () => {
    registrations: {
        initStart: {
            invoke: (payload: {
                correlation: string;
            }) => void;
            subscribe: CallbackRegistration<{
                correlation: string;
            }>;
        };
        initSuccess: {
            invoke: (payload: {
                correlation: string;
            }) => void;
            subscribe: CallbackRegistration<{
                correlation: string;
            }>;
        };
        initError: {
            invoke: (payload: OnInitErrorCallbackPayload) => void;
            subscribe: CallbackRegistration<OnInitErrorCallbackPayload>;
        };
        initCancel: {
            invoke: (payload: {
                correlation: string;
            }) => void;
            subscribe: CallbackRegistration<{
                correlation: string;
            }>;
        };
        initTotalCountStart: {
            invoke: (payload: {
                correlation: string;
            }) => void;
            subscribe: CallbackRegistration<{
                correlation: string;
            }>;
        };
        initTotalCountSuccess: {
            invoke: (payload: {
                correlation: string;
            }) => void;
            subscribe: CallbackRegistration<{
                correlation: string;
            }>;
        };
        initTotalCountError: {
            invoke: (payload: OnInitTotalCountErrorCallbackPayload) => void;
            subscribe: CallbackRegistration<OnInitTotalCountErrorCallbackPayload>;
        };
        initTotalCountCancel: {
            invoke: (payload: {
                correlation: string;
            }) => void;
            subscribe: CallbackRegistration<{
                correlation: string;
            }>;
        };
        loadAttributeStart: {
            invoke: (payload: {
                correlation: string;
            }) => void;
            subscribe: CallbackRegistration<{
                correlation: string;
            }>;
        };
        loadAttributeSuccess: {
            invoke: (payload: OnLoadAttributeSuccessCallbackPayload) => void;
            subscribe: CallbackRegistration<OnLoadAttributeSuccessCallbackPayload>;
        };
        loadAttributeError: {
            invoke: (payload: OnLoadAttributeErrorCallbackPayload) => void;
            subscribe: CallbackRegistration<OnLoadAttributeErrorCallbackPayload>;
        };
        loadAttributeCancel: {
            invoke: (payload: {
                correlation: string;
            }) => void;
            subscribe: CallbackRegistration<{
                correlation: string;
            }>;
        };
        loadInitialElementsPageStart: {
            invoke: (payload: {
                correlation: string;
            }) => void;
            subscribe: CallbackRegistration<{
                correlation: string;
            }>;
        };
        loadInitialElementsPageSuccess: {
            invoke: (payload: OnLoadInitialElementsPageSuccessCallbackPayload) => void;
            subscribe: CallbackRegistration<OnLoadInitialElementsPageSuccessCallbackPayload>;
        };
        loadInitialElementsPageError: {
            invoke: (payload: OnLoadInitialElementsPageErrorCallbackPayload) => void;
            subscribe: CallbackRegistration<OnLoadInitialElementsPageErrorCallbackPayload>;
        };
        loadInitialElementsPageCancel: {
            invoke: (payload: {
                correlation: string;
            }) => void;
            subscribe: CallbackRegistration<{
                correlation: string;
            }>;
        };
        loadNextElementsPageStart: {
            invoke: (payload: {
                correlation: string;
            }) => void;
            subscribe: CallbackRegistration<{
                correlation: string;
            }>;
        };
        loadNextElementsPageSuccess: {
            invoke: (payload: OnLoadNextElementsPageSuccessCallbackPayload) => void;
            subscribe: CallbackRegistration<OnLoadNextElementsPageSuccessCallbackPayload>;
        };
        loadNextElementsPageError: {
            invoke: (payload: OnLoadNextElementsPageErrorCallbackPayload) => void;
            subscribe: CallbackRegistration<OnLoadNextElementsPageErrorCallbackPayload>;
        };
        loadNextElementsPageCancel: {
            invoke: (payload: {
                correlation: string;
            }) => void;
            subscribe: CallbackRegistration<{
                correlation: string;
            }>;
        };
        loadCustomElementsStart: {
            invoke: (payload: Partial<{
                correlation: string;
            }>) => void;
            subscribe: CallbackRegistration<Partial<{
                correlation: string;
            }>>;
        };
        loadCustomElementsSuccess: {
            invoke: (payload: OnLoadCustomElementsSuccessCallbackPayload) => void;
            subscribe: CallbackRegistration<OnLoadCustomElementsSuccessCallbackPayload>;
        };
        loadCustomElementsError: {
            invoke: (payload: OnLoadCustomElementsErrorCallbackPayload) => void;
            subscribe: CallbackRegistration<OnLoadCustomElementsErrorCallbackPayload>;
        };
        loadCustomElementsCancel: {
            invoke: (payload: Partial<{
                correlation: string;
            }>) => void;
            subscribe: CallbackRegistration<Partial<{
                correlation: string;
            }>>;
        };
        selectionChanged: {
            invoke: (payload: OnSelectionChangedCallbackPayload<InvertableAttributeElementSelection>) => void;
            subscribe: CallbackRegistration<OnSelectionChangedCallbackPayload<InvertableAttributeElementSelection>>;
        };
        selectionCommitted: {
            invoke: (payload: OnSelectionCommittedCallbackPayload<InvertableAttributeElementSelection>) => void;
            subscribe: CallbackRegistration<OnSelectionCommittedCallbackPayload<InvertableAttributeElementSelection>>;
        };
        update: {
            invoke: (payload: void) => void;
            subscribe: CallbackRegistration<void>;
        };
    };
    registerCallback: <T>(cb: Callback<T>, registerFn: {
        invoke: (payload: T) => void;
        subscribe: CallbackRegistration<T>;
    }) => Unsubscribe;
    unsubscribeAll: () => void;
    eventListener: AttributeFilterHandlerEventListener;
};
