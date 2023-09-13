// (C) 2021-2023 GoodData Corporation
import React, { createContext, useCallback, useState } from "react";
/**
 * @internal
 */
export const ToastMessageContext = createContext({
    messages: [],
    removeMessage: () => {
        /*do nothing*/
    },
    removeAllMessages: () => {
        /*do nothing*/
    },
    addMessage: () => {
        /*do nothing*/
        return "";
    },
});
let idCounter = 0;
const DEFAULT_DURATION = 2500;
/**
 * @internal
 */
export const ToastMessageContextProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const removeMessage = useCallback((id) => {
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
    }, []);
    const removeAllMessages = useCallback(() => {
        setMessages([]);
    }, []);
    const addMessage = useCallback((message) => {
        var _a;
        const id = (++idCounter).toString(10);
        const newMessage = Object.assign(Object.assign({}, message), { id });
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        const duration = (_a = message.duration) !== null && _a !== void 0 ? _a : DEFAULT_DURATION;
        if (duration) {
            setTimeout(() => {
                removeMessage(newMessage.id);
            }, duration);
        }
        return id;
    }, [removeMessage]);
    return (React.createElement(ToastMessageContext.Provider, { value: { messages, removeMessage, removeAllMessages, addMessage } }, children));
};
//# sourceMappingURL=ToastMessageContext.js.map