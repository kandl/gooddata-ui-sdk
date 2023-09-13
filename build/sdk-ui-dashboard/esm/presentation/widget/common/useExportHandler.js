// (C) 2020-2023 GoodData Corporation
import { useCallback, useRef } from "react";
import { isProtectedDataError } from "@gooddata/sdk-backend-spi";
import { useToastMessage } from "@gooddata/sdk-ui-kit";
import { downloadFile } from "../../../_staging/fileUtils/downloadFile.js";
import { messages } from "../../../locales.js";
export const useExportHandler = () => {
    const { addProgress, addSuccess, addError, removeMessage } = useToastMessage();
    const lastExportMessageId = useRef("");
    return useCallback(async (exportFunction, exportConfig) => {
        try {
            lastExportMessageId.current = addProgress(messages.messagesExportResultStart, 
            // make sure the message stays there until removed by either success or error
            { duration: 0 });
            const exportResult = await exportFunction(exportConfig);
            if (lastExportMessageId.current) {
                removeMessage(lastExportMessageId.current);
            }
            addSuccess(messages.messagesExportResultSuccess);
            downloadFile(exportResult);
        }
        catch (err) {
            if (lastExportMessageId.current) {
                removeMessage(lastExportMessageId.current);
            }
            if (isProtectedDataError(err)) {
                addError(messages.messagesExportResultRestrictedError);
            }
            else {
                addError(messages.messagesExportResultError);
            }
        }
    }, []);
};
//# sourceMappingURL=useExportHandler.js.map