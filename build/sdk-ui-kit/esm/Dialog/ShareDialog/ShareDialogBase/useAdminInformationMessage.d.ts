/// <reference types="react" />
import { ObjRef } from "@gooddata/sdk-model";
export declare const useLocalStorage: <T>(key: string, defaultValue: T) => [T, import("react").Dispatch<import("react").SetStateAction<T>>];
interface IUseAdminInformationMessageStateReturnType {
    isMessageVisible: boolean;
    handleMessageClose: () => void;
}
export declare const useAdminInformationMessageState: (currentUserRef: ObjRef) => IUseAdminInformationMessageStateReturnType;
export {};
//# sourceMappingURL=useAdminInformationMessage.d.ts.map