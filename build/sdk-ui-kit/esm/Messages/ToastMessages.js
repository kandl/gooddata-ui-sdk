// (C) 2021 GoodData Corporation
import React, { useContext } from "react";
import { ToastMessageContext } from "./ToastMessageContext.js";
import { Messages } from "./Messages.js";
/**
 * @internal
 */
export const ToastMessages = () => {
    const { messages, removeMessage } = useContext(ToastMessageContext);
    if (messages.length > 0) {
        return React.createElement(Messages, { messages: messages, onMessageClose: removeMessage });
    }
    return null;
};
//# sourceMappingURL=ToastMessages.js.map