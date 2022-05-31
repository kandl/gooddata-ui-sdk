// (C) 2022 GoodData Corporation
/* eslint-disable @typescript-eslint/ban-types */
import { Callback, CallbackPayload, CallbackRegistration } from "../types/common";

/**
 * @internal
 */
export const newCallbackHandler = <T extends object = {}>() => {
    let subscribers: Array<Callback<T>> = [];
    const subscribe: CallbackRegistration<T> = (cb) => {
        subscribers.push(cb);
        return () => {
            subscribers = subscribers.filter((i) => i != cb);
        };
    };
    const triggerAll = (payload: CallbackPayload<T>) => {
        subscribers.forEach((cb) => cb(payload));
    };

    return {
        triggerAll,
        subscribe,
    };
};
