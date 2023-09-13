import { IScheduledMailDefinition, ObjRef } from "@gooddata/sdk-model";
import { CommandProcessingStatus } from "../../../model/index.js";
export declare const useSaveScheduledEmail: ({ onBeforeRun, onSuccess, onError, }?: {
    onBeforeRun?: ((scheduledEmailToSave: IScheduledMailDefinition) => void) | undefined;
    onSuccess?: (() => void) | undefined;
    onError?: ((error: any) => void) | undefined;
}) => {
    save: (scheduledEmailToSave: IScheduledMailDefinition, filterContextRef?: ObjRef) => void;
    savingStatus?: CommandProcessingStatus | undefined;
};
