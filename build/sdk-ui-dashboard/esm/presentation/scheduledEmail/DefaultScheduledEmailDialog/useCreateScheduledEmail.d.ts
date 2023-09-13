import { FilterContextItem, IScheduledMail, IScheduledMailDefinition } from "@gooddata/sdk-model";
import { CommandProcessingStatus } from "../../../model/index.js";
export declare const useCreateScheduledEmail: ({ onBeforeRun, onSuccess, onError, }?: {
    onBeforeRun?: ((scheduledEmailToCreate: IScheduledMailDefinition, filters?: FilterContextItem[]) => void) | undefined;
    onSuccess?: ((scheduledEmail: IScheduledMail) => void) | undefined;
    onError?: ((error: any) => void) | undefined;
}) => {
    create: (scheduledEmailToCreate: IScheduledMailDefinition, filters?: FilterContextItem[]) => void;
    creationStatus?: CommandProcessingStatus | undefined;
};
