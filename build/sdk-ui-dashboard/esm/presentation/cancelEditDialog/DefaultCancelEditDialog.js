// (C) 2022 GoodData Corporation
import React, { useCallback } from "react";
import { ConfirmDialog, Typography } from "@gooddata/sdk-ui-kit";
import { useIntl } from "react-intl";
import { cancelEditRenderMode, uiActions, useDashboardDispatch, useDashboardSelector, selectIsCancelEditModeDialogOpen, } from "../../model/index.js";
/**
 * @internal
 */
export const useCancelEditDialog = () => {
    const dispatch = useDashboardDispatch();
    const onCancel = useCallback(() => dispatch(uiActions.closeCancelEditModeDialog()), [dispatch]);
    const onSubmit = useCallback(() => {
        dispatch(cancelEditRenderMode());
        dispatch(uiActions.closeCancelEditModeDialog());
    }, [dispatch]);
    return {
        onCancel,
        onSubmit,
    };
};
/**
 * @internal
 */
export const DefaultCancelEditDialog = (props) => {
    const intl = useIntl();
    const showCancelEditDialog = useDashboardSelector(selectIsCancelEditModeDialogOpen);
    if (!showCancelEditDialog) {
        return null;
    }
    return (React.createElement(ConfirmDialog, { headline: intl.formatMessage({ id: "cancelConfirmationDialog.headline" }), submitButtonText: intl.formatMessage({ id: "cancelConfirmationDialog.submitButtonText" }), cancelButtonText: intl.formatMessage({ id: "cancel" }), onCancel: props.onCancel, onSubmit: props.onSubmit, isPositive: false, className: "s-dialog s-cancel_confirmation_dialog" },
        React.createElement(Typography, { tagName: "p" }, intl.formatMessage({ id: "cancelConfirmationDialog.message" }))));
};
//# sourceMappingURL=DefaultCancelEditDialog.js.map