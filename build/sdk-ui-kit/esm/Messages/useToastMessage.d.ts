import { MessageDescriptor } from "react-intl";
import { IMessageDefinition } from "./typings.js";
/**
 * @internal
 */
export type AddMessageType = (message: MessageDescriptor, options?: Pick<IMessageDefinition, "duration" | "intensive" | "values">) => string;
/**
 * @internal
 */
export interface UseToastMessageType {
    addSuccess: AddMessageType;
    addProgress: AddMessageType;
    addWarning: AddMessageType;
    addError: AddMessageType;
    removeMessage: (id: string) => void;
    removeAllMessages: () => void;
}
/**
 * @internal
 */
export declare const useToastMessage: () => UseToastMessageType;
//# sourceMappingURL=useToastMessage.d.ts.map