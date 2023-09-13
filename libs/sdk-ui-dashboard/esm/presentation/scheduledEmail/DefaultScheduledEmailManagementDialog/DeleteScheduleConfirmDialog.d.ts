import React from "react";
import { IScheduledMail } from "@gooddata/sdk-model";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
interface IDeleteScheduleConfirmDialogProps {
    scheduledEmail: IScheduledMail;
    onCancel: () => void;
    onSuccess?: () => void;
    onError?: (error: GoodDataSdkError) => void;
}
export declare const DeleteScheduleConfirmDialog: React.FC<IDeleteScheduleConfirmDialogProps>;
export {};
