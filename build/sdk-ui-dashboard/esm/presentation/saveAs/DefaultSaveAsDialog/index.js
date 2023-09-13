// (C) 2019-2023 GoodData Corporation
import React, { useCallback } from "react";
import { useToastMessage } from "@gooddata/sdk-ui-kit";
import { useSaveAs } from "./useSaveAs.js";
import { SaveAsDialogRenderer } from "./SaveAsDialogRenderer.js";
import { messages } from "../../../locales.js";
import { selectIsSaveAsDialogOpen, uiActions, useDashboardDispatch, useDashboardSelector, } from "../../../model/index.js";
/**
 * @internal
 */
export function useSaveAsDialogProps() {
    const { addSuccess, addError } = useToastMessage();
    const dispatch = useDashboardDispatch();
    const closeSaveAsDialog = useCallback(() => dispatch(uiActions.closeSaveAsDialog()), [dispatch]);
    const isSaveAsDialogOpen = useDashboardSelector(selectIsSaveAsDialogOpen);
    const onSaveAsError = useCallback(() => {
        closeSaveAsDialog();
        addError(messages.messagesDashboardSaveFailed);
    }, [closeSaveAsDialog, addError]);
    const onSaveAsSuccess = useCallback(() => {
        closeSaveAsDialog();
        addSuccess(messages.messagesDashboardSaveSuccess);
    }, [closeSaveAsDialog, addSuccess]);
    const onSaveAsCancel = useCallback(() => {
        closeSaveAsDialog();
    }, [closeSaveAsDialog]);
    return {
        isVisible: isSaveAsDialogOpen,
        onCancel: onSaveAsCancel,
        onError: onSaveAsError,
        onSuccess: onSaveAsSuccess,
    };
}
/**
 * @alpha
 */
export const DefaultSaveAsDialog = (props) => {
    const { onSubmit, onCancel, onError, isVisible, onSuccess } = props;
    const { locale, dashboardTitle, isKpiWidgetEnabled, isScheduleEmailsEnabled, isDashboardSaving, isDashboardLoaded, handleSaveAs, isInEditMode, } = useSaveAs({ onSubmit, onSubmitSuccess: onSuccess, onSubmitError: onError });
    if (!isVisible) {
        return null;
    }
    return (React.createElement(SaveAsDialogRenderer, { locale: locale, dashboardTitle: dashboardTitle, isKpiWidgetEnabled: isKpiWidgetEnabled, isDashboardLoaded: isDashboardLoaded, isDashboardSaving: isDashboardSaving, isScheduleEmailsEnabled: isScheduleEmailsEnabled, isInEditMode: isInEditMode, onSubmit: handleSaveAs, onCancel: onCancel }));
};
//# sourceMappingURL=index.js.map