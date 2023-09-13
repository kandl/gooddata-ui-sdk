import { IMessage } from "@gooddata/sdk-ui-kit";
export declare function useDrillValidationMessages(): {
    messages: IMessage[];
    removeMessage: (id: string) => void;
    removeAllMessages: () => void;
};
