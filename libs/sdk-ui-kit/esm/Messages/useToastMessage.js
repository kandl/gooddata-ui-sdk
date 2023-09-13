// (C) 2021-2022 GoodData Corporation
import { useContext } from "react";
import { useIntl } from "react-intl";
import { ToastMessageContext } from "./ToastMessageContext.js";
/**
 * @internal
 */
export const useToastMessage = () => {
    const { addMessage, removeMessage, removeAllMessages } = useContext(ToastMessageContext);
    const intl = useIntl();
    const addMessageBase = (type) => (message, options) => {
        if (options === null || options === void 0 ? void 0 : options.values) {
            return addMessage(Object.assign(Object.assign({}, options), { type, node: intl.formatMessage(message, options.values) }));
        }
        return addMessage(Object.assign(Object.assign({}, options), { type, text: intl.formatMessage(message) }));
    };
    const addSuccess = addMessageBase("success");
    const addProgress = addMessageBase("progress");
    const addWarning = addMessageBase("warning");
    const addError = addMessageBase("error");
    return {
        addSuccess,
        addProgress,
        addWarning,
        addError,
        removeMessage,
        removeAllMessages,
    };
};
//# sourceMappingURL=useToastMessage.js.map