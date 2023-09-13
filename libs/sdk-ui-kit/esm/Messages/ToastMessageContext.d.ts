import React from "react";
import { IMessage, IMessageDefinition } from "./typings.js";
/**
 * @internal
 */
export interface ToastMessageContextType {
    messages: IMessage[];
    removeMessage: (id: string) => void;
    removeAllMessages: () => void;
    addMessage: (message: IMessageDefinition) => string;
}
/**
 * @internal
 */
export declare const ToastMessageContext: React.Context<ToastMessageContextType>;
/**
 * @internal
 */
export declare const ToastMessageContextProvider: React.FC<{
    children?: React.ReactNode;
}>;
//# sourceMappingURL=ToastMessageContext.d.ts.map