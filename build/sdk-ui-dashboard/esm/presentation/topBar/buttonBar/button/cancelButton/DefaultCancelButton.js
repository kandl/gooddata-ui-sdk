// (C) 2021-2022 GoodData Corporation
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { Button } from "@gooddata/sdk-ui-kit";
import { cancelEditRenderMode, selectIsDashboardDirty, selectIsDashboardSaving, selectIsInEditMode, uiActions, useDashboardDispatch, useDashboardSelector, } from "../../../../../model/index.js";
/**
 * @internal
 */
export function useCancelButtonProps() {
    const dispatch = useDashboardDispatch();
    const isEditing = useDashboardSelector(selectIsInEditMode);
    const isSaving = useDashboardSelector(selectIsDashboardSaving);
    const isDirty = useDashboardSelector(selectIsDashboardDirty);
    const onCancelClick = useCallback(() => {
        if (isDirty) {
            dispatch(uiActions.openCancelEditModeDialog());
        }
        else {
            dispatch(cancelEditRenderMode());
        }
    }, [dispatch, isDirty]);
    return {
        isVisible: isEditing && !isSaving,
        onCancelClick,
    };
}
/**
 * @internal
 */
export function DefaultCancelButton({ isVisible, onCancelClick }) {
    const intl = useIntl();
    if (!isVisible) {
        return null;
    }
    return (React.createElement(Button, { className: "gd-button-secondary cancel-button s-cancel_button", value: intl.formatMessage({ id: "cancel" }), onClick: onCancelClick }));
}
//# sourceMappingURL=DefaultCancelButton.js.map